"use client";

import { motion } from "framer-motion";
import { Heart, Users, Shield, Sparkles, Trophy, Globe } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Every draw is completely transparent and publicly verifiable.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Community growth remains at the center of the platform.",
  },
  {
    icon: Sparkles,
    title: "Excitement",
    description: "A fun and rewarding experience for every Pi Network user.",
  },
  {
    icon: Trophy,
    title: "Fairness",
    description: "Every ticket has exactly the same probability of winning.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pi-purple-600/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            More Than Just a{" "}
            <span className="text-gradient-purple">Lottery Platform</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            PiLuck is a community engagement ecosystem where participation,
            transparency, fairness, and excitement come together to create a fun
            and rewarding experience for Pi Network users.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-pi-purple-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 glass-card p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-pi-gold-400" />
            <Globe className="w-6 h-6 text-pi-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Every Wallet Starts <span className="text-gradient-gold">Equal</span>
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every Luck draw is completely transparent. Every ticket has exactly
            the same probability. Every wallet starts equally. Community growth
            remains at the center of the platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
}