import Stripe from "stripe";

// Server-side Stripe client initialized with fallback sandbox key or env
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2025-02-24.acacia" as any,
    typescript: true,
  }
);
