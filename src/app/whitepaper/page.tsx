import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";

export const metadata = {
  title: "Whitepaper — PiLuck",
  description: "PiLuck comprehensive whitepaper and technical documentation.",
};

export default function WhitepaperPage() {
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
          <span className="text-gradient-gold">PiLuck</span> Whitepaper
        </h1>

        <p className="text-lg text-white/70 text-center max-w-3xl mx-auto mb-12">
          The Community Luck Platform for Pioneers
        </p>

        <div className="glass-card p-8 max-w-4xl mx-auto space-y-8">
          {/* Table of Contents */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-pi-gold-400">Table of Contents</h2>
            <ul className="space-y-2 text-white/70">
              <li>1. Abstract</li>
              <li>2. Introduction</li>
              <li>3. Core Principles</li>
              <li>4. How It Works</li>
              <li>5. Lottery Mechanism</li>
              <li>6. Prize Distribution</li>
              <li>7. Pi Testnet Integration</li>
              <li>8. Security Model</li>
              <li>9. Credits System</li>
              <li>10. Token Economics</li>
              <li>11. Roadmap</li>
              <li>12. Disclaimer</li>
            </ul>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">1. Abstract</h2>
            <p className="text-white/70 leading-relaxed">
              PiLuck is a transparent, community-first lucky draw platform built for the Pi Network
              ecosystem. It operates on a simple principle: one Pi, one ticket, equal opportunity.
              The platform leverages Pi Testnet for all blockchain transactions, ensuring
              transparency and fairness.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">2. Introduction</h2>
            <p className="text-white/70 leading-relaxed">
              Traditional lotteries are often opaque and geographically restricted. PiLuck
              democratizes the lucky draw experience by building it on the Pi Network blockchain,
              where every transaction is publicly verifiable and participation is open to all
              Pioneers worldwide.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">3. Core Principles</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li><strong>Equal Opportunity:</strong> Every Pioneer has the same odds regardless of stake.</li>
              <li><strong>One Wallet, One Ticket:</strong> Prevents whale dominance and ensures fairness.</li>
              <li><strong>Transparent Draw:</strong> All draws use verifiable on-chain randomness.</li>
              <li><strong>Community First:</strong> The platform serves the Pi community.</li>
              <li><strong>Treasury Growth:</strong> 10% of each pool funds platform development.</li>
              <li><strong>Continuous Lottery:</strong> A new round begins immediately after each draw.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">4. How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-white/70">
              <li><strong>Connect Wallet:</strong> Authenticate with your Pi Network wallet via the Pi Browser.</li>
              <li><strong>Buy Ticket:</strong> Purchase exactly one ticket for 1 Pi per round.</li>
              <li><strong>Enter Round:</strong> Your ticket enters the current 12-hour lottery round.</li>
              <li><strong>Round Closes:</strong> When the countdown reaches zero, the round closes automatically.</li>
              <li><strong>9 Winners Selected:</strong> The smart contract randomly selects 9 winning wallets.</li>
              <li><strong>Distribution:</strong> 90% of the pool is distributed equally (10% each to 9 winners).</li>
              <li><strong>Treasury:</strong> 10% goes to the PiLuck Treasury for platform growth.</li>
              <li><strong>New Round:</strong> A brand-new lottery round begins immediately.</li>
            </ol>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">5. Lottery Mechanism</h2>
            <p className="text-white/70 leading-relaxed">
              Each round runs for 12 hours. Every Pioneer can purchase exactly one ticket (1 Pi)
              per wallet per round. The total pool size equals the number of entries multiplied by 1 Pi.
              Example: 10,000 participants = 10,000 Pi pool.
            </p>
            <p className="text-white/70 leading-relaxed">
              When the round closes, the smart contract selects 9 random winners using verifiable
              random function (VRF) on the Pi blockchain. Each winner receives 10% of the total pool.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">6. Prize Distribution</h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>90% of the pool distributed equally to 9 winners (10% each)</li>
              <li>10% of the pool goes to the PiLuck Treasury</li>
              <li>All distributions are automatic via smart contract</li>
              <li>Winners can share their victory on Pi social feed</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">7. Pi Testnet Integration</h2>
            <p className="text-white/70 leading-relaxed">
              PiLuck operates on the Pi Network Testnet (sandbox mode). All transactions — wallet
              connection, authentication, and payments — are processed through the official Pi SDK
              (https://sdk.pinetwork.com/pi-sdk.js). Users must access PiLuck through the Pi Browser
              app for full functionality.
            </p>
            <p className="text-white/70 leading-relaxed">
              The Pi SDK handles authentication (username + payment scopes) and payment creation
              via the Pi blockchain. Payment callbacks handle server approval and completion
              states, ensuring secure and transparent transactions.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">8. Security Model</h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Provably fair: All draws are on-chain and verifiable</li>
              <li>Smart contract audited: Core logic deployed on Pi Testnet</li>
              <li>No private keys stored: Users maintain full wallet control</li>
              <li>One ticket per wallet: Prevents sybil attacks</li>
              <li>Bot detection: Automated entries are monitored and blocked</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">9. Credits System</h2>
            <p className="text-white/70 leading-relaxed">
              Free Users get 1 free entry every 24 hours. Credits (1 Credit = 1 Pi) allow
              additional entries. Credits are a complimentary gift with no cash value and are
              non-transferable. PiLuck Labs reserves the right to modify the Credits system at
              any time.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">10. Token Economics</h2>
            <p className="text-white/70 leading-relaxed">
              Entry fee: 1 Pi per ticket
              Winners: 9 (each receives 10% of pool)
              Treasury: 10% of each round pool
              Treasury usage: Platform development, security, community rewards
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">11. Roadmap</h2>
            <p className="text-white/70 leading-relaxed">
              Phase 1: Testnet launch with basic lottery (current)
              Phase 2: Mainnet deployment
              Phase 3: Multi-token support
              Phase 4: Governance token launch
              Phase 5: Cross-chain integration
              See the Roadmap page for full details.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-pi-gold-400">12. Disclaimer</h2>
            <p className="text-white/70 leading-relaxed">
              PiLuck is a blockchain-based entertainment platform. It does not provide financial,
              investment, or legal advice. There is no guarantee of returns or winnings. All
              blockchain transactions are final. Please participate responsibly and at your own risk.
              See Terms & Conditions and Privacy Policy for full details.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
