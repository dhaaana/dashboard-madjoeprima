import Head from "next/head";
import Navbar from "./components/Navbar";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>MadjoePrima</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-blue-100 w-screen h-screen">
        <Navbar></Navbar>
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-bold pt-5">Madjoe Prima</h1>
        </div>
      </div>
    </div>
  );
}
