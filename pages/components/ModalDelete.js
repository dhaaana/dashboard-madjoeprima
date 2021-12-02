import React from "react";
import styles from "../../styles/Home.module.css";

function ModalDelete({ setShowModal, modalId, deleteItem }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center min-h-screen bg-gray-300 bg-opacity-30 text-center">
      <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="p-4">
            <h1>Apakah anda yakin ingin menghapus {modalId}?</h1>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="justify-center py-2 px-4 mx-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Tidak Yakin
            </button>
            <button
              className="justify-center py-2 px-4 mx-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setShowModal(false);
                deleteItem(modalId);
              }}
            >
              Yakin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
