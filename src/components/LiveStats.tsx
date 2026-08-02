"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coins,
  Timer,
  Users,
  Trophy,
  Award,
  Sparkles,
} from "lucide-react";

interface Stat {
  icon: any;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const stats: Stat[] = [
  { icon: Coins, label: "Current Jackpot", value: 10000, prefix: "", suffix: " Pi" },
  { icon: Timer, label: "Current Round", value: 42, prefix: "#" },
  { icon: Timer, label: "Hours Remaining", value: 5, suffix: "h" },
  { icon: Users, label: "Participants", value: 10000 },
  { icon: Trophy, label: "Total Pi Distributed", value: 250000, suffix: " Pi" },
  { icon: Award, label: "Total Winners", value: 378 },
];

function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function LiveStats() {
  return (
    <section id="stats" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pi-purple-600/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Live <span className="text-gradient-gold">Statistics</span>
          </h2>
          <p className="text-lg text-white/70">
            Real-time platform metrics and community growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-pi-purple-300" />
              </div>
              <p className="text-2xl font-bold text-gradient mb-1">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-white/50"
        >
          <Sparkles className="w-4 h-4 text-pi-gold-400" />
          <span>Statistics are placeholder values and will update at launch</span>
        </motion.div>
      </div>
    </section>
  );
}