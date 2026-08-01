"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2, Send } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribed(true);
  };

  return (
    <section id="newsletter" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pi-gold-500/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-pi-purple-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay <span className="text-gradient-gold">Updated</span>
          </h2>
          <p className="text-white/70 mb-8">
            Receive announcements, development updates, and launch notifications.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-pi-gold-300"
            >
              <CheckCircle2 className="w-6 h-6" />
              <p className="font-semibold">You're subscribed! Welcome to the community.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-pi-purple-500/50 focus:outline-none focus:ring-2 focus:ring-pi-purple-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pi-purple-600 to-pi-purple-500 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 glow-purple"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 text-left">
                  {errors.email.message}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}