"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Ticket, Users, Coins, Sparkles, Shield, Timer, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-pi-purple-600/20 blur-[120px] rounded-full animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-pi-gold-500/10 blur-[100px] rounded-full animate-pulse-glow" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-pi-gold-400 animate-pulse" />
              <span className="text-sm text-white/80">The Community Luck Platform for Pioneers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-6"
            >
              One Pi. One Base Ticket. <span className="text-gradient glow-text-purple">Free Credits.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              PiLuck transforms every draw into a transparent community experience
              where everyone has an equal chance to win. Built for the Pi Network ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#dapp"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pi-gold-500 to-pi-gold-600 text-black font-bold text-lg hover:opacity-90 transition-all glow-gold"
              >
                <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Connect Wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#community"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pi-purple-600 to-pi-purple-500 font-semibold text-lg hover:opacity-90 transition-all glow-purple"
              >
                Join Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/whitepaper"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <FileText className="w-5 h-5" />
                Read Whitepaper
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Shield className="w-4 h-4 text-pi-purple-400" />
                Provably Fair
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Timer className="w-4 h-4 text-pi-gold-400" />
                12-Hour Rounds
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Users className="w-4 h-4 text-pi-purple-400" />
                Community Powered
              </div>
            </motion.div>
          </div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main card */}
              <div className="glass-card p-8 glow-purple relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-white/60">Entry Price</p>
                    <p className="text-4xl font-bold text-gradient-gold glow-text-gold mt-1">
                      1 Pi
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pi-gold-400 to-pi-gold-600 flex items-center justify-center glow-gold">
                    <Coins className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ticket Limit</span>
                    <span className="font-semibold">1 per wallet</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Round Duration</span>
                    <span className="font-semibold">12 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Winners per Round</span>
                    <span className="font-semibold text-pi-gold-400">9 (10% each)</span>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
                  <div className="h-full w-full bg-gradient-to-r from-pi-purple-500 to-pi-gold-400 rounded-full" />
                </div>

                <a
                  href="#dapp"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pi-purple-600 to-pi-purple-500 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Enter the Draw
                </a>
              </div>

              {/* Floating ticket */}
              <div className="absolute -top-8 -right-8 glass-card p-4 animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pi-purple-500/20 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-pi-purple-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Your Ticket</p>
                    <p className="font-semibold text-sm">#0001</p>
                  </div>
                </div>
              </div>

              {/* Floating winner */}
              <div className="absolute -bottom-8 -left-8 glass-card p-4 animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pi-gold-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-pi-gold-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">9 Winners</p>
                    <p className="font-semibold text-sm">10% Each</p>
                  </div>
                </div>
              </div>

              {/* Glow orbs */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-pi-purple-500/20 blur-3xl rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pi-gold-500/20 blur-3xl rounded-full animate-pulse-glow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
