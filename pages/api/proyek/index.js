import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdProyek = await prisma.proyek.create({ data });

  res.json(createdProyek);
}
