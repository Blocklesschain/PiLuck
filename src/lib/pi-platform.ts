const PI_PLATFORM_API_BASE_URL = "https://api.minepi.com/v2";
const PI_TESTNET_HORIZON_URL = "https://api.testnet.minepi.com";

function requireServerApiKey() {
  const apiKey = process.env.PI_SERVER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "Missing PI_SERVER_API_KEY environment variable. Add your Pi Server API Key in Vercel before processing payments."
    );
  }

  return apiKey;
}

function getServerHeaders() {
  return {
    Authorization: `Key ${requireServerApiKey()}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function parseJsonResponse(response: Response) {
  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return { payload, ok: response.ok };
}

export async function approvePiPayment(paymentId: string) {
  const response = await fetch(
    `${PI_PLATFORM_API_BASE_URL}/payments/${encodeURIComponent(paymentId)}/approve`,
    {
      method: "POST",
      headers: getServerHeaders(),
    }
  );

  const parsed = await parseJsonResponse(response);

  if (!parsed.ok) {
    throw new Error("Pi payment approval failed.");
  }

  return parsed.payload;
}

export async function completePiPayment(paymentId: string, txid: string) {
  const response = await fetch(
    `${PI_PLATFORM_API_BASE_URL}/payments/${encodeURIComponent(paymentId)}/complete`,
    {
      method: "POST",
      headers: getServerHeaders(),
      body: JSON.stringify({ txid }),
    }
  );

  const parsed = await parseJsonResponse(response);

  if (!parsed.ok) {
    throw new Error("Pi payment completion failed.");
  }

  return parsed.payload;
}

/**
 * Create a server-side payout to a winner.
 * Uses the Pi Platform API to send Pi from the app wallet to the winner.
 * Returns the paymentId which can be used to track the payout.
 */
export async function createPiPayout(params: {
  amount: number;
  memo: string;
  uid: string;
  metadata?: Record<string, unknown>;
}): Promise<{ paymentId: string }> {
  const response = await fetch(`${PI_PLATFORM_API_BASE_URL}/payments`, {
    method: "POST",
    headers: getServerHeaders(),
    body: JSON.stringify({
      amount: params.amount,
      memo: params.memo,
      metadata: params.metadata ?? {},
      uid: params.uid,
    }),
  });

  const parsed = await parseJsonResponse(response);

  if (!parsed.ok || !parsed.payload || typeof parsed.payload !== "object") {
    throw new Error("Pi payout creation failed.");
  }

  const payload = parsed.payload as { paymentId?: string; identifier?: string };
  const paymentId = payload.paymentId || payload.identifier;

  if (!paymentId) {
    throw new Error("Pi payout creation returned no payment ID.");
  }

  // Approve the payout immediately
  await approvePiPayment(paymentId);

  return { paymentId };
}

/**
 * Submit a payout transaction ID to complete the payout.
 */
export async function submitPayoutTxid(paymentId: string, txid: string) {
  return completePiPayment(paymentId, txid);
}

export type PiWalletBalance = {
  nativeBalance: string | null;
  accountId: string;
};

export async function fetchPiWalletBalance(
  walletAddress: string
): Promise<PiWalletBalance> {
  const response = await fetch(
    `${PI_TESTNET_HORIZON_URL}/accounts/${encodeURIComponent(walletAddress)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const parsed = await parseJsonResponse(response);

  if (!parsed.ok || !parsed.payload || typeof parsed.payload !== "object") {
    throw new Error("Failed to fetch Pi wallet balance.");
  }

  const account = parsed.payload as {
    id?: unknown;
    balances?: Array<{ asset_type?: unknown; balance?: unknown }>;
  };
  const balances = Array.isArray(account.balances) ? account.balances : [];
  const nativeBalance = balances.find((balance) => balance.asset_type === "native");

  return {
    nativeBalance:
      nativeBalance && typeof nativeBalance.balance === "string"
        ? nativeBalance.balance
        : null,
    accountId: typeof account.id === "string" ? account.id : walletAddress,
  };
}