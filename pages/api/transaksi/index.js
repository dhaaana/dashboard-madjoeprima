import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const data = JSON.parse(req.body);

  const createdTransaksi = await prisma.transaksi.create({
    data,
  });

  res.json(createdTransaksi);
}
