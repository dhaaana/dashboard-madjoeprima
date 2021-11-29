import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddBahanBaku() {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function saveNew(e) {
    e.preventDefault();
    const response = await fetch("/api/bahanbaku", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/bahanbaku");
    return await response.json();
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Add Bahan Baku</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 space-y-4 filter drop-shadow-sm">
          <Link href="/bahanbaku">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={saveNew}>
            <label htmlFor="idBah" className="block text-sm font-medium text-gray-700 my-2">
              ID Bahan Baku
            </label>
            <input type="text" required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" placeholder="ID" name="idBah" onChange={(e) => setFormData({ ...formData, idBah: e.target.value })} />
            <label htmlFor="NamaBahan" className="block text-sm font-medium text-gray-700 my-2">
              Nama Bahan
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Nama"
              name="NamaBahan"
              onChange={(e) => setFormData({ ...formData, NamaBahan: e.target.value })}
            />
            <label htmlFor="JenisBahan" className="block text-sm font-medium text-gray-700 my-2">
              Jenis Bahan
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Jenis"
              name="JenisBahan"
              onChange={(e) => setFormData({ ...formData, JenisBahan: e.target.value })}
            />
            <label htmlFor="QtyBah" className="block text-sm font-medium text-gray-700 my-2">
              Kuantitas
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Kuantitas"
              name="QtyBah"
              onChange={(e) => setFormData({ ...formData, QtyBah: parseInt(e.target.value) })}
            />
            <label htmlFor="Pemasok" className="block text-sm font-medium text-gray-700 my-2">
              Pemasok
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Pemasok"
              name="Pemasok"
              onChange={(e) => setFormData({ ...formData, Pemasok: e.target.value })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Bahan Baku
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
