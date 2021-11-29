import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const id = req.query.id;
  const data = JSON.parse(req.body);

  const editedBahan = await prisma.bahanbaku.update({
    where: {
      idBah: id,
    },
    data: data,
  });

  res.json(editedBahan);
}
