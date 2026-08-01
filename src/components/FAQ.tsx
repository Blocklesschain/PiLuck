"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much is a ticket?",
    answer:
      "Each ticket costs exactly 1 Pi. This simple, fixed price ensures that everyone can participate equally, regardless of their wallet size.",
  },
  {
    question: "Can I buy multiple tickets?",
    answer:
      "No. Only one ticket per wallet is allowed for each lottery round. This rule ensures fairness and prevents large holders from dominating the draw.",
  },
  {
    question: "Why only one ticket per wallet?",
    answer:
      "The one-ticket-per-wallet rule is at the core of PiLuck's fairness model. It ensures that every participant has exactly the same chance of winning, regardless of how much Pi they hold. This prevents whales from dominating the lottery and keeps the platform truly community-driven.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are selected randomly using cryptographic randomness (VRF or equivalent verifiable RNG). The platform randomly selects 9 winning wallets from all participants in the round. Every ticket has exactly the same probability of winning.",
  },
  {
    question: "How often are draws held?",
    answer:
      "A new lottery round begins every 12 hours. When the countdown reaches zero, the lottery closes automatically, winners are selected, prizes are distributed, and a brand-new round begins immediately.",
  },
  {
    question: "How is the treasury used?",
    answer:
      "10% of the total prize pool is automatically allocated to the PiLuck Treasury Wallet. The treasury supports platform maintenance, future development, community campaigns, ecosystem partnerships, security improvements, and marketing initiatives.",
  },
  {
    question: "Is participation transparent?",
    answer:
      "Yes. Every draw is completely transparent and publicly verifiable. We provide a fairness verification dashboard showing randomness source, draw hash, timestamp, and selection method for each lottery round. All draws, ticket entries, and winner selections are recorded in immutable audit logs.",
  },
  {
    question: "What happens after every draw?",
    answer:
      "After each draw, 90% of the total prize pool is distributed equally among the 9 winners (each receiving 10%), 10% goes to the PiLuck Treasury, and a brand-new lottery round begins immediately.",
  },
  {
    question: "When will the dApp launch?",
    answer:
      "The public dApp launch is planned for Phase 3 of our roadmap. We're currently in Phase 1 (Website Launch) and Phase 2 (Community Building). Join our community to stay updated on the latest development progress and launch announcements.",
  },
  {
    question: "How do I join the community?",
    answer:
      "You can join our community through Discord, Telegram, X (Twitter), and GitHub. Follow us on social media, subscribe to our newsletter, and join our community channels to stay updated on announcements, development updates, and launch notifications.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pi-purple-600/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient-purple">Questions</span>
          </h2>
          <p className="text-lg text-white/70">
            Everything you need to know about PiLuck.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-pi-purple-300 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-white/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}