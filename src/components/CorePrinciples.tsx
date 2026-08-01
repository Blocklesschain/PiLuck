"use client";

import { motion } from "framer-motion";
import {
  Scale,
  UserCheck,
  Eye,
  Heart,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const principles = [
  {
    icon: Scale,
    title: "Equal Opportunity",
    description: "Every ticket has the exact same chance of winning.",
  },
  {
    icon: UserCheck,
    title: "One Wallet One Ticket",
    description: "Fair participation. No whales. No dominance.",
  },
  {
    icon: Eye,
    title: "Transparent Draw",
    description: "Every result is publicly verifiable.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "The community powers every single round.",
  },
  {
    icon: TrendingUp,
    title: "Treasury Growth",
    description: "A sustainable treasury supports long-term development.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Lottery",
    description: "A new round begins every 12 hours.",
  },
];

export default function CorePrinciples() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pi-gold-500/5 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient-purple">Core Principles</span>
          </h2>
          <p className="text-lg text-white/70">
            The foundation that makes PiLuck fair, transparent, and community-driven.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <principle.icon className="w-7 h-7 text-pi-purple-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}