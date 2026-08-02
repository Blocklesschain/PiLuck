import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Terms & Conditions — PiLuck",
  description: "PiLuck Terms & Conditions. Please read carefully before participating.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Terms & <span className="text-gradient-gold">Conditions</span>
        </h1>

        <div className="glass-card p-8 max-w-3xl mx-auto space-y-6">
          <p className="text-white/70 leading-relaxed">
            Please read these terms carefully before participating.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">1. Acceptance of Terms</h2>
            <p className="text-white/70 leading-relaxed">
              Participation in PiLuck is completely voluntary. By accessing or using the PiLuck
              platform, you acknowledge that you have read, understood, and agree to be bound
              by these Terms and Conditions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">2. User Responsibility</h2>
            <p className="text-white/70 leading-relaxed">
              Users are responsible for ensuring compliance with the laws and regulations of
              their country before using the platform. PiLuck makes no representations regarding
              the legality of participation in any jurisdiction.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">3. Blockchain Transactions</h2>
            <p className="text-white/70 leading-relaxed">
              All blockchain transactions are final and cannot be reversed once confirmed on
              the network. Users acknowledge and accept that transactions submitted through the
              platform cannot be undone, refunded, or modified after confirmation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">4. Rewards and Prize Pools</h2>
            <p className="text-white/70 leading-relaxed">
              Rewards, prize pools, and distributions are subject to smart contract rules and
              available funds. PiLuck does not guarantee profits, returns, or winnings to any
              participant. All rewards are distributed according to the transparent smart
              contract and the configured Pi Browser sandbox flow.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">5. Wallet Security</h2>
            <p className="text-white/70 leading-relaxed">
              Users are responsible for the security of their wallets, private keys, and seed
              phrases. PiLuck does not have access to user private keys and cannot recover
              lost credentials or reverse transactions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">6. Prohibited Activities</h2>
            <p className="text-white/70 leading-relaxed">
              Any attempt to exploit bugs, manipulate the platform, use bots, automate
              participation, or engage in fraudulent activities may result in immediate
              disqualification from rewards and permanent banning from the platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">7. Modifications</h2>
            <p className="text-white/70 leading-relaxed">
              The platform may update features, reward mechanisms, or these terms at any time
              without prior notice. It is the user's responsibility to review these terms
              periodically for changes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">8. Disclaimer of Warranties</h2>
            <p className="text-white/70 leading-relaxed">
              PiLuck is provided on an "as is" and "as available" basis without warranties of
              any kind, either express or implied, including but not limited to, implied
              warranties of merchantability, fitness for a particular purpose, non-infringement,
              or course of performance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">9. Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              The PiLuck team shall not be liable for any losses arising from market
              volatility, technical issues, wallet errors, transaction failures, or
              third-party service failures. In no event shall PiLuck be liable for any
              indirect, incidental, special, consequential, or punitive damages.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">10. Governing Law</h2>
            <p className="text-white/70 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the
              Pi Network ecosystem. Any disputes shall be resolved through community-driven
              governance mechanisms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">11. Free Participation</h2>
            <p className="text-white/70 leading-relaxed">
              <strong>Pi Free Giveaway - Open to Everyone!</strong> Everyone is welcome to
              participate. The base entry is 1 Pi, and free Credits can be earned through daily streaks.
            </p>
            <p className="text-white/70 leading-relaxed">
              <strong>Free Users:</strong> One base entry per wallet per round, with Credits unlocking extra entries after the cooldown.
            </p>
            <p className="text-white/70 leading-relaxed">
              <strong>Credits:</strong> Users can use their complimentary Credits to
              participate multiple times, increasing their opportunities to win. Credits are earned only through streak milestones and have no cash value.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">12. Credits Disclaimer</h2>
            <p className="text-white/70 leading-relaxed">
              Credits are provided as a complimentary gift, have no cash value, and are
              non-transferable. Lost, expired, or technically affected Credits cannot be
              restored or recovered. Credits may only be used after the applicable cooldown.
              PiLuck Labs reserves the right to modify, suspend, replace, discontinue, or change
              the Credits system—including their usage, validity, eligibility, and rewards—at any time without prior notice.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">13. Entertainment Purposes</h2>
            <p className="text-white/70 leading-relaxed">
              <strong>Gentle Reminder:</strong> Try PiLuck using your free Pi reward coins
              and enjoy the experience purely for fun. Please participate responsibly. PiLuck
              is intended solely for entertainment purposes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">14. General Disclaimer</h2>
            <p className="text-white/70 leading-relaxed">
              PiLuck is a blockchain-based entertainment and rewards platform. It does not
              provide financial, investment, or legal advice. Users should participate
              responsibly and at their own discretion. Continued use of the platform
              constitutes acceptance of these Terms & Conditions.
            </p>
          </div>

        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
