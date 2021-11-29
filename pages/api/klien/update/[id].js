import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const id = req.query.id;
  const data = JSON.parse(req.body);

  const editedKaryawan = await prisma.karyawan.update({
    where: {
      idKry: id,
    },
    data: data,
  });

  res.json(editedKaryawan);
}
