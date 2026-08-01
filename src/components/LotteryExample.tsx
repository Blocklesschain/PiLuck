"use client";

import { motion } from "framer-motion";
import { Users, Coins, Trophy, Landmark, ArrowRight } from "lucide-react";

const winners = [
  { name: "Winner 1", amount: "1,000 Pi" },
  { name: "Winner 2", amount: "1,000 Pi" },
  { name: "Winner 3", amount: "1,000 Pi" },
  { name: "Winner 4", amount: "1,000 Pi" },
  { name: "Winner 5", amount: "1,000 Pi" },
  { name: "Winner 6", amount: "1,000 Pi" },
  { name: "Winner 7", amount: "1,000 Pi" },
  { name: "Winner 8", amount: "1,000 Pi" },
  { name: "Winner 9", amount: "1,000 Pi" },
];

export default function LotteryExample() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-pi-purple-600/10 blur-[120px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            See How the <span className="text-gradient-gold">Distribution</span> Works
          </h2>
          <p className="text-lg text-white/70">
            A clear example of how every round distributes the prize pool.
          </p>
        </motion.div>

        {/* Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <div className="glass-card px-8 py-6 text-center">
            <Users className="w-8 h-8 text-pi-purple-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">10,000</p>
            <p className="text-sm text-white/60">Users</p>
          </div>
          <ArrowRight className="w-8 h-8 text-pi-gold-400" />
          <div className="glass-card px-8 py-6 text-center">
            <Coins className="w-8 h-8 text-pi-gold-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">1 Pi</p>
            <p className="text-sm text-white/60">Per Ticket</p>
          </div>
          <ArrowRight className="w-8 h-8 text-pi-gold-400" />
          <div className="glass-card px-8 py-6 text-center glow-gold">
            <Trophy className="w-8 h-8 text-pi-gold-300 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gradient-gold">10,000 Pi</p>
            <p className="text-sm text-white/60">Total Pool</p>
          </div>
        </motion.div>

        {/* Distribution */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Winners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-pi-purple-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-pi-purple-300" />
              </div>
              <h3 className="font-semibold text-lg">9 Winners — 90% of Pool</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {winners.map((winner, index) => (
                <motion.div
                  key={winner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card-hover p-4 text-center"
                >
                  <p className="text-xs text-white/60 mb-1">{winner.name}</p>
                  <p className="font-bold text-pi-gold-300">{winner.amount}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Treasury */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-pi-gold-500/20 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-pi-gold-300" />
              </div>
              <h3 className="font-semibold text-lg">Treasury — 10% of Pool</h3>
            </div>

            <div className="glass-card-hover p-6 text-center mb-6">
              <p className="text-4xl font-bold text-gradient-gold mb-2">1,000 Pi</p>
              <p className="text-sm text-white/60">Allocated to PiLuck Treasury</p>
            </div>

            <div className="flex-1">
              <p className="text-sm text-white/60 mb-4">The treasury supports:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Platform Maintenance",
                  "Future Development",
                  "Community Campaigns",
                  "Ecosystem Partnerships",
                  "Security Improvements",
                  "Marketing Initiatives",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}