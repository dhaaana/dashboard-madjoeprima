import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function Gaji({ data }) {
  const router = useRouter();

  async function deleteItem(id) {
    await fetch(`/api/gaji/delete/${id}`, {
      method: "DELETE",
    });
    router.push("/gaji");
  }

  return (
    <div>
      <div>
        <Head>
          <title>Gaji</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-blue-100">
          <Navbar></Navbar>
          <main>
            <div className="flex justify-center">
              <div className="bg-white text-black w-full max-w-md flex flex-col rounded-sm shadow p-4 mt-4">
                <div className="flex justify-between content-center align-center">
                  <h1 className="text-lg font-medium text-gray-800 m-2">Gaji</h1>
                  <Link href="/gaji/add">
                    <button
                      type="button"
                      className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Tambah Gaji
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-5">
              <table className="divide-y divide-gray-200 filter drop-shadow w-0.5">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absensi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gaji
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
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
                    <tr key={item.idGaji}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{item.idKry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{item.Absensi}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.Gaji}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{new Date(item.Tanggal).toDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 font-semibold hover:text-indigo-900">
                          <Link href={`/gaji/edit/${item.idGaji}`}>Edit</Link>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteItem(item.idGaji)} className="text-indigo-600 font-semibold hover:text-indigo-900">
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
  const gaji = await prisma.gaji.findMany();
  const modgaji = await JSON.parse(JSON.stringify(gaji));

  return {
    props: {
      data: modgaji,
    },
  };
}
export default Gaji;
