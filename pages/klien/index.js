import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Modal from "../components/ModalDelete";
import { useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function Klien({ data }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState();

  function deleteModal(id) {
    setModalId(id);
    setShowModal((prev) => !prev);
  }

  async function deleteItem(id) {
    await fetch(`/api/klien/delete/${id}`, {
      method: "DELETE",
    });
    router.push("/klien");
  }
  return (
    <div>
      <div>
        <Head>
          <title>Klien</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-blue-100 min-h-screen">
          <Navbar></Navbar>
          <div>{showModal && <Modal setShowModal={setShowModal} modalId={modalId} deleteItem={deleteItem}></Modal>}</div>
          <main>
            <div className="flex justify-center">
              <div className="bg-white text-black w-full max-w-md flex flex-col rounded-sm shadow p-4 mt-4">
                <div className="flex justify-between content-center align-center">
                  <h1 className="text-lg font-medium text-gray-800 m-2">Klien</h1>
                  <Link href="/klien/add">
                    <button
                      type="button"
                      className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Tambah Klien
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-5">
              <table className="divide-y divide-gray-200 shadow w-0.5">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CP
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NPwP
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.idKli}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{item.idKli}</div>
                      </td>
                      <td className="px-6 py-4 flex flex-wrap">
                        <div className="text-sm text-black">{item.NamaKlien}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.Kontak}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.CP}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.NPWP}</span>
                      </td>
                      <td className="px-6 py-4 flex flex-wrap">
                        <div className="text-sm text-gray-900">{item.Alamat}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 font-semibold hover:text-indigo-900">
                          <Link href={`/klien/edit/${item.idKli}`}>Edit</Link>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteModal(item.idKli)} className="text-indigo-600 font-semibold hover:text-indigo-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const klien = await prisma.klien.findMany();
  const modklien = JSON.parse(JSON.stringify(klien));

  return {
    props: {
      data: modklien,
    },
  };
}
export default Klien;
