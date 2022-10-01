import { loadStripe } from "@stripe/stripe-js";

export const redirectToCheckout = async (sessionId: string) => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_P_KEY || "";
  const clientStripe = await loadStripe(publishableKey);
  await clientStripe?.redirectToCheckout({ sessionId });
};
