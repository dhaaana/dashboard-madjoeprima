import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function Karyawan({ data }) {
  const router = useRouter();

  async function deleteItem(id) {
    await fetch(`/api/karyawan/delete/${id}`, {
      method: "DELETE",
    });
    router.push("/karyawan");
  }
  return (
    <div>
      <div>
        <Head>
          <title>Karyawan</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-blue-100">
          <Navbar></Navbar>
          <main>
            <div className="flex justify-center">
              <div class="bg-white text-black w-full max-w-md flex flex-col rounded-sm shadow p-4 mt-4">
                <div class="flex justify-between content-center align-center">
                  <h1 className="text-lg font-medium text-gray-800 m-2">Karyawan</h1>
                  <Link href="/karyawan/add">
                    <button
                      type="button"
                      className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Tambah Karyawan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-5">
              <table className="divide-y divide-gray-200 filter drop-shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gaji Perhari
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontak
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
                    <tr key={item.idKry}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{item.idKry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{item.NamaKry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.Alamat}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.GajiPerhari}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.Kontak}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 font-semibold hover:text-indigo-900">
                          <Link href={`/karyawan/edit/${item.idKry}`}>Edit</Link>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteItem(item.idKry)} className="text-indigo-600 font-semibold hover:text-indigo-900">
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
  const karyawan = await prisma.karyawan.findMany();

  return {
    props: {
      data: karyawan,
    },
  };
}
export default Karyawan;
