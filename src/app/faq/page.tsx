import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "FAQ — PiLuck",
  description: "Frequently asked questions about PiLuck.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <FAQ />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
