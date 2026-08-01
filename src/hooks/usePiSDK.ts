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

// PiLucky app configuration
const PI_APP_ID = "pilucky-app"; // Replace with your actual Pi App ID from the Pi Developer Portal
const PI_SCOPE: PiScope[] = ["username", "payments"];

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

export function usePiSDK() {
  const [piReady, setPiReady] = useState(false);
  const [piBrowser, setPiBrowser] = useState(false);
  const [connectionState, setConnectionState] =
    useState<PiConnectionState>("disconnected");
  const [user, setUser] = useState<PiUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize the Pi SDK when the component mounts
  useEffect(() => {
    let mounted = true;
    let retries = 0;
    const maxRetries = 20; // Wait up to 10 seconds for SDK to load

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
          }
        }
        return;
      }

      // Pi SDK is available - we are in the Pi Browser
      if (mounted) setPiBrowser(true);

      try {
        // Initialize in sandbox (testnet) mode
        window.Pi.init({
          version: "2.0",
          sandbox: true, // Pi Testnet
        });

        if (mounted) {
          setPiReady(true);
        }
      } catch (err) {
        console.error("Pi SDK init error:", err);
        if (mounted) {
          setError("Failed to initialize Pi SDK. Please refresh the page.");
          setConnectionState("error");
        }
      }
    };

    initPi();

    return () => {
      mounted = false;
    };
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

      setIsProcessing(true);
      setError(null);

      return new Promise<PiPaymentResult>((resolve) => {
        const paymentData: PiPaymentData = {
          amount,
          memo,
          metadata: {
            type: "lottery_ticket",
            app: PI_APP_ID,
            timestamp: Date.now(),
          },
        };

        const callbacks: PiPaymentCallbacks = {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("Ready for server approval:", paymentId);
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            console.log("Payment completed:", paymentId, txid);
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
          window.Pi.createPayment(paymentData, callbacks);
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

  // Share to Pi social feed
  const shareResult = useCallback(
    (title: string, message: string, url?: string) => {
      if (!piReady || !window.Pi) return;
      window.Pi.openShareDialog(title, message, url);
    },
    [piReady]
  );

  return {
    piReady,
    piBrowser,
    connectionState,
    user,
    accessToken,
    error,
    isProcessing,
    authenticate,
    createPayment,
    shareResult,
  };
}
