import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import LotteryExample from "@/components/LotteryExample";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How It Works — PiLucky",
  description: "Step-by-step guide to the PiLucky lottery process.",
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
    </main>
  );
}