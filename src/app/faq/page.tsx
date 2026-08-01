import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ — PiLucky",
  description: "Frequently asked questions about PiLucky.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
