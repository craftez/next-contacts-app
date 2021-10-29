import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();
// const secret = process.env.APP_SECRET;

export default async function getAllContactComments(req: any, res: any) {
  try {
    const session = await getSession({ req });

    if (req.method === "GET") {
      const result = await prisma.comment.findMany({
        where: {
          ownerId: session?.id as string,
          resourceId: `people/${req.query.resourceId}`,
        },
      });
      return res.json(result);
    }

    if (req.method === "POST") {
      if (!req.body.body)
        return res.status(500).json({ error: "Comment body is empty." });

      const result = await prisma.comment.create({
        data: {
          ...req.body,
          ownerId: session?.id as string,
          resourceId: `people/${req.query.resourceId}`,
        },
      });
      return await res.json(result);
    }

    return res.status(403).json({ error: "Only GET, POST requests allowed" });
  } catch (error) {
    console.log("¯_(ツ)_/¯", error);
    return res.status(500).json({ error: "Couldn't load comments" });
  }
}
