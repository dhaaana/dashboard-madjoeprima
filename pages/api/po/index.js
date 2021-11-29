import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdPO = await prisma.po.create({
    data,
  });

  res.json(createdPO);
}
