"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Users,
  Timer,
  History,
  ShieldCheck,
  UserCheck,
  Landmark,
  Puzzle,
  Fingerprint,
  Gauge,
  FileCheck,
  Lock,
  BadgeCheck,
  Layers,
  PauseCircle,
  Radio,
  Shield,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Eye,
    title: "Transparent Lottery",
    description: "Provably fair winner selection.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for Pi users.",
  },
  {
    icon: Timer,
    title: "Live Countdown",
    description: "Always know when the next draw ends.",
  },
  {
    icon: History,
    title: "Lottery History",
    description: "Browse previous draws.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Wallet Connection",
    description: "Simple and safe.",
  },
  {
    icon: UserCheck,
    title: "Fair Participation",
    description: "One wallet. One ticket.",
  },
  {
    icon: Landmark,
    title: "Treasury Transparency",
    description: "Track treasury growth and ecosystem contributions.",
  },
  {
    icon: Puzzle,
    title: "Future Ecosystem Integrations",
    description: "Expand into more community experiences over time.",
  },
];

const extendedFeatures = [
  {
    icon: Shield,
    title: "Anti-Whale Protection System",
    description:
      "Enforces strict wallet-level limits (1 ticket per wallet per round) using on-chain or backend validation to prevent multi-account abuse and ensure equal participation.",
  },
  {
    icon: Fingerprint,
    title: "Sybil Attack Detection Layer",
    description:
      "Implements behavioral and wallet-pattern analysis (IP tracking, device fingerprinting, wallet clustering heuristics) to detect and block fake or duplicate accounts.",
  },
  {
    icon: Gauge,
    title: "Fairness Verification Dashboard",
    description:
      "Provides a public verification interface showing randomness source, draw hash, timestamp, and selection method for each lottery round.",
  },
  {
    icon: Lock,
    title: "On-Chain / Verifiable Randomness",
    description:
      "Uses cryptographic randomness (e.g., VRF or equivalent verifiable RNG) to ensure draw results cannot be manipulated.",
  },
  {
    icon: FileCheck,
    title: "Audit & Transparency Logs",
    description:
      "Immutable log system that records all draws, ticket entries, and winner selections for public review and third-party auditing.",
  },
  {
    icon: Timer,
    title: "Rate Limiting & Abuse Prevention",
    description:
      "Backend protection against spam, bot entries, and automated ticket farming using request throttling and behavioral limits.",
  },
  {
    icon: BadgeCheck,
    title: "Wallet Reputation System (Future)",
    description:
      "Assigns trust scores to wallets based on participation history, helping reduce fraud and improve ecosystem integrity.",
  },
  {
    icon: Layers,
    title: "Multi-Layer Security Architecture",
    description:
      "Combines frontend validation, backend rules, and blockchain verification to ensure end-to-end system integrity.",
  },
  {
    icon: PauseCircle,
    title: "Emergency Pause Mechanism",
    description:
      "Admin-controlled safety switch to pause lottery rounds in case of anomalies, exploits, or system threats.",
  },
  {
    icon: Radio,
    title: "Decentralized Result Publishing (Future)",
    description:
      "Broadcasts lottery results across multiple nodes or channels to prevent single-point manipulation or censorship.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pi-purple-600/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Premium <span className="text-gradient-purple">Features</span>
          </h2>
          <p className="text-lg text-white/70">
            Everything you need for a fair, transparent, and exciting Luck draw experience.
          </p>
        </motion.div>

        {/* Main features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-pi-purple-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extended features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Advanced <span className="text-gradient-gold">Security & Fairness</span>
          </h3>
          <p className="text-white/70">
            Enterprise-grade protections ensuring every draw is fair, secure, and verifiable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extendedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pi-gold-500/20 to-pi-purple-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-pi-gold-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}