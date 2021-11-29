import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const id = req.query.id;
  const data = JSON.parse(req.body);

  const editedTransaksi = await prisma.transaksi.update({
    where: {
      idTra: id,
    },
    data: data,
  });

  res.json(editedTransaksi);
}
