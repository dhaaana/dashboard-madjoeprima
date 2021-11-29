import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AddGaji({ karyawandata }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function saveNew(e) {
    e.preventDefault();
    const response = await fetch("/api/gaji", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/gaji");
    return await response.json();
  }

  function handleGaji() {
    const selectedkry = karyawandata.filter((item) => item.idKry === formData.idKry);
    const gajitotal = formData.Absensi * parseInt(selectedkry[0].GajiPerhari);
    setFormData({ ...formData, Gaji: gajitotal });
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Add Gaji</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 my-4 space-y-4 filter drop-shadow-sm">
          <Link href="/gaji">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={saveNew}>
            <label htmlFor="idKry" className="block text-sm font-medium text-gray-700 my-2">
              ID Karyawan
            </label>
            <select required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" name="idKry" onChange={(e) => setFormData({ ...formData, idKry: e.target.value })}>
              <option value={0}>Pilih salah satu</option>
              {karyawandata.map((item) => {
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
              name="Tanggal"
              onChange={(e) => setFormData({ ...formData, Tanggal: new Date(e.target.value) })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleGaji}
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Gaji
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const kry = await prisma.karyawan.findMany({
    select: {
      idKry: true,
      NamaKry: true,
      GajiPerhari: true,
    },
  });

  return {
    props: {
      karyawandata: kry,
    },
  };
}
