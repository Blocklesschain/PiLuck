import Navbar from "@/components/Navbar";
import About from "@/components/About";
import CorePrinciples from "@/components/CorePrinciples";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "About — PiLuck",
  description: "Learn about PiLuck's mission, values, and core principles.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <About />
        <CorePrinciples />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}