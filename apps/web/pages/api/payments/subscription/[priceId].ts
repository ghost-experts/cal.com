import { NextApiRequest, NextApiResponse } from "next";

import stripe from "../stripe-server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    const { priceId } = req.query;
    const [price] = await Promise.all([stripe.prices.retrieve(priceId)]);
    const product = await stripe.products.retrieve(price?.product);
    const lineItems = [
      {
        price: price.id,
        quantity: 1,
      },
    ];
    const paymentSession = await stripe.checkout.sessions.create({
      customer: "cus_MRLO2jEQ4oNFgG",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/upgrade?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/upgrade?status=cancelled`,
      metadata: {
        customerId: 1,
        type: product.metadata.type,
      },
    });
    res.status(200).json({ data: { sessionId: paymentSession } });
  } else {
    res.status(405).json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
