import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Privacy Policy — PiLuck",
  description: "PiLuck Privacy Policy. How we collect and use your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Privacy <span className="text-gradient-gold">Policy</span>
        </h1>
        <div className="glass-card p-8 max-w-3xl mx-auto space-y-6">
          <p className="text-white/70 leading-relaxed">
            This Privacy Policy describes how PiLuck collects, uses, and protects your information.
          </p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">1. Information We Collect</h2>
            <p className="text-white/70 leading-relaxed">
              When you connect your Pi wallet, we receive your Pi Network username and UID.
              We do not collect private keys, seed phrases, or payment information directly.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">2. How We Use Your Information</h2>
            <p className="text-white/70 leading-relaxed">
              Your information is used solely to identify your account for lottery participation
              and to display your ticket history. We do not sell or share your personal data.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">3. Data Storage</h2>
            <p className="text-white/70 leading-relaxed">
              User data is stored locally in your browser. No personal data is stored on our servers.
              All lottery transactions are recorded on the Pi blockchain.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">4. Cookies</h2>
            <p className="text-white/70 leading-relaxed">
              We use essential cookies for site functionality. No tracking or analytics cookies
              are used. You may disable cookies in your browser settings.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">5. Third-Party Services</h2>
            <p className="text-white/70 leading-relaxed">
              The Pi Network SDK and blockchain are third-party services. Their privacy policies
              apply to data they process. We are not responsible for third-party practices.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">6. Changes to This Policy</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes are effective immediately.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-pi-gold-400">7. Contact</h2>
            <p className="text-white/70 leading-relaxed">
              For privacy-related questions, contact us through our community channels.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
