import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import LotteryExample from "@/components/LotteryExample";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "How It Works — PiLuck",
  description: "Step-by-step guide to the PiLuck lottery process.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <HowItWorks />
        <LotteryExample />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
