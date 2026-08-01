"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Ticket,
  Timer,
  Lock,
  Users,
  Trophy,
  RefreshCw,
  Coins,
} from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Your Pi Wallet",
    description: "Securely connect your Pi Network wallet to get started.",
  },
  {
    icon: Ticket,
    title: "Purchase One Ticket",
    description: "Buy exactly one ticket for 1 Pi. Only one ticket per wallet per round.",
  },
  {
    icon: Timer,
    title: "Enter the 12-Hour Round",
    description: "Your ticket enters the current lottery round with a live countdown.",
  },
  {
    icon: Lock,
    title: "Round Closes Automatically",
    description: "When the countdown reaches zero, the lottery closes automatically.",
  },
  {
    icon: Users,
    title: "9 Winners Selected",
    description: "The platform randomly selects 9 winning wallets.",
  },
  {
    icon: Trophy,
    title: "Prize Distribution",
    description: "90% distributed equally. Each winner receives 10% of the pool.",
  },
  {
    icon: Coins,
    title: "Treasury Allocation",
    description: "10% goes to the PiLuck Treasury for platform growth.",
  },
  {
    icon: RefreshCw,
    title: "New Round Begins",
    description: "A brand-new lottery round begins immediately.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pi-gold-500/5 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-gradient-purple">PiLuck</span> Works
          </h2>
          <p className="text-lg text-white/70">
            A simple, transparent, and fair process from start to finish.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pi-purple-500/50 via-pi-gold-500/30 to-transparent" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                  }`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-pi-purple-500 to-pi-purple-700 flex items-center justify-center glow-purple z-10">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card-hover p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-pi-purple-500/20 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-pi-purple-300" />
                      </div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.description}
                    </p>
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