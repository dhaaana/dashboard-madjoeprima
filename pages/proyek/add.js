import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProyek() {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function saveNew(e) {
    e.preventDefault();
    const response = await fetch("/api/proyek", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/proyek");
    return await response.json();
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Add Proyek</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 space-y-4 filter drop-shadow-sm">
          <Link href="/proyek">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={saveNew}>
            <label htmlFor="idBar" className="block text-sm font-medium text-gray-700 my-2">
              ID Proyek
            </label>
            <input type="text" required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" placeholder="ID" name="idBar" onChange={(e) => setFormData({ ...formData, idBar: e.target.value })} />
            <label htmlFor="NamaProyek" className="block text-sm font-medium text-gray-700 my-2">
              Nama Proyek
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Nama"
              name="NamaProyek"
              onChange={(e) => setFormData({ ...formData, NamaProyek: e.target.value })}
            />
            <label htmlFor="Kuantitas" className="block text-sm font-medium text-gray-700 my-2">
              Kuantitas
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Kuantitas"
              name="QtyBar"
              onChange={(e) => setFormData({ ...formData, QtyBar: parseInt(e.target.value) })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Proyek
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
