import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdBahan = await prisma.bahanbaku.create({ data });

  res.json(createdBahan);
}
