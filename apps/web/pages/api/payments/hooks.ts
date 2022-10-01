// import prisma from "@/prisma/index";
// import { updateSubscription } from "@/prisma/services/customer";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

import stripe from "./stripe-server";

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers["stripe-signature"];
  let event = null;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, "process.env.PAYMENTS_SIGNING_SECRET");
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event) {
    const { metadata } = event.data.object;

    switch (event.type) {
      case "charge.succeeded":
        if (metadata?.customerId && metadata?.type) {
          // await updateSubscription(metadata.customerId, metadata.type);
          // TODO: update subscription
        }
        break;
      default:
        res.status(400).send(`Webhook Error: Unhandled event type ${event.type}`);
    }
  } else {
    return res.status(400).send(`Webhook Error: Event not created`);
  }

  // await prisma.$disconnect();
  // TODO: need to improve
  res.status(200).send({ received: true });
};

export default handler;
