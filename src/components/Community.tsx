"use client";

import { motion } from "framer-motion";
import {
  Send,
  Twitter,
} from "lucide-react";

const communityLinks = [
  { icon: Send, label: "Telegram", href: "https://t.me/pi_luck", color: "text-[#229ED9]" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/Pi_Luck", color: "text-white" },
];

export default function Community() {
  return (
    <section id="community" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-pi-purple-600/10 blur-[120px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join the <span className="text-gradient-purple">Community</span>
          </h2>
          <p className="text-lg text-white/70">
            Be part of the PiLuck journey from the very beginning.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-xl mx-auto">
          {communityLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card-hover p-6 text-center group"
            >
              <link.icon
                className={`w-8 h-8 ${link.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
              />
              <p className="font-semibold text-sm">{link.label}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 glass-card p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Stay Connected with <span className="text-gradient-gold">PiLuck</span>
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Follow our journey, get early access, and be the first to know when
            the dApp launches. Join our community channels today!
          </p>
        </motion.div>
      </div>
    </section>
  );
}