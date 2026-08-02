import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Dapp from "@/components/Dapp";
import LiveStats from "@/components/LiveStats";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Dapp />
      <LiveStats />
      <Community />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
