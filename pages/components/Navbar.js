import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div>
      <div className="w-screen bg-white shadow">
        <div className="flex flex-row justify-around">
          <Link href="/">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Home</button>
          </Link>
          <Link href="/proyek">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Proyek</button>
          </Link>
          <Link href="/bahanbaku">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Bahan Baku</button>
          </Link>
          <Link href="/klien">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Klien</button>
          </Link>
          <Link href="/karyawan">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Karyawan</button>
          </Link>
          <Link href="/po">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">PO</button>
          </Link>
          <Link href="/transaksi">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Transaksi</button>
          </Link>
          <Link href="/gaji">
            <button className="font-medium relative py-2 px-4 leading-normal hover:bg-gray-200">Gaji</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
