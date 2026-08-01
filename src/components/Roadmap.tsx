"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Rocket,
  Target,
  Award,
  Gift,
  Box,
  Calendar,
  Sparkles,
  Handshake,
  Smartphone,
} from "lucide-react";

const phases = [
  { icon: Globe, title: "Website Launch", status: "current" },
  { icon: Users, title: "Community Building", status: "upcoming" },
  { icon: Rocket, title: "Public dApp Launch", status: "upcoming" },
  { icon: Target, title: "Daily Missions", status: "upcoming" },
  { icon: Award, title: "Achievements", status: "upcoming" },
  { icon: Gift, title: "Luck Wheel", status: "upcoming" },
  { icon: Box, title: "Luck Chests", status: "upcoming" },
  { icon: Calendar, title: "Seasonal Campaigns", status: "upcoming" },
  { icon: Sparkles, title: "Creator Luck Events", status: "upcoming" },
  { icon: Handshake, title: "Ecosystem Partnerships", status: "upcoming" },
  { icon: Smartphone, title: "Mobile Experience", status: "upcoming" },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pi-gold-500/5 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient-purple">Roadmap</span>
          </h2>
          <p className="text-lg text-white/70">
            The journey ahead — from launch to a full community ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pi-purple-500/50 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
              >
                <div className="glass-card-hover p-6 text-center h-full">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${phase.status === "current"
                          ? "bg-gradient-to-br from-pi-gold-400 to-pi-gold-600 glow-gold"
                          : "bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20"
                        }`}
                    >
                      <phase.icon
                        className={`w-6 h-6 ${phase.status === "current"
                            ? "text-white"
                            : "text-pi-purple-300"
                          }`}
                      />
                    </div>
                    <span className="text-xs font-bold text-white/40 mb-2 block">
                      Phase {index + 1}
                    </span>
                    <h3 className="font-semibold text-sm mb-2">{phase.title}</h3>
                    {phase.status === "current" && (
                      <span className="px-2 py-1 rounded-full bg-pi-gold-500/20 text-pi-gold-300 text-xs font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}