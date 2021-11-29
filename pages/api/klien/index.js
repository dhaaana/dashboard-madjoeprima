import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdKlien = await prisma.klien.create({ data });

  res.json(createdKlien);
}
