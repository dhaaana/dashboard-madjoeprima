import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdKaryawan = await prisma.karyawan.create({ data });

  res.json(createdKaryawan);
}
