import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function EditTransaksi({ data, kry, bah, bar, kli }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const tipestate = data.TipeTransaksi;

  async function updateNew(e) {
    e.preventDefault();
    const response = await fetch(`/api/transaksi/update/${data.idTra}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.push("/transaksi");
    return await response.json();
  }

  function setKaryawan() {
    if (formData.idPenanggung) {
      const krydata = formData.idPenanggung;
      setFormData({ ...formData, idKry: krydata });
    } else {
      setFormData({ ...formData, idKry: "E002" });
    }
  }

  useEffect(() => {
    document.getElementById(tipestate).checked = true;
    setFormData({ ...formData, TipeTransaksi: tipestate });
  }, []);

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Edit Transaksi</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className="flex justify-center items-center w-screen">
        <div className="max-w-md w-2/3 bg-white rounded p-6 my-4 space-y-4 filter drop-shadow-sm">
          <Link href="/transaksi">
            <button className="material-icons">keyboard_backspace</button>
          </Link>
          <form onSubmit={updateNew}>
            <label htmlFor="idTra" className="block text-sm font-medium text-gray-700 my-2">
              ID Transaksi
            </label>
            <input
              type="text"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="ID"
              defaultValue={data.idTra}
              name="idTra"
              onChange={(e) => setFormData({ ...formData, idTra: e.target.value })}
            />
            <label htmlFor="TipeTransaksi" className="block text-sm font-medium text-gray-700 mt-2">
              Tipe Transaksi
            </label>
            <div className="flex flex-row mt-3 mb-3">
              <input type="radio" id="Penjualan" className="mt-1" name="tipetransaksi" value="Penjualan" onChange={(e) => setFormData({ ...formData, TipeTransaksi: e.target.value })}></input>
              <label htmlFor="Penjualan" className="text-sm text-gray-700 mx-1 mb-2 mr-3">
                Penjualan
              </label>
              <input type="radio" id="Pembelian" className="mt-1 ml-3" name="tipetransaksi" value="Pembelian" onChange={(e) => setFormData({ ...formData, TipeTransaksi: e.target.value })}></input>
              <label htmlFor="Pembelian" className="text-sm text-gray-700 mx-1 mb-2">
                Pembelian
              </label>
            </div>
            {formData.TipeTransaksi === "Penjualan" ? (
              <div>
                <label htmlFor="idProyek" className="block text-sm font-medium text-gray-700 my-2">
                  ID Proyek
                </label>
                <select className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" name="idProyek" defaultValue={data.idProyek} onChange={(e) => setFormData({ ...formData, idProyek: e.target.value })}>
                  <option value={null}>Pilih salah satu</option>
                  {bar.map((item) => {
                    return (
                      <option key={item.idBar} value={item.idBar}>
                        {item.idBar} - {item.NamaProyek}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="idBahan" className="block text-sm font-medium text-gray-700 my-2">
                  ID Bahan
                </label>
                <select className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" name="idBahan" defaultValue={data.idBahan} onChange={(e) => setFormData({ ...formData, idBahan: e.target.value })}>
                  <option value={null}>Pilih salah satu</option>
                  {bah.map((item) => {
                    return (
                      <option key={item.idBah} value={item.idBah}>
                        {item.idBah} - {item.NamaBahan}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {formData.TipeTransaksi === "Penjualan" ? (
              <div>
                <label htmlFor="idPembeli" className="block text-sm font-medium text-gray-700 my-2">
                  ID Klien
                </label>
                <select
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  name="idPembeli"
                  defaultValue={data.idPembeli}
                  onChange={(e) => setFormData({ ...formData, idPembeli: e.target.value })}
                >
                  <option value={null}>Pilih salah satu</option>
                  {kli.map((item) => {
                    return (
                      <option key={item.idKli} value={item.idKli}>
                        {item.idKli} - {item.NamaKlien}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="idPenanggung" className="block text-sm font-medium text-gray-700 my-2">
                  ID Penanggung
                </label>
                <select
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  name="idPenanggung"
                  defaultValue={data.idPenanggung}
                  onChange={(e) => setFormData({ ...formData, idPenanggung: e.target.value })}
                >
                  <option value={null}>Pilih salah satu</option>
                  {kry.map((item) => {
                    return (
                      <option key={item.idKry} value={item.idKry}>
                        {item.idKry} - {item.NamaKry}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <label htmlFor="QtyIt" className="block text-sm font-medium text-gray-700 my-2">
              Kuantitas
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Kuantitas"
              defaultValue={data.QtyIt}
              name="QtyIt"
              onChange={(e) => setFormData({ ...formData, QtyIt: parseInt(e.target.value) })}
            />
            <label htmlFor="Harga Satu" className="block text-sm font-medium text-gray-700 my-2">
              Harga Satu
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Harga Satu"
              defaultValue={data.HargaSatu}
              name="HargaSatu"
              onChange={(e) => setFormData({ ...formData, HargaSatu: parseInt(e.target.value) })}
            />
            <label htmlFor="Harga Satu" className="block text-sm font-medium text-gray-700 my-2">
              Persen Pajak
            </label>
            <input
              type="number"
              required
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Persen Pajak"
              defaultValue={data.PersenPajak}
              name="PersenPajak"
              onChange={(e) => setFormData({ ...formData, PersenPajak: parseInt(e.target.value) })}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={setKaryawan}
                className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Transaksi
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
  const tra = await prisma.transaksi.findUnique({
    where: {
      idTra: id,
    },
  });

  const kry = await prisma.karyawan.findMany({
    select: {
      idKry: true,
      NamaKry: true,
    },
  });
  const bah = await prisma.bahanbaku.findMany({
    select: {
      idBah: true,
      NamaBahan: true,
    },
  });
  const bar = await prisma.proyek.findMany({
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
      data: tra,
      kry: kry,
      bah: bah,
      bar: bar,
      kli: kli,
    },
  };
}
