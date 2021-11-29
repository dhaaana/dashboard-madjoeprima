import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  const itemId = parseInt(req.query.id);
  if (req.method === "DELETE") {
    const item = await prisma.gaji.delete({
      where: { idGaji: itemId },
    });
    res.json(item);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
