import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function EditGaji({ data, kry }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function updateNew(e) {
    e.preventDefault();
    const response = await fetch(`/api/gaji/update/${data.idGaji}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/gaji");
    return await response.json();
  }

  function handleGaji() {
    let selectedkry = "";
    let gajitotal = "";
    if (!formData.idKry && formData.Absensi) {
      selectedkry = kry.filter((item) => item.idKry === data.idKry);
      gajitotal = formData.Absensi * parseInt(selectedkry[0].GajiPerhari);
      setFormData({ ...formData, Gaji: gajitotal });
    }
    if (formData.idKry && !formData.Absensi) {
      selectedkry = kry.filter((item) => item.idKry === formData.idKry);
      gajitotal = data.Absensi * parseInt(selectedkry[0].GajiPerhari);
      setFormData({ ...formData, Gaji: gajitotal });
    }
    if (formData.idKry && formData.Absensi) {
      selectedkry = kry.filter((item) => item.idKry === formData.idKry);
      gajitotal = formData.Absensi * parseInt(selectedkry[0].GajiPerhari);
      setFormData({ ...formData, Gaji: gajitotal });
    } else {
      return "";
    }
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Edit Gaji</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 my-4 space-y-4 filter drop-shadow-sm">
          <Link href="/gaji">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={updateNew}>
            <label htmlFor="idKry" className="block text-sm font-medium text-gray-700 my-2">
              ID Karyawan
            </label>
            <select required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" defaultValue={data.idKry} name="idKry" onChange={(e) => setFormData({ ...formData, idKry: e.target.value })}>
              <option value={0}>Pilih salah satu</option>
              {kry.map((item) => {
                return (
                  <option key={item.idKry} value={item.idKry}>
                    {item.idKry} - {item.NamaKry}
                  </option>
                );
              })}
            </select>
            <label htmlFor="Absensi" className="block text-sm font-medium text-gray-700 my-2">
              Absensi
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Absensi"
              defaultValue={data.Absensi}
              name="Absensi"
              onChange={(e) => setFormData({ ...formData, Absensi: parseInt(e.target.value) })}
            />
            <label htmlFor="Tanggal" className="block text-sm font-medium text-gray-700 my-2">
              Tanggal
            </label>
            <input
              type="date"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Tanggal"
              defaultValue={data.Tanggal}
              name="Tanggal"
              onChange={(e) => setFormData({ ...formData, Tanggal: new Date(e.target.value) })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleGaji}
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Gaji
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const idint = parseInt(id);
  const gaji = await prisma.gaji.findUnique({
    where: {
      idGaji: idint,
    },
  });

  const kry = await prisma.karyawan.findMany({
    select: {
      idKry: true,
      NamaKry: true,
      GajiPerhari: true,
    },
  });
  const data = await JSON.parse(JSON.stringify(gaji));
  const modkry = await JSON.parse(JSON.stringify(kry));

  return {
    props: {
      data: data,
      kry: modkry,
    },
  };
}
