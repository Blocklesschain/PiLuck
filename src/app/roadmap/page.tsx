import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Roadmap — PiLuck",
  description: "PiLuck development roadmap and future phases.",
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <Roadmap />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
