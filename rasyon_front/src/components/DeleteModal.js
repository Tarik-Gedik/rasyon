import React, { useState } from "react";

export default function DeleteModal({ animal, onClose, onConfirm }) {
  const [reason, setReason] = useState("Satıldı");
  const options = ["Satıldı", "Ölüm", "Kaçtı"];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-modal">
        <div className="bg-red-600 p-4 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Hayvan Kaydını Sil
          </h2>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            <strong className="text-xl font-bold text-gray-800">
              {animal.id}
            </strong>{" "}
            numaralı hayvan kaydını silmek istediğinize emin misiniz?
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Silme Sebebi:
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            Bu işlem geri alınamaz. Hayvan kaydı kalıcı olarak silinecektir.
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200 font-medium"
            >
              İptal
            </button>
            <button
              onClick={() => onConfirm(reason)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
