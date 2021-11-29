import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProyek() {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  async function saveNew(e) {
    e.preventDefault();
    const response = await fetch("/api/klien", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/klien");
    return await response.json();
  }

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Add Klien</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 my-5 space-y-4 filter drop-shadow-sm">
          <Link href="/klien">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={saveNew}>
            <label htmlFor="idKli" className="block text-sm font-medium text-gray-700 my-2">
              ID Klien
            </label>
            <input type="text" required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" placeholder="ID" name="idKli" onChange={(e) => setFormData({ ...formData, idKli: e.target.value })} />
            <label htmlFor="NamaKlien" className="block text-sm font-medium text-gray-700 my-2">
              Nama Klien
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Nama"
              name="NamaKlien"
              onChange={(e) => setFormData({ ...formData, NamaKlien: e.target.value })}
            />
            <label htmlFor="Kontak" className="block text-sm font-medium text-gray-700 my-2">
              Kontak
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Kontak"
              name="Kontak"
              onChange={(e) => setFormData({ ...formData, Kontak: e.target.value })}
            />
            <label htmlFor="CP" className="block text-sm font-medium text-gray-700 my-2">
              Contact Person
            </label>
            <input type="text" required className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" placeholder="CP" name="CP" onChange={(e) => setFormData({ ...formData, CP: e.target.value })} />
            <label htmlFor="Alamat" className="block text-sm font-medium text-gray-700 my-2">
              Alamat
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Alamat"
              name="Alamat"
              onChange={(e) => setFormData({ ...formData, Alamat: e.target.value })}
            />
            <label htmlFor="Kuantitas" className="block text-sm font-medium text-gray-700 my-2">
              NPWP
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="NPWP"
              name="NPWP"
              onChange={(e) => setFormData({ ...formData, NPWP: parseInt(e.target.value) })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Klien
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
