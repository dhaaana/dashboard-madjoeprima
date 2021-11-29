import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AddPO({ bar, kli }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function saveNew(e) {
    e.preventDefault();
    const response = await fetch("/api/po", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/po");
    return await response.json();
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Add PO</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 my-4 space-y-4 filter drop-shadow-sm">
          <Link href="/po">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={saveNew}>
            <label htmlFor="idPO" className="block text-sm font-medium text-gray-700 my-2">
              ID PO
            </label>
            <input type="text" required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" placeholder="ID" name="idPO" onChange={(e) => setFormData({ ...formData, idPO: e.target.value })} />
            <label htmlFor="idBar" className="block text-sm font-medium text-gray-700 my-2">
              ID Barang
            </label>
            <select required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" name="idBar" onChange={(e) => setFormData({ ...formData, idBar: e.target.value })}>
              <option value={0}>Pilih salah satu</option>
              {bar.map((item) => {
                return (
                  <option key={item.idBar} value={item.idBar}>
                    {item.idBar} - {item.NamaProyek}
                  </option>
                );
              })}
            </select>
            <label htmlFor="QtyPO" className="block text-sm font-medium text-gray-700 my-2">
              Kuantitas
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Kuantitas"
              name="QtyPO"
              onChange={(e) => setFormData({ ...formData, QtyPO: parseInt(e.target.value) })}
            />
            <label htmlFor="Harga Satu" className="block text-sm font-medium text-gray-700 my-2">
              Harga Satu
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Harga Satu"
              name="HargaSatu"
              onChange={(e) => setFormData({ ...formData, HargaSatu: parseInt(e.target.value) })}
            />
            <label htmlFor="idKli" className="block text-sm font-medium text-gray-700 my-2">
              ID Klien
            </label>
            <select required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" name="idKli" onChange={(e) => setFormData({ ...formData, idKli: e.target.value })}>
              <option value={0}>Pilih salah satu</option>
              {kli.map((item) => {
                return (
                  <option key={item.idKli} value={item.idKli}>
                    {item.idKli} - {item.NamaKlien}
                  </option>
                );
              })}
            </select>
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
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah PO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const proyek = await prisma.proyek.findMany({
    select: {
      idBar: true,
      NamaProyek: true,
    },
  });

  const kli = await prisma.klien.findMany({
    select: {
      idKli: true,
      NamaKlien: true,
    },
  });

  return {
    props: {
      bar: proyek,
      kli: kli,
    },
  };
}
