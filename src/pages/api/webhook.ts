import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import prisma from "src/lib/prisma";
import { Prisma } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occured -- no svix headers" });
  }

  console.log("headers", req.headers, svix_id, svix_signature, svix_timestamp);
  // Get the body
  const body = (await buffer(req)).toString();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ Error: err });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  try {
    if (id && eventType === "user.created") {
      await prisma.user.create({
        data: {
          id,
        },
      });
    }
    if (id && eventType === "user.deleted") {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002")
        console.error(
          "There is a unique constraint violation, a new user cannot be created with this id"
        );

      return res.status(400).json({ message: "Failed to perform action" });
    }
  }

  return res.status(200).json({ response: "Success" });
}
