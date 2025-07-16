
import React from "react";

export default function AnimalListTable({ animals, onDelete }) {
  if (animals.length === 0) {
    return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-500">Henüz kayıtlı hayvan bulunmuyor.</p>
        </div>
    );
  }

  return (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-green-700 to-green-600">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <span className="text-sm">📋</span>
                <span>Kulak Küpesi</span>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Yaş (ay)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Kilo (kg)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Cinsiyet
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Gebe
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              İşlem
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {animals.map((a, index) => (
              <tr
                  key={a.id}
                  className={
                    index % 2 === 0
                        ? "bg-white hover:bg-green-50 transition duration-150"
                        : "bg-gray-50 hover:bg-green-50 transition duration-150"
                  }
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {a.name}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{a.age}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{a.weight}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {a.gender === "MALE" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Erkek
                  </span>
                  ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                    Dişi
                  </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {a.pregnant ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Evet
                  </span>
                  ) : (
                      <span className="text-sm text-gray-500">Hayır</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button
                      onClick={() => onDelete(a)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      title="Sil"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                      <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}