import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import {
  Wallet,
  Ticket,
  Coins,
  CheckCircle2,
  Info,
  ExternalLink,
  FileCode,
  Users,
  Timer,
  Trophy,
} from "lucide-react";

export const metadata = {
  title: "Documentation — PiLuck",
  description:
    "PiLuck developer and user documentation. Learn how to connect your Pi wallet, enter the lottery, and integrate the dApp.",
};

const steps = [
  {
    icon: <Wallet className="w-6 h-6 text-pi-gold-400" />,
    title: "Connect Your Pi Wallet",
    desc: "Open PiLuck inside the Pi Browser and tap Connect Wallet. Sign in with your Pi Network account — no seed phrase or private key is ever shared with PiLuck.",
  },
  {
    icon: <Ticket className="w-6 h-6 text-pi-purple-400" />,
    title: "Enter the Draw",
    desc: "Each entry costs exactly 1 Pi on the Pi Testnet. Purchase one ticket per wallet per 12-hour round. Your transaction is recorded on-chain.",
  },
  {
    icon: <Trophy className="w-6 h-6 text-pi-gold-400" />,
    title: "Win Fairly",
    desc: "At round close, 9 winners are selected via verifiable randomness. Each winner receives 10% of the pool. The Treasury takes 10% for platform growth.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
          <span className="text-gradient-gold">PiLuck</span> Documentation
        </h1>

        <p className="text-lg text-white/70 text-center max-w-3xl mx-auto mb-16">
          Your complete guide to using and building on the PiLuck Lucky Draw
          platform. From connecting your first wallet to integrating the Pi SDK.
        </p>

        {/* Table of Contents */}
        <div className="glass-card p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-pi-gold-400 mb-4">
            Table of Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-white/70">
            <li>
              <a
                href="#getting-started"
                className="hover:text-white transition-colors"
              >
                1. Getting Started
              </a>
            </li>
            <li>
              <a
                href="#how-to-play"
                className="hover:text-white transition-colors"
              >
                2. How to Play
              </a>
            </li>
            <li>
              <a
                href="#wallet-guide"
                className="hover:text-white transition-colors"
              >
                3. Wallet Connection Guide
              </a>
            </li>
            <li>
              <a
                href="#prize-distribution"
                className="hover:text-white transition-colors"
              >
                4. Prize Distribution
              </a>
            </li>
            <li>
              <a
                href="#fees"
                className="hover:text-white transition-colors"
              >
                5. Fees & Treasury
              </a>
            </li>
            <li>
              <a
                href="#troubleshooting"
                className="hover:text-white transition-colors"
              >
                6. Troubleshooting
              </a>
            </li>
            <li>
              <a
                href="#api-reference"
                className="hover:text-white transition-colors"
              >
                7. API & SDK Reference
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-white transition-colors"
              >
                8. FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* 1. Getting Started */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              1. Getting Started
            </h2>
            <div className="glass-card p-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                PiLuck is a transparent, community-first lucky draw built for the
                Pi Network ecosystem. It runs entirely on the Pi Testnet
                (sandbox mode) so all entries and payouts are verifiable on-chain.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Entry fee:</strong> 1 Pi per ticket, per wallet, per
                  round.
                </li>
                <li>
                  <strong>Round duration:</strong> 12 hours. A new round begins
                  immediately after each draw.
                </li>
                <li>
                  <strong>Winners per round:</strong> 9 — each receives 10% of
                  the pool.
                </li>
                <li>
                  <strong>Treasury:</strong> 10% of each round funds platform
                  development and security.
                </li>
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <Info className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">
                  You <strong>must</strong> use the Pi Browser for full dApp
                  functionality (wallet connect + payments).
                </span>
              </div>
            </div>
          </section>

          {/* 2. How to Play */}
          <section id="how-to-play">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              2. How to Play
            </h2>
            <div className="glass-card p-6 space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Step {i + 1}: {step.title}
                    </p>
                    <p className="text-sm text-white/70 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Wallet Connection Guide */}
          <section id="wallet-guide">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              3. Wallet Connection Guide
            </h2>
            <div className="glass-card p-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                PiLuck uses the official Pi Network SDK
                (<code className="text-pi-purple-300">https://sdk.pinetwork.com/pi-sdk.js</code>
                ) for authentication. When you click{" "}
                <strong>Connect Wallet</strong>, the SDK opens a Pi Browser
                auth dialog requesting your username. PiLuck never sees or stores
                your private key.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Open <strong>PiLuck.app</strong> inside the Pi Browser.
                </li>
                <li>
                  Tap <strong>Connect Wallet</strong> in the dApp area or the
                  Navbar.
                </li>
                <li>
                  Approve the authentication request in the Pi Browser popup.
                </li>
                <li>
                  Your username will appear, confirming a successful connection.
                </li>
              </ol>
              <div className="flex items-center gap-3 pt-2">
                <ExternalLink className="w-5 h-5 text-pi-purple-400" />
                <a
                  href="https://minepi.com/pi-browser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pi-gold-300 hover:underline"
                >
                  Download the Pi Browser
                </a>
              </div>
            </div>
          </section>

          {/* 4. Prize Distribution */}
          <section id="prize-distribution">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              4. Prize Distribution
            </h2>
            <div className="glass-card p-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                The total pool is equal to the number of entries multiplied by 1
                Pi (e.g., 10,000 entries = 10,000 Pi pool). At round close:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>90%</strong> is split equally among{" "}
                  <strong>9 winners</strong> (10% each).
                </li>
                <li>
                  <strong>10%</strong> goes to the <strong>PiLuck Treasury</strong>{" "}
                  for development, security, and community rewards.
                </li>
                <li>All distributions are automatic and on-chain.</li>
              </ul>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="glass p-4 text-center">
                  <p className="text-2xl font-bold text-pi-gold-400">90%</p>
                  <p className="text-xs text-white/60">Winners</p>
                </div>
                <div className="glass p-4 text-center">
                  <p className="text-2xl font-bold text-pi-purple-400">10%</p>
                  <p className="text-xs text-white/60">Treasury</p>
                </div>
                <div className="glass p-4 text-center">
                  <p className="text-2xl font-bold text-pi-gold-400">9</p>
                  <p className="text-xs text-white/60">Winners</p>
                </div>
                <div className="glass p-4 text-center">
                  <p className="text-2xl font-bold text-pi-purple-400">1 Pi</p>
                  <p className="text-xs text-white/60">Per Entry</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Fees & Treasury */}
          <section id="fees">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              5. Fees & Treasury
            </h2>
            <div className="glass-card p-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                There are no hidden fees. The only cost to enter is the{" "}
                <strong>1 Pi ticket price</strong>, which is locked into the prize
                pool. The Pi Network platform fees for transactions are borne by
                the network.
              </p>
              <p>
                The <strong>Treasury (10%)</strong> funds ongoing platform
                maintenance, security, and community initiatives. Treasury
                balances are publicly transparent on the Pi Testnet.
              </p>
            </div>
          </section>

          {/* 6. Troubleshooting */}
          <section id="troubleshooting">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              6. Troubleshooting
            </h2>
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    "Pi Browser Required" warning
                  </p>
                  <p className="text-sm text-white/70">
                    This means the Pi SDK wasn't detected. You must open PiLuck
                    inside the Pi Browser app. The dApp will show this banner
                    with a download link until it detects the SDK.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    "Connect Wallet" button is grayed out
                  </p>
                  <p className="text-sm text-white/70">
                    Wait for the Pi SDK to initialize (green "Ready" indicator).
                    If it stays yellow, refresh the page or reopen the Pi Browser.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    Payment failed
                  </p>
                  <p className="text-sm text-white/70">
                    Ensure you have at least 1 Testnet Pi in your wallet. Check
                    your balance in the Pi Browser wallet. If the issue persists,
                    try again during off-peak hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    Already purchased — cannot buy again
                  </p>
                  <p className="text-sm text-white/70">
                    One ticket per wallet per round is enforced on-chain. You can
                    enter the next round which begins 12 hours later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 7. API & SDK Reference */}
          <section id="api-reference">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              7. API & SDK Reference
            </h2>
            <div className="glass-card p-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                PiLuck integrates with the Pi Network JavaScript SDK. Key methods
                used in the dApp:
              </p>
              <div className="space-y-3">
                <div className="glass p-4">
                  <code className="text-pi-purple-300">Pi.init()</code>
                  <p className="text-xs text-white/60 mt-1">
                    Initializes the SDK in sandbox/testnet mode.
                  </p>
                </div>
                <div className="glass p-4">
                  <code className="text-pi-purple-300">
                    Pi.authenticate(scopes)
                  </code>
                  <p className="text-xs text-white/60 mt-1">
                    Requests username access (createsession scope).
                  </p>
                </div>
                <div className="glass p-4">
                  <code className="text-pi-purple-300">
                    Pi.createPayment(paymentData, callbacks)
                  </code>
                  <p className="text-xs text-white/60 mt-1">
                    Creates a 1 Pi payment for a lottery ticket on Testnet.
                  </p>
                </div>
                <div className="glass p-4">
                  <code className="text-pi-purple-300">Pi.shareResult(payload)</code>
                  <p className="text-xs text-white/60 mt-1">
                    Shares a win or entry to the Pi social feed.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <FileCode className="w-5 h-5 text-pi-gold-400" />
                <span className="text-sm">
                  For full technical architecture, see the{" "}
                  <Link
                    href="/whitepaper"
                    className="text-pi-gold-300 hover:underline"
                  >
                    PiLuck Whitepaper
                  </Link>
                  .
                </span>
              </div>
            </div>
          </section>

          {/* 8. FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-pi-gold-400 mb-4">
              8. FAQ
            </h2>
            <div className="glass-card p-6 space-y-4">
              <div>
                <p className="font-semibold text-white">
                  Do I need real Pi to play?
                </p>
                <p className="text-sm text-white/70 mt-1">
                  During testnet phase, you use Testnet Pi (sandbox mode). No real
                  monetized Pi is required or charged.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Can I buy multiple tickets?
                </p>
                <p className="text-sm text-white/70 mt-1">
                  No — one ticket per wallet per round. This ensures fair odds for
                  all Pioneers.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  How are winners selected?
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Winners are chosen using verifiable on-chain randomness at the
                  end of each 12-hour round.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Where do I see my ticket and payment info?
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Once confirmed, your dApp dashboard shows your Pioneer username,
                  Payment ID, Tx Hash, and entry amount.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  What happens to unclaimed prizes?
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Prizes auto-claim to your Pi wallet. There is no manual
                  withdrawal step.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Reference Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-4 text-center">
            <Coins className="w-6 h-6 text-pi-gold-400 mx-auto mb-2" />
            <p className="text-xs text-white/60">1 Pi Entry</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Users className="w-6 h-6 text-pi-purple-400 mx-auto mb-2" />
            <p className="text-xs text-white/60">1 Wallet 1 Ticket</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Timer className="w-6 h-6 text-pi-gold-400 mx-auto mb-2" />
            <p className="text-xs text-white/60">12-Hour Rounds</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Trophy className="w-6 h-6 text-pi-purple-400 mx-auto mb-2" />
            <p className="text-xs text-white/60">9 Winners</p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
