type VerificationResult = {
  ok: boolean;
  payload?: unknown;
};

function buildAuthUrl() {
  const url = process.env.PI_AUTH_VERIFY_URL?.trim();

  if (!url) {
    throw new Error("Missing PI_AUTH_VERIFY_URL environment variable.");
  }

  return url;
}

function buildPaymentUrl(paymentId: string) {
  const template = process.env.PI_PAYMENT_VERIFY_URL_TEMPLATE?.trim();

  if (!template) {
    throw new Error("Missing PI_PAYMENT_VERIFY_URL_TEMPLATE environment variable.");
  }

  return template.replace("{paymentId}", encodeURIComponent(paymentId));
}

async function parseResponse(response: Response): Promise<VerificationResult> {
  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return {
    ok: response.ok,
    payload,
  };
}

export async function verifyPiAccessToken(accessToken: string) {
  const response = await fetch(buildAuthUrl(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const parsed = await parseResponse(response);

  if (!parsed.ok) {
    throw new Error("Pi access token verification failed.");
  }

  return parsed.payload;
}

export async function verifyPiPayment(paymentId: string) {
  const response = await fetch(buildPaymentUrl(paymentId), {
    method: process.env.PI_PAYMENT_VERIFY_METHOD?.trim() || "GET",
    headers: {
      Authorization: `Key ${process.env.PI_SERVER_API_KEY?.trim() || ""}`,
      Accept: "application/json",
    },
  });

  const parsed = await parseResponse(response);

  if (!parsed.ok) {
    throw new Error("Pi payment verification failed.");
  }

  return parsed.payload;
}
