import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function add(req, res) {
  const id = parseInt(req.query.id);
  const data = JSON.parse(req.body);

  const editedGaji = await prisma.gaji.update({
    where: {
      idGaji: id,
    },
    data: data,
  });

  res.json(editedGaji);
}
