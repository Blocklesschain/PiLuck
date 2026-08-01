import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import CommunityEngagement from "@/components/CommunityEngagement";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Features — PiLucky",
  description: "Explore all features and security measures of PiLucky.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <Features />
        <CommunityEngagement />
      </div>
      <Footer />
    </main>
  );
}