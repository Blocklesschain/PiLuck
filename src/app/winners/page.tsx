import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Trophy, Hash, Coins, User, Calendar } from "lucide-react";

export const metadata = {
  title: "Past Winners — PiLuck",
  description: "View past round winners, their usernames, round numbers, and ticket details.",
};

interface Winner {
  roundNumber: number;
  status: string;
  totalPoolPi: number;
  treasuryPi: number;
  totalBaseEntries: number;
  totalCreditEntries: number;
  closedAt: string | null;
  winnerUsername: string;
  ticketType: string;
  paymentId: string;
  amountPi: number;
}

async function getWinners(): Promise<Winner[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/winners?limit=50`, {
      cache: "no-store",
    });
    const payload = await response.json();
    if (payload?.ok && Array.isArray(payload.winners)) {
      return payload.winners;
    }
    return [];
  } catch {
    return [];
  }
}

export default async function WinnersPage() {
  const winners = await getWinners();

  // Group winners by round
  const grouped: Record<number, Winner[]> = {};
  for (const w of winners) {
    if (!grouped[w.roundNumber]) grouped[w.roundNumber] = [];
    grouped[w.roundNumber].push(w);
  }

  const rounds = Object.entries(grouped).sort(
    ([a], [b]) => Number(b) - Number(a)
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Past <span className="text-gradient-gold">Winners</span>
        </h1>
        <p className="text-lg text-white/70 text-center max-w-3xl mx-auto mb-16">
          Every round's winners are recorded on-chain and displayed here for full transparency.
        </p>

        {rounds.length === 0 && (
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <Trophy className="w-16 h-16 text-pi-gold-400 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-semibold text-white/60">No winners yet</p>
            <p className="text-sm text-white/40 mt-2">
              Winners will appear here after the first round closes. Enter the draw to be part of history!
            </p>
          </div>
        )}

        <div className="space-y-8 max-w-4xl mx-auto">
          {rounds.map(([roundNum, roundWinners]) => {
            const first = roundWinners[0];
            return (
              <div key={roundNum} className="glass-card p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pi-gold-500/20 to-pi-purple-500/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-pi-gold-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">
                        Round <span className="text-gradient-gold">#{roundNum}</span>
                      </h2>
                      <p className="text-xs text-white/50">
                        {first.closedAt
                          ? new Date(first.closedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Closed"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-white/60">
                      Pool: <span className="text-pi-gold-400 font-semibold">{first.totalPoolPi.toFixed(2)} Pi</span>
                    </span>
                    <span className="text-white/60">
                      Entries: <span className="font-semibold">{first.totalBaseEntries + first.totalCreditEntries}</span>
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  {roundWinners.map((w, i) => (
                    <div
                      key={w.paymentId}
                      className="flex items-center justify-between p-3 rounded-xl glass hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-pi-gold-500/20 flex items-center justify-center text-xs font-bold text-pi-gold-400">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-sm flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-pi-purple-400" />
                            @{w.winnerUsername}
                          </p>
                          <p className="text-xs text-white/40 flex items-center gap-1.5">
                            <Hash className="w-3 h-3" />
                            {w.paymentId.slice(0, 16)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-pi-gold-400 flex items-center gap-1 justify-end">
                          <Coins className="w-3.5 h-3.5" />
                          {(first.totalPoolPi * 0.9 / roundWinners.length).toFixed(2)} Pi
                        </p>
                        <p className="text-xs text-white/40">{w.ticketType === "base" ? "Base Ticket" : "Credit Entry"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}