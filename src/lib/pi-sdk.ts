/**
 * Pi Network SDK Type Declarations
 * Based on the Pi Network Frontend SDK (pi-sdk.js)
 * @see https://sdk.pinetwork.com/pi-sdk.js
 */

export interface PiUser {
  uid: string;
  username: string;
}

export interface PiAuthResult {
  accessToken: string;
  user: PiUser;
}

export interface PiPaymentData {
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
}

export interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: unknown) => void;
}

export type PiScope = "username" | "payments" | "wallet_address";

export interface PiInitOptions {
  version: string;
  sandbox: boolean;
}

export interface PiSDK {
  init: (options: PiInitOptions) => void;
  authenticate: (
    scopes: PiScope[],
    onIncompletePaymentFound: (payment: unknown) => void
  ) => Promise<PiAuthResult>;
  createPayment: (
    paymentData: PiPaymentData,
    callbacks: PiPaymentCallbacks
  ) => void;
  openShareDialog: (
    title: string,
    message: string,
    url?: string
  ) => void;
}

declare global {
  interface Window {
    Pi?: PiSDK;
  }
}

export {};