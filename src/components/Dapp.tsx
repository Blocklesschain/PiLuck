"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Ticket,
  Coins,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Loader2,
  AlertCircle,
  Share2,
  Trophy,
  Hash,
  ExternalLink,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePiSDK } from "@/hooks/usePiSDK";

type TicketState = "idle" | "purchasing" | "confirmed" | "error";

export default function Dapp() {
  const {
    piReady,
    piBrowser,
    connectionState,
    user,
    error: piError,
    isProcessing,
    authenticate,
    createPayment,
    shareResult,
    retryInit,
  } = usePiSDK();

  const [sdkLoading, setSdkLoading] = useState(true);

  // Track SDK loading state
  useEffect(() => {
    if (piReady || piBrowser || piError) {
      setSdkLoading(false);
    }
  }, [piReady, piBrowser, piError]);

  const [ticketState, setTicketState] = useState<TicketState>("idle");
  const [paymentTxid, setPaymentTxid] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    await authenticate();
  };

  const handleBuyTicket = async () => {
    if (connectionState !== "connected") return;

    setTicketState("purchasing");
    const result = await createPayment(1, "PiLuck Lottery Ticket - 1 Pi entry");

    if (result.success) {
      setTicketState("confirmed");
      setPaymentTxid(result.txid || null);
      setPaymentId(result.paymentId || null);
    } else {
      setTicketState("error");
    }
  };

  const handleShare = () => {
    shareResult(
      "I just entered the PiLuck Lottery!",
      "One base ticket per wallet, free streak credits, and equal opportunity. Join me on PiLuck!",
      "https://PiLuck.app"
    );
  };

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "initializing";

  return (
    <section id="dapp" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-pi-purple-600/10 blur-[130px] rounded-full animate-pulse-glow" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pi-gold-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pi-purple-500/5 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className={`w-2 h-2 rounded-full ${piReady ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
            <span className="text-sm text-white/80">
              {piReady ? "Pi sandbox mode active" : piBrowser ? "Initializing Pi SDK..." : "Waiting for Pi Browser"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Enter the <span className="text-gradient-gold glow-text-gold">Lucky Draw</span>
          </h2>
          <p className="text-lg text-white/70">
            Connect your Pi wallet, claim your base ticket, and use free streak
            credits for extra entries. Equal Opportunity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - Steps & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Step 1: Connect Wallet */}
            <div className={`glass-card-hover p-5 flex items-center gap-4 ${isConnected ? "border-pi-gold-500/40" : ""}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isConnected ? "bg-gradient-to-br from-pi-gold-400 to-pi-gold-600 glow-gold" : "bg-white/10"}`}>
                {isConnected ? (
                  <CheckCircle2 className="w-6 h-6 text-black" />
                ) : isConnecting ? (
                  <Loader2 className="w-6 h-6 text-pi-gold-400 animate-spin" />
                ) : (
                  <Wallet className="w-6 h-6 text-pi-gold-300" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">Connect Pi Wallet</p>
                <p className="text-sm text-white/60">
                  {isConnected ? `Connected as ${user?.username}` : "Authenticate with Pi Network"}
                </p>
              </div>
            </div>

            {/* Step 2: Buy Ticket */}
            <div className={`glass-card-hover p-5 flex items-center gap-4 ${ticketState === "confirmed" ? "border-pi-purple-500/40" : ""}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ticketState === "confirmed" ? "bg-gradient-to-br from-pi-purple-500 to-pi-purple-700 glow-purple" : "bg-white/10"}`}>
                {ticketState === "confirmed" ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : ticketState === "purchasing" ? (
                  <Loader2 className="w-6 h-6 text-pi-purple-300 animate-spin" />
                ) : (
                  <Ticket className="w-6 h-6 text-pi-purple-300" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">Buy 1 Pi Ticket</p>
                <p className="text-sm text-white/60">
                  {ticketState === "confirmed" ? "Ticket confirmed on-chain" : "One base ticket per wallet - 1 Pi"}
                </p>
              </div>
            </div>

            {/* Step 3: Win */}
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/10">
                <Trophy className="w-6 h-6 text-pi-gold-300" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Win Equal Share</p>
                <p className="text-sm text-white/60">9 winners - 10% of pool each</p>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-sm text-white/50 pl-2">
              <Shield className="w-4 h-4 text-pi-gold-400" />
              Smart contract secured - Provably fair - On-chain transparent
            </div>

            {/* SDK status */}
            <div className="flex items-center gap-2 text-xs text-white/40 pl-2">
              <span className={`w-1.5 h-1.5 rounded-full ${piReady ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
              Pi SDK {piReady ? "Ready" : piBrowser ? "Loading..." : "Not detected"}
            </div>
          </motion.div>

          {/* Right - Live Draw Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative"
          >
            <div className="glass-card p-8 md:p-10 glow-purple relative">
              {/* Status badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full glass bg-gradient-to-r from-pi-purple-600/40 to-pi-gold-500/40 whitespace-nowrap">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`w-2 h-2 rounded-full ${ticketState === "confirmed" ? "bg-green-400" : "bg-pi-gold-400"} animate-pulse`} />
                  {ticketState === "confirmed" ? "Ticket Confirmed" : isConnected ? "Ready to Enter" : piReady ? "Round Live" : "Awaiting SDK"}
                </span>
              </div>

              {/* Jackpot */}
              <div className="text-center pt-6 mb-8">
                <p className="text-sm text-white/60 mb-2">Entry Price</p>
                <p className="text-5xl md:text-6xl font-bold text-gradient-gold glow-text-gold">
                  1 Pi
                </p>
                <p className="text-xs text-white/40 mt-2">Base ticket in Pi Browser sandbox mode</p>
              </div>

              {/* CTA Area */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {/* Not in Pi Browser warning */}
                  {!piBrowser && !piReady && (
                    <motion.div
                      key="no-browser"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30 space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Info className="w-6 h-6 text-yellow-400 shrink-0" />
                        <div>
                          <p className="font-semibold text-yellow-300">Pi Browser Required</p>
                          <p className="text-sm text-yellow-200/70 mt-1">
                            This dApp requires the Pi Browser to connect your wallet and make payments.
                            Please open this page inside the Pi Browser app on your device.
                          </p>
                        </div>
                      </div>
                      <a
                        href="https://minepi.com/pi-browser"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
                      >
                        Download Pi Browser
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}

                  {/* Error state */}
                  {(piError || ticketState === "error") && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <p className="text-sm text-red-300">{piError || "Payment failed. Please try again."}</p>
                    </motion.div>
                  )}

                  {/* Disconnected: Connect Wallet */}
                  {piReady && !isConnected && !piError && (
                    <motion.button
                      key="connect"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleConnectWallet}
                      disabled={isConnecting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-pi-gold-500 to-pi-gold-600 text-black font-bold text-lg hover:opacity-90 transition-all glow-gold flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          Connect Pi Wallet
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  )}

                  {/* Connected, no ticket: Buy Ticket */}
                  {isConnected && ticketState !== "confirmed" && (
                    <motion.button
                      key="buy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleBuyTicket}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-pi-purple-600 to-pi-purple-500 font-bold text-lg hover:opacity-90 transition-all glow-purple flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Coins className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          Enter with 1 Pi
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  )}

                  {/* Ticket confirmed */}
                  {ticketState === "confirmed" && (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-pi-gold-500/20 to-pi-purple-600/20 border border-pi-gold-500/40 font-bold text-lg flex items-center justify-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-pi-gold-400" />
                        Ticket Confirmed - Good Luck!
                      </div>

                      {/* Ticket details */}
                      <div className="glass-card p-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-white/60">
                            <Wallet className="w-4 h-4" />
                            Pioneer
                          </span>
                          <span className="font-semibold">@{user?.username}</span>
                        </div>
                        {paymentId && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-white/60">
                              <Hash className="w-4 h-4" />
                              Payment ID
                            </span>
                            <span className="font-mono text-xs text-pi-purple-300">
                              {paymentId.slice(0, 16)}...
                            </span>
                          </div>
                        )}
                        {paymentTxid && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-white/60">
                              <Shield className="w-4 h-4" />
                              Tx Hash
                            </span>
                            <span className="font-mono text-xs text-pi-purple-300">
                              {paymentTxid.slice(0, 16)}...
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-white/60">
                            <Coins className="w-4 h-4" />
                            Amount Paid
                          </span>
                          <span className="font-bold text-pi-gold-400">1 Pi</span>
                        </div>
                      </div>

                      {/* Share button */}
                      <button
                        onClick={handleShare}
                        className="w-full py-3 rounded-xl glass font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5 text-pi-gold-400" />
                        Share on Pi
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* User info when connected */}
                {isConnected && ticketState !== "confirmed" && (
                  <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                    <Sparkles className="w-4 h-4 text-pi-gold-400" />
                    Connected as @{user?.username}
                  </div>
                )}

                <p className="text-center text-xs text-white/40">
                  By entering you agree to the PiLuck fair play rules. 1 base
                  ticket per wallet per round, with free credits unlocked by
                  streak milestones. Payments are processed in Pi Browser sandbox mode.
                </p>
              </div>
            </div>

            {/* Floating badge - 9 Winners */}
            <div className="absolute -bottom-6 -right-6 glass-card p-4 animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pi-gold-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pi-gold-300" />
                </div>
                <div>
                  <p className="text-xs text-white/60">9 Winners</p>
                  <p className="font-semibold text-sm">10% Share Each</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
