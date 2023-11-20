import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "src/lib/prisma";
import { Feed } from "@prisma/client";

type ResponseData = {
  message: string;
  data?: Partial<Feed>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    switch (req.method) {
      case "GET": {
        const feeds = await prisma.feed.findMany({
          select: {
            name: true,
            id: true,
            url: true,
          },
          where: {
            user: {
              id: userId,
            },
          },
        });

        return res.status(200).json({ message: "Success", data: feeds });
      }

      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (e) {
    res.status(400).json({ message: "Failed to get feeds" });
  }
}
