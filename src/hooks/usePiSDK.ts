/**
 * usePiSDK - Custom hook for Pi Network SDK integration
 * Handles initialization, authentication, and payments on Pi Testnet
 *
 * IMPORTANT: The Pi SDK only works inside the Pi Browser app.
 * Outside the Pi Browser, the SDK will not be available.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  PiUser,
  PiAuthResult,
  PiPaymentData,
  PiPaymentCallbacks,
  PiScope,
} from "@/lib/pi-sdk";

// PiLuck app configuration
const PI_APP_ID = process.env.NEXT_PUBLIC_PI_APP_ID?.trim() || "";
const PI_SANDBOX = process.env.NEXT_PUBLIC_PI_SANDBOX !== "false";
const PI_SCOPE: PiScope[] = ["username", "payments", "wallet_address"];
const PI_TREASURY_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_PI_TREASURY_WALLET_ADDRESS?.trim() ||
  "GBTZK5GUPSURYQNUA54DHY2J77SCZGSXRZAPRR7I2FCIDWL52BPR7JLK";
const PI_TREASURY_PERCENT = 0.1; // 10% of each entry goes to the treasury

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.error === "string" ? payload.error : "Request failed.";
    throw new Error(message);
  }

  return payload as T;
}

function getWalletAddress(user: PiUser | null) {
  return user?.wallet_address?.trim() || user?.uid || null;
}

export type PiConnectionState =
  | "disconnected"
  | "initializing"
  | "connected"
  | "error";

export interface PiPaymentResult {
  success: boolean;
  paymentId?: string;
  txid?: string;
  error?: string;
}

export interface PiWalletBalance {
  nativeBalance: string | null;
  accountId: string | null;
}

export interface PiWalletRoundStatus {
  wallet: {
    walletKey: string;
    uid: string;
    username: string;
    walletAddress: string | null;
    streakDays: number;
    highestMilestoneDays: number;
    freeCredits: number;
    lastJoinedOn: string | null;
    creditCooldownUntil: string | null;
  } | null;
  round: {
    roundNumber: number;
    status: string;
    startsAt: string;
    endsAt: string;
    totalBaseEntries: number;
    totalCreditEntries: number;
    totalPoolPi: string;
    treasuryPi: string;
  } | null;
  hasBaseTicket: boolean;
  hasCreditTicket: boolean;
}

const SESSION_STORAGE_KEY = "piluck_session_v1";

export function usePiSDK() {
  const [piReady, setPiReady] = useState(false);
  const [piBrowser, setPiBrowser] = useState(false);
  const [connectionState, setConnectionState] =
    useState<PiConnectionState>("disconnected");
  const [user, setUser] = useState<PiUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [piBalance, setPiBalance] = useState<PiWalletBalance>({
    nativeBalance: null,
    accountId: null,
  });
  const [piBalanceLoaded, setPiBalanceLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletStatus, setWalletStatus] = useState<PiWalletRoundStatus | null>(null);
  const [walletStatusLoaded, setWalletStatusLoaded] = useState(false);

  // Initialize the Pi SDK when the component mounts
  useEffect(() => {
    let mounted = true;
    let retries = 0;
    const maxRetries = 40; // Wait up to 20 seconds for SDK to load

    const initPi = () => {
      if (typeof window === "undefined") return;

      if (!window.Pi) {
        // SDK script not yet loaded - retry
        retries++;
        if (retries < maxRetries) {
          setTimeout(initPi, 500);
        } else {
          // SDK never loaded - we are not in Pi Browser
          if (mounted) {
            setPiBrowser(false);
            setPiReady(false);
            setError(
              "Pi SDK was not detected. Open this app inside the Pi Browser app on a mobile device, or make sure the Pi Browser is available in your environment."
            );
            setConnectionState("error");
          }
        }
        return;
      }

      // Pi SDK is available - we are in the Pi Browser
      if (mounted) setPiBrowser(true);

      if (!PI_APP_ID || PI_APP_ID.includes("your_real_pi_app_id")) {
        if (mounted) {
          setError(
            "Missing or placeholder NEXT_PUBLIC_PI_APP_ID. Register this app in the Pi Developer Portal and set the real Pi app ID before using Pi Browser payments."
          );
          setConnectionState("error");
        }
        return;
      }

      try {
        // Initialize in sandbox (testnet) mode
        window.Pi.init({
          version: "2.0",
          sandbox: PI_SANDBOX,
        });

        if (mounted) {
          setPiReady(true);
        }
      } catch (err) {
        // SDK might already be initialized - that is OK
        if (err instanceof Error && err.message.includes("already")) {
          if (mounted) setPiReady(true);
        } else {
          console.error("Pi SDK init error:", err);
          if (mounted) {
            setError("Failed to initialize Pi SDK. Please refresh the page.");
            setConnectionState("error");
          }
        }
      }
    };

    // Start checking immediately
    initPi();

    return () => {
      mounted = false;
    };
  }, []);

  // Restore a previously saved session when the page refreshes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { user?: PiUser | null; accessToken?: string | null };
      if (saved.user && saved.accessToken) {
        setUser(saved.user);
        setAccessToken(saved.accessToken);
        setConnectionState("connected");
        setWalletStatusLoaded(false);
      }
    } catch (err) {
      console.warn("Failed to restore PiLuck session:", err);
    }
  }, []);

  // Manual retry function
  const retryInit = useCallback(() => {
    setError(null);
    setConnectionState("disconnected");
    setPiReady(false);
    setPiBrowser(false);

    if (typeof window !== "undefined" && window.Pi) {
      try {
        window.Pi.init({ version: "2.0", sandbox: PI_SANDBOX });
        setPiBrowser(true);
        setPiReady(true);
      } catch (err) {
        if (err instanceof Error && err.message.includes("already")) {
          setPiBrowser(true);
          setPiReady(true);
        } else {
          setError("Failed to initialize Pi SDK. Please refresh the page.");
          setConnectionState("error");
        }
      }
    } else {
      setError("Pi SDK not available. Please open this app inside the Pi Browser.");
      setConnectionState("error");
    }
  }, []);

  // Authenticate with Pi Network
  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!piReady || !window.Pi) {
      setError(
        "Pi SDK not available. Please open this app inside the Pi Browser."
      );
      setConnectionState("error");
      return false;
    }

    setConnectionState("initializing");
    setError(null);

    try {
      const onIncompletePaymentFound = (payment: unknown) => {
        console.log("Incomplete payment found:", payment);
      };

      const result: PiAuthResult = await window.Pi.authenticate(
        PI_SCOPE,
        onIncompletePaymentFound
      );

      setUser(result.user);
      setAccessToken(result.accessToken);
      setConnectionState("connected");
      setPiBalanceLoaded(false);
      setWalletStatusLoaded(false);

      // Persist the session so the wallet stays connected after a refresh.
      try {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({ user: result.user, accessToken: result.accessToken })
        );
      } catch (err) {
        console.warn("Failed to persist PiLuck session:", err);
      }

      // If we don't have a wallet address at all, resolve the balance
      // immediately as "unavailable" instead of leaving the UI stuck on
      // "loading..." forever.
      const walletAddr = getWalletAddress(result.user);
      if (!walletAddr) {
        setPiBalance({
          nativeBalance: "unavailable",
          accountId: null,
        });
        setPiBalanceLoaded(true);
      } else {
        void postJson<{ balance?: { nativeBalance: string | null; accountId: string } }>(
          "/api/pi/session",
          {
            accessToken: result.accessToken,
            uid: result.user.uid,
            username: result.user.username,
            walletAddress: walletAddr,
          }
        )
          .then((response) => {
            if (response.balance && response.balance.nativeBalance != null) {
              setPiBalance({
                nativeBalance: response.balance.nativeBalance,
                accountId: response.balance.accountId,
              });
            } else {
              setPiBalance({
                nativeBalance: "unavailable",
                accountId: null,
              });
            }
            setPiBalanceLoaded(true);
          })
          .catch((err: unknown) => {
            console.warn("Pi session sync failed:", err);
            setPiBalance({
              nativeBalance: "unavailable",
              accountId: null,
            });
            setPiBalanceLoaded(true);
          });
      }

      return true;
    } catch (err) {
      console.error("Pi authentication error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Authentication failed. Please try again.";
      setError(msg);
      setConnectionState("error");
      return false;
    }
  }, [piReady]);

  // Create a payment (buy lottery ticket with 1 Pi)
  const createPayment = useCallback(
    async (amount: number, memo: string): Promise<PiPaymentResult> => {
      if (!piReady || !window.Pi || !accessToken) {
        return {
          success: false,
          error: "Wallet not connected. Please connect your Pi wallet first.",
        };
      }

      if (!PI_APP_ID || PI_APP_ID.includes("your_real_pi_app_id")) {
        return {
          success: false,
          error:
            "Missing or placeholder Pi app ID. Set the real NEXT_PUBLIC_PI_APP_ID from the Pi Developer Portal before taking payments.",
        };
      }

      setIsProcessing(true);
      setError(null);

      const pi = window.Pi;

      return new Promise<PiPaymentResult>((resolve) => {
        const paymentData: PiPaymentData = {
          amount,
          memo,
          metadata: {
            type: "lottery_ticket",
            app: PI_APP_ID,
            sandbox: PI_SANDBOX,
            timestamp: Date.now(),
            treasuryWallet: PI_TREASURY_WALLET_ADDRESS,
            treasuryPercent: PI_TREASURY_PERCENT,
            treasuryAmountPi: Number((amount * PI_TREASURY_PERCENT).toFixed(8)),
          },
        };

        const callbacks: PiPaymentCallbacks = {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("Ready for server approval:", paymentId);
            void postJson("/api/pi/payments/approve", {
              accessToken,
              paymentId,
              amountPi: amount,
              memo,
              uid: user?.uid || "",
              username: user?.username || "",
              walletAddress: getWalletAddress(user),
              metadata: paymentData.metadata,
            }).catch((err: unknown) => {
              // The user's Pi has already been charged by this point. An
              // approval sync error must NOT break the flow or show
              // "Request failed" — completion is what determines success.
              console.warn("Payment approval sync failed:", err);
            });
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            console.log("Payment completed:", paymentId, txid);
            void postJson("/api/pi/payments/complete", {
              accessToken,
              paymentId,
              txid,
              amountPi: amount,
              memo,
              uid: user?.uid || "",
              username: user?.username || "",
              walletAddress: getWalletAddress(user),
              metadata: paymentData.metadata,
            }).catch((err: unknown) => {
              console.warn("Payment completion sync failed:", err);
            });
            void postJson("/api/credits/claim", {
              accessToken,
              uid: user?.uid || "",
              username: user?.username || "",
              walletAddress: getWalletAddress(user),
            }).catch((err: unknown) => {
              console.warn("Streak claim sync failed:", err);
            });
            setIsProcessing(false);
            resolve({ success: true, paymentId, txid });
          },
          onCancel: (paymentId: string) => {
            console.log("Payment cancelled:", paymentId);
            setIsProcessing(false);
            resolve({ success: false, error: "Payment cancelled by user." });
          },
          onError: (err: Error) => {
            console.error("Payment error:", err);
            setIsProcessing(false);
            resolve({ success: false, error: err.message });
          },
        };

        try {
          pi.createPayment(paymentData, callbacks);
        } catch (err) {
          setIsProcessing(false);
          resolve({
            success: false,
            error: err instanceof Error ? err.message : "Payment failed.",
          });
        }
      });
    },
    [piReady, accessToken]
  );

  // Refresh the wallet's round status (streaks, credits, ticket eligibility).
  const refreshWalletStatus = useCallback(async () => {
    if (!user || !accessToken) return;
    setWalletStatusLoaded(false);
    try {
      const response = await postJson<PiWalletRoundStatus>("/api/rounds/current", {
        uid: user.uid,
        username: user.username,
        walletAddress: getWalletAddress(user),
        accessToken,
      });
      setWalletStatus(response);
    } catch (err) {
      console.warn("Failed to refresh wallet status:", err);
    } finally {
      setWalletStatusLoaded(true);
    }
  }, [user, accessToken]);

  // Disconnect the wallet and clear the persisted session.
  const disconnect = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setConnectionState("disconnected");
    setPiBalance({ nativeBalance: null, accountId: null });
    setPiBalanceLoaded(false);
    setWalletStatus(null);
    setWalletStatusLoaded(false);
    setError(null);
    try {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (err) {
      console.warn("Failed to clear PiLuck session:", err);
    }
  }, []);

  // Share to Pi social feed
  const shareResult = useCallback(
    (title: string, message: string, url?: string) => {
      if (!piReady || !window.Pi) return;
      window.Pi!.openShareDialog(title, message, url);
    },
    [piReady]
  );

  return {
    piReady,
    piBrowser,
    connectionState,
    user,
    accessToken,
    piBalance,
    piBalanceLoaded,
    error,
    isProcessing,
    walletStatus,
    walletStatusLoaded,
    authenticate,
    createPayment,
    shareResult,
    retryInit,
    disconnect,
    refreshWalletStatus,
  };
}
