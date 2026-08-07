import postgres from "postgres";

// Use postgres.js for the data layer. It works reliably with any Postgres
// connection string (Vercel Postgres, Supabase, Neon, etc.), unlike
// @vercel/postgres which rejects non-"-pooler." Supabase URLs.
const connectionString =
  (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING)?.trim() ||
  "";

const pg = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Adapter returning the { rows } shape expected by the rest of this module.
type AnyRow = Record<string, unknown>;
async function sql<T = AnyRow>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<{ rows: T[] }> {
  const rows = (await pg(strings, ...(values as never[]))) as unknown as T[];
  return { rows };
}

export const ROUND_DURATION_MS = 12 * 60 * 60 * 1000;

// Fixed epoch so round numbers start from 1.
// 2025-01-01T00:00:00Z = 1735689600000
const ROUND_EPOCH_MS = 1735689600000;

const STREAK_MILESTONES = [
  { days: 7, credits: 1 },
  { days: 15, credits: 3 },
  { days: 30, credits: 7 },
  { days: 60, credits: 10 },
  { days: 90, credits: 25 },
  { days: 180, credits: 50 },
  { days: 365, credits: 100 },
] as const;

export type WalletIdentity = {
  uid: string;
  username: string;
  walletAddress?: string | null;
};

export type RoundRecord = {
  roundNumber: number;
  status: string;
  startsAt: Date;
  endsAt: Date;
  baseTicketPrice: string;
  totalBaseEntries: number;
  totalCreditEntries: number;
  totalPoolPi: string;
  treasuryPi: string;
  winnersCount: number;
};

export type WalletState = {
  walletKey: string;
  uid: string;
  username: string;
  walletAddress: string | null;
  streakDays: number;
  highestMilestoneDays: number;
  freeCredits: number;
  lastJoinedOn: string | null;
  creditCooldownUntil: Date | null;
};

let schemaReady: Promise<void> | null = null;

function normalizeWalletKey(identity: WalletIdentity) {
  return identity.walletAddress?.trim() || identity.uid.trim();
}

function getDateOnly(value: Date) {
  return value.toISOString().slice(0, 10);
}

function addDays(value: Date, days: number) {
  const next = new Date(value);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function getRoundNumber(now: Date = new Date()) {
  // Round numbers start from 1 based on the fixed epoch
  return Math.floor((now.getTime() - ROUND_EPOCH_MS) / ROUND_DURATION_MS) + 1;
}

function getRoundBounds(roundNumber: number) {
  // Convert round number back to epoch-based time
  const startsAt = new Date(ROUND_EPOCH_MS + (roundNumber - 1) * ROUND_DURATION_MS);
  return {
    startsAt,
    endsAt: new Date(startsAt.getTime() + ROUND_DURATION_MS),
  };
}

function getHighestMilestone(streakDays: number) {
  for (let index = STREAK_MILESTONES.length - 1; index >= 0; index -= 1) {
    if (streakDays >= STREAK_MILESTONES[index].days) {
      return STREAK_MILESTONES[index];
    }
  }

  return null;
}

function getMilestoneCredits(previousHighest: number, currentHighest: number) {
  return STREAK_MILESTONES.filter(
    (milestone) => milestone.days > previousHighest && milestone.days <= currentHighest
  ).reduce((total, milestone) => total + milestone.credits, 0);
}

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

      await sql`
        CREATE TABLE IF NOT EXISTS piluck_users (
          wallet_key text PRIMARY KEY,
          uid text NOT NULL,
          username text NOT NULL,
          wallet_address text,
          streak_days integer NOT NULL DEFAULT 0,
          highest_milestone_days integer NOT NULL DEFAULT 0,
          free_credits integer NOT NULL DEFAULT 0,
          last_joined_on date,
          credit_cooldown_until timestamptz,
          created_at timestamptz NOT NULL DEFAULT NOW(),
          updated_at timestamptz NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS piluck_rounds (
          round_number bigint PRIMARY KEY,
          status text NOT NULL DEFAULT 'active',
          starts_at timestamptz NOT NULL,
          ends_at timestamptz NOT NULL,
          base_ticket_price numeric(18, 8) NOT NULL DEFAULT 1,
          total_base_entries integer NOT NULL DEFAULT 0,
          total_credit_entries integer NOT NULL DEFAULT 0,
          total_pool_pi numeric(18, 8) NOT NULL DEFAULT 0,
          treasury_pi numeric(18, 8) NOT NULL DEFAULT 0,
          winners_count integer NOT NULL DEFAULT 0,
          created_at timestamptz NOT NULL DEFAULT NOW(),
          updated_at timestamptz NOT NULL DEFAULT NOW(),
          closed_at timestamptz
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS piluck_payments (
          payment_id text PRIMARY KEY,
          wallet_key text NOT NULL REFERENCES piluck_users(wallet_key) ON DELETE CASCADE,
          uid text NOT NULL,
          username text NOT NULL,
          round_number bigint NOT NULL REFERENCES piluck_rounds(round_number) ON DELETE CASCADE,
          amount_pi numeric(18, 8) NOT NULL,
          memo text NOT NULL,
          metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
          status text NOT NULL DEFAULT 'created',
          txid text,
          created_at timestamptz NOT NULL DEFAULT NOW(),
          updated_at timestamptz NOT NULL DEFAULT NOW(),
          approved_at timestamptz,
          completed_at timestamptz
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS piluck_tickets (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          wallet_key text NOT NULL REFERENCES piluck_users(wallet_key) ON DELETE CASCADE,
          round_number bigint NOT NULL REFERENCES piluck_rounds(round_number) ON DELETE CASCADE,
          ticket_type text NOT NULL CHECK (ticket_type IN ('base', 'credit')),
          payment_id text UNIQUE,
          credits_spent integer NOT NULL DEFAULT 0,
          amount_pi numeric(18, 8) NOT NULL DEFAULT 0,
          is_winner boolean NOT NULL DEFAULT false,
          created_at timestamptz NOT NULL DEFAULT NOW()
        )
      `;

      // Migration: add is_winner column if the table was created before this column existed
      await sql`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'piluck_tickets' AND column_name = 'is_winner'
          ) THEN
            ALTER TABLE piluck_tickets ADD COLUMN is_winner boolean NOT NULL DEFAULT false;
          END IF;
        END $$;
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS piluck_base_ticket_unique
        ON piluck_tickets (round_number, wallet_key)
        WHERE ticket_type = 'base'
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS piluck_tickets_wallet_round_idx
        ON piluck_tickets (wallet_key, round_number)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS piluck_payments_wallet_idx
        ON piluck_payments (wallet_key, created_at DESC)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS piluck_tickets_winner_idx
        ON piluck_tickets (round_number, is_winner)
        WHERE is_winner = true
      `;
    })();
  }

  return schemaReady;
}

export async function getOrCreateCurrentRound(now: Date = new Date()) {
  await ensureSchema();

  const roundNumber = getRoundNumber(now);
  const { startsAt, endsAt } = getRoundBounds(roundNumber);

  const existing = await sql`
    SELECT * FROM piluck_rounds WHERE round_number = ${roundNumber} LIMIT 1
  `;

  if (existing.rows.length === 0) {
    const inserted = await sql`
      INSERT INTO piluck_rounds (
        round_number,
        status,
        starts_at,
        ends_at
      ) VALUES (
        ${roundNumber},
        ${now < endsAt ? "active" : "closed"},
        ${startsAt.toISOString()},
        ${endsAt.toISOString()}
      )
      RETURNING *
    `;

    return mapRound(inserted.rows[0]);
  }

  const row = existing.rows[0];
  if (row.status !== "closed" && now >= new Date(String(row.ends_at))) {
    const closed = await sql`
      UPDATE piluck_rounds
      SET status = 'closed', closed_at = NOW(), updated_at = NOW()
      WHERE round_number = ${roundNumber}
      RETURNING *
    `;

    return mapRound(closed.rows[0]);
  }

  return mapRound(row);
}

export async function upsertWallet(identity: WalletIdentity) {
  await ensureSchema();

  const walletKey = normalizeWalletKey(identity);
  await sql`
    INSERT INTO piluck_users (
      wallet_key,
      uid,
      username,
      wallet_address,
      updated_at
    ) VALUES (
      ${walletKey},
      ${identity.uid},
      ${identity.username},
      ${identity.walletAddress ?? null},
      NOW()
    )
    ON CONFLICT (wallet_key) DO UPDATE SET
      uid = EXCLUDED.uid,
      username = EXCLUDED.username,
      wallet_address = EXCLUDED.wallet_address,
      updated_at = NOW()
  `;

  return getWalletState(walletKey);
}

export async function getRoundTotals() {
  await ensureSchema();

  const totals = await sql`
    SELECT
      COALESCE(SUM(total_base_entries + total_credit_entries), 0)::int AS total_entries,
      COALESCE(SUM(total_pool_pi), 0) AS total_pool_pi,
      COALESCE(SUM(treasury_pi), 0) AS total_treasury_pi,
      COUNT(*)::int AS rounds_count
    FROM piluck_rounds
  `;

  // Count actual winners across all closed rounds.
  // Wrapped in try/catch in case the is_winner column doesn't exist yet
  // (migration may not have run on first deploy).
  let totalWinners = 0;
  try {
    const winnerCount = await sql`
      SELECT COUNT(*)::int AS total_winners
      FROM piluck_tickets
      WHERE is_winner = true
    `;
    const winnerRow = winnerCount.rows[0] ?? {};
    totalWinners = Number(winnerRow.total_winners ?? 0);
  } catch {
    // Column doesn't exist yet — fall back to 0
    totalWinners = 0;
  }

  const row = totals.rows[0] ?? {};

  return {
    totalEntries: Number(row.total_entries ?? 0),
    totalPoolPi: Number(row.total_pool_pi ?? 0),
    totalTreasuryPi: Number(row.total_treasury_pi ?? 0),
    roundsCount: Number(row.rounds_count ?? 0),
    totalWinners,
  };
}

export async function getWalletRoundStatus(identity: WalletIdentity) {
  await ensureSchema();

  const wallet = await upsertWallet(identity);

  if (!wallet) {
    throw new Error("Wallet state could not be created.");
  }

  const round = await getOrCreateCurrentRound();
  const walletKey = normalizeWalletKey(identity);

  const tickets = await sql`
    SELECT ticket_type
    FROM piluck_tickets
    WHERE wallet_key = ${walletKey}
      AND round_number = ${round.roundNumber}
  `;

  const types = tickets.rows.map((row) => String(row.ticket_type));

  return {
    wallet,
    round,
    hasBaseTicket: types.includes("base"),
    hasCreditTicket: types.includes("credit"),
  };
}

export async function getWalletState(walletKey: string) {
  await ensureSchema();

  const result = await sql`
    SELECT * FROM piluck_users WHERE wallet_key = ${walletKey} LIMIT 1
  `;

  if (result.rows.length === 0) {
    return null;
  }

  return mapWallet(result.rows[0]);
}

export async function claimDailyStreak(identity: WalletIdentity) {
  await ensureSchema();

  const walletKey = normalizeWalletKey(identity);
  const wallet = await upsertWallet(identity);
  const now = new Date();

  if (!wallet) {
    throw new Error("Wallet state could not be created.");
  }

  const today = getDateOnly(now);
  if (wallet.lastJoinedOn === today) {
    return {
      walletKey,
      streakDays: wallet.streakDays,
      freeCredits: wallet.freeCredits,
      creditsAwarded: 0,
      alreadyClaimedToday: true,
    };
  }

  const yesterday = getDateOnly(addDays(now, -1));
  const nextStreakDays = wallet.lastJoinedOn === yesterday ? wallet.streakDays + 1 : 1;
  const nextMilestone = getHighestMilestone(nextStreakDays);
  const creditsAwarded = nextMilestone
    ? getMilestoneCredits(wallet.highestMilestoneDays, nextMilestone.days)
    : 0;

  const updated = await sql`
    UPDATE piluck_users
    SET
      streak_days = ${nextStreakDays},
      highest_milestone_days = ${nextMilestone?.days ?? wallet.highestMilestoneDays},
      free_credits = free_credits + ${creditsAwarded},
      last_joined_on = ${today},
      updated_at = NOW()
    WHERE wallet_key = ${walletKey}
    RETURNING *
  `;

  return {
    walletKey,
    streakDays: mapWallet(updated.rows[0]).streakDays,
    freeCredits: mapWallet(updated.rows[0]).freeCredits,
    creditsAwarded,
    alreadyClaimedToday: false,
  };
}

export async function spendCredits(identity: WalletIdentity, quantity: number) {
  await ensureSchema();

  const walletKey = normalizeWalletKey(identity);
  const wallet = await upsertWallet(identity);

  if (!wallet) {
    throw new Error("Wallet state could not be created.");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Credit quantity must be at least 1.");
  }

  if (wallet.freeCredits < quantity) {
    throw new Error("Not enough credits available.");
  }

  if (wallet.creditCooldownUntil && wallet.creditCooldownUntil > new Date()) {
    throw new Error("Credit cooldown is still active.");
  }

  const nextCooldown = new Date(Date.now() + quantity * 60 * 60 * 1000);
  const updated = await sql`
    UPDATE piluck_users
    SET
      free_credits = free_credits - ${quantity},
      credit_cooldown_until = ${nextCooldown.toISOString()},
      updated_at = NOW()
    WHERE wallet_key = ${walletKey}
    RETURNING *
  `;

  return mapWallet(updated.rows[0]);
}

export async function recordPaymentApproval(params: {
  identity: WalletIdentity;
  paymentId: string;
  amountPi: number;
  memo: string;
  metadata: Record<string, unknown>;
  roundNumber?: number;
}) {
  await ensureSchema();

  const round = await getOrCreateCurrentRound();
  const wallet = await upsertWallet(params.identity);

  if (!wallet) {
    throw new Error("Wallet state could not be created.");
  }

  await sql`
    INSERT INTO piluck_payments (
      payment_id,
      wallet_key,
      uid,
      username,
      round_number,
      amount_pi,
      memo,
      metadata,
      status,
      approved_at,
      updated_at
    ) VALUES (
      ${params.paymentId},
      ${wallet.walletKey},
      ${params.identity.uid},
      ${params.identity.username},
      ${params.roundNumber ?? round.roundNumber},
      ${params.amountPi},
      ${params.memo},
      ${JSON.stringify(params.metadata)}::jsonb,
      'approved',
      NOW(),
      NOW()
    )
    ON CONFLICT (payment_id) DO UPDATE SET
      wallet_key = EXCLUDED.wallet_key,
      uid = EXCLUDED.uid,
      username = EXCLUDED.username,
      round_number = EXCLUDED.round_number,
      amount_pi = EXCLUDED.amount_pi,
      memo = EXCLUDED.memo,
      metadata = EXCLUDED.metadata,
      status = 'approved',
      approved_at = NOW(),
      updated_at = NOW()
  `;

  return {
    walletKey: wallet.walletKey,
    roundNumber: params.roundNumber ?? round.roundNumber,
  };
}

export async function recordPaymentCompletion(params: {
  identity: WalletIdentity;
  paymentId: string;
  txid: string;
  amountPi: number;
  memo: string;
  metadata: Record<string, unknown>;
  roundNumber?: number;
  ticketType?: "base" | "credit";
}) {
  await ensureSchema();

  const round = await getOrCreateCurrentRound();
  const wallet = await upsertWallet(params.identity);

  if (!wallet) {
    throw new Error("Wallet state could not be created.");
  }

  const paymentUpdate = await sql`
    UPDATE piluck_payments
    SET
      status = 'completed',
      txid = ${params.txid},
      completed_at = NOW(),
      updated_at = NOW()
    WHERE payment_id = ${params.paymentId}
      AND status <> 'completed'
    RETURNING *
  `;

  if (paymentUpdate.rows.length === 0) {
    return {
      walletKey: wallet.walletKey,
      roundNumber: params.roundNumber ?? round.roundNumber,
      alreadyCompleted: true,
    };
  }

  const effectiveRound = params.roundNumber ?? Number(paymentUpdate.rows[0].round_number ?? round.roundNumber);
  const ticketType = params.ticketType ?? "base";

  // Enforce one BASE ticket per wallet per round. Credit entries are allowed
  // multiple times per round, gated by the 1-hour cooldown in spendCredits.
  if (ticketType === "base") {
    const existingTicket = await sql`
      SELECT id
      FROM piluck_tickets
      WHERE wallet_key = ${wallet.walletKey}
        AND round_number = ${effectiveRound}
        AND ticket_type = 'base'
      LIMIT 1
    `;

    if (existingTicket.rows.length > 0) {
      return {
        walletKey: wallet.walletKey,
        roundNumber: effectiveRound,
        alreadyCompleted: true,
        reason: "ticket_already_used_this_round",
      };
    }
  }

  await sql`
    INSERT INTO piluck_tickets (
      wallet_key,
      round_number,
      ticket_type,
      payment_id,
      credits_spent,
      amount_pi
    ) VALUES (
      ${wallet.walletKey},
      ${effectiveRound},
      ${ticketType},
      ${params.paymentId},
      ${ticketType === "credit" ? 1 : 0},
      ${params.amountPi}
    )
    ON CONFLICT (payment_id) DO NOTHING
  `;

  await sql`
    UPDATE piluck_rounds
    SET
      total_base_entries = total_base_entries + ${ticketType === "credit" ? 0 : 1},
      total_credit_entries = total_credit_entries + ${ticketType === "credit" ? 1 : 0},
      total_pool_pi = total_pool_pi + ${params.amountPi},
      treasury_pi = treasury_pi + ${params.amountPi * 0.1},
      updated_at = NOW()
    WHERE round_number = ${effectiveRound}
  `;

  await claimDailyStreak(params.identity);

  return {
    walletKey: wallet.walletKey,
    roundNumber: effectiveRound,
    alreadyCompleted: false,
  };
}

export async function getPastWinners(limit = 20) {
  await ensureSchema();

  // Wrapped in try/catch in case the is_winner column doesn't exist yet
  try {
    const rounds = await sql`
      SELECT
        r.round_number,
        r.status,
        r.total_pool_pi,
        r.treasury_pi,
        r.total_base_entries,
        r.total_credit_entries,
        r.closed_at,
        t.wallet_key,
        t.ticket_type,
        t.payment_id,
        t.amount_pi,
        u.username
      FROM piluck_rounds r
      JOIN piluck_tickets t ON t.round_number = r.round_number
      JOIN piluck_users u ON u.wallet_key = t.wallet_key
      WHERE r.status IN ('closed', 'refunded')
        AND t.is_winner = true
      ORDER BY r.round_number DESC, t.created_at ASC
      LIMIT ${limit}
    `;

    return rounds.rows.map((row) => ({
      roundNumber: Number(row.round_number),
      status: String(row.status),
      totalPoolPi: Number(row.total_pool_pi),
      treasuryPi: Number(row.treasury_pi),
      totalBaseEntries: Number(row.total_base_entries),
      totalCreditEntries: Number(row.total_credit_entries),
      closedAt: row.closed_at ? new Date(String(row.closed_at)).toISOString() : null,
      winnerUsername: String(row.username),
      ticketType: String(row.ticket_type),
      paymentId: String(row.payment_id),
      amountPi: Number(row.amount_pi),
    }));
  } catch {
    // Column doesn't exist yet — return empty array
    return [];
  }
}

export async function closeCurrentRoundAndSelectWinners() {
  await ensureSchema();

  const round = await getOrCreateCurrentRound();
  const now = new Date();

  // Only close if the round has actually ended
  if (now < round.endsAt) {
    return { closed: false, reason: "round_still_active" };
  }

  if (round.status === "closed" || round.status === "refunded") {
    return { closed: false, reason: "already_closed" };
  }

  const totalParticipants = round.totalBaseEntries + round.totalCreditEntries;

  // If fewer than 9 participants, refund everyone (minus 10% treasury)
  if (totalParticipants < 9) {
    // Mark all payments in this round as refunded
    await sql`
      UPDATE piluck_payments
      SET status = 'refunded', updated_at = NOW()
      WHERE round_number = ${round.roundNumber}
        AND status = 'completed'
    `;

    // Close the round
    await sql`
      UPDATE piluck_rounds
      SET
        status = 'refunded',
        closed_at = NOW(),
        updated_at = NOW()
      WHERE round_number = ${round.roundNumber}
    `;

    return {
      closed: true,
      refunded: true,
      reason: "insufficient_participants",
      participants: totalParticipants,
      treasuryPi: Number(round.treasuryPi),
    };
  }

  // Select winners: up to 9, but no more than the number of unique participants
  const tickets = await sql`
    SELECT DISTINCT wallet_key
    FROM piluck_tickets
    WHERE round_number = ${round.roundNumber}
  `;

  const allWallets = tickets.rows.map((r) => String(r.wallet_key));
  const maxWinners = Math.min(9, allWallets.length);
  const shuffled = [...allWallets].sort(() => Math.random() - 0.5);
  const winners = shuffled.slice(0, maxWinners);

  // Record winners using the is_winner boolean column
  for (const walletKey of winners) {
    await sql`
      UPDATE piluck_tickets
      SET is_winner = true
      WHERE wallet_key = ${walletKey}
        AND round_number = ${round.roundNumber}
    `;
  }

  // Update the round's winners_count and close it
  await sql`
    UPDATE piluck_rounds
    SET
      status = 'closed',
      winners_count = ${winners.length},
      closed_at = NOW(),
      updated_at = NOW()
    WHERE round_number = ${round.roundNumber}
  `;

  return {
    closed: true,
    refunded: false,
    winners: winners.length,
    participants: totalParticipants,
    poolPi: Number(round.totalPoolPi),
    treasuryPi: Number(round.treasuryPi),
  };
}

function mapRound(row: Record<string, unknown>): RoundRecord {
  return {
    roundNumber: Number(row.round_number),
    status: String(row.status),
    startsAt: new Date(String(row.starts_at)),
    endsAt: new Date(String(row.ends_at)),
    baseTicketPrice: String(row.base_ticket_price),
    totalBaseEntries: Number(row.total_base_entries ?? 0),
    totalCreditEntries: Number(row.total_credit_entries ?? 0),
    totalPoolPi: String(row.total_pool_pi ?? "0"),
    treasuryPi: String(row.treasury_pi ?? "0"),
    winnersCount: Number(row.winners_count ?? 0),
  };
}

function mapWallet(row: Record<string, unknown>): WalletState {
  return {
    walletKey: String(row.wallet_key),
    uid: String(row.uid),
    username: String(row.username),
    walletAddress: row.wallet_address ? String(row.wallet_address) : null,
    streakDays: Number(row.streak_days ?? 0),
    highestMilestoneDays: Number(row.highest_milestone_days ?? 0),
    freeCredits: Number(row.free_credits ?? 0),
    lastJoinedOn: row.last_joined_on ? String(row.last_joined_on) : null,
    creditCooldownUntil: row.credit_cooldown_until
      ? new Date(String(row.credit_cooldown_until))
      : null,
  };
}