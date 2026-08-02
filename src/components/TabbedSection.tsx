"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  GitBranch,
  Star,
  Map,
  HelpCircle,
} from "lucide-react";
import About from "./About";
import HowItWorks from "./HowItWorks";
import LotteryExample from "./LotteryExample";
import CorePrinciples from "./CorePrinciples";
import Features from "./Features";
import CommunityEngagement from "./CommunityEngagement";
import Roadmap from "./Roadmap";
import FAQ from "./FAQ";

type TabId = "overview" | "how-it-works" | "features" | "roadmap" | "faq";

const tabs: {
  id: TabId;
  label: string;
  icon: typeof Info;
}[] = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "how-it-works", label: "How It Works", icon: GitBranch },
  { id: "features", label: "Features", icon: Star },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export default function TabbedSection() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pi-purple-600/5 blur-[120px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12 p-2 glass rounded-2xl max-w-3xl mx-auto"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-pi-purple-600 to-pi-purple-500 glow-purple"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-0">
                <About />
                <CorePrinciples />
              </div>
            )}

            {activeTab === "how-it-works" && (
              <div className="space-y-0">
                <HowItWorks />
                <LotteryExample />
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-0">
                <Features />
                <CommunityEngagement />
              </div>
            )}

            {activeTab === "roadmap" && (
              <div>
                <Roadmap />
              </div>
            )}

            {activeTab === "faq" && (
              <div>
                <FAQ />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}