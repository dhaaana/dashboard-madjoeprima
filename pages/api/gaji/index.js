import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdGaji = await prisma.gaji.create({
    data,
  });

  res.json(createdGaji);
}
