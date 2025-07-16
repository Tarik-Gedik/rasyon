import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAnimalForm from "../components/AddAnimalForm";
import AnimalListTable from "../components/AnimalListTable";
import DeleteModal from "../components/DeleteModal";

export default function AnimalPage() {
  const [animals, setAnimals] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAnimals = () => {
    axios
      .get("http://localhost:8080/api/animals")
      .then((res) => setAnimals(res.data))
      .catch(console.error);
  };

  useEffect(fetchAnimals, []);

  const handleDelete = (animalId, reason) => {
    axios
      .delete(`http://localhost:8080/api/animals/${animalId}`, {
        params: { reason },
      })
      .then(() => {
        fetchAnimals();
        setSelected(null);
      })
      .catch(console.error);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
      {/* Arka plan */}
      <img
        src="/animals-bg.jpg"
        alt="Hayvan Yönetimi"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4 md:mb-0">
              Hayvan Yönetimi
            </h2>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition shadow-sm"
            >
              Ana Sayfaya Dön
            </Link>
          </div>

          {/* Tanıtım kartı */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Çiftlik Hayvanlarınızı Yönetin
            </h3>
            <p className="text-gray-600">
              Bu sayfada hayvanlarınızı ekleyebilir, takip edebilir ve
              düzenleyebilirsiniz. Hayvanın cinsiyeti, yaşı, kilosu ve diğer
              özelliklerini sisteme ekleyerek detaylı bilgilerini kayıt altına
              alın.
            </p>
          </div>

          {/* Form bölümü */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Yeni Hayvan Ekle
              </h3>
              <AddAnimalForm onAdd={fetchAnimals} />
            </div>
          </div>

          {/* Tablo bölümü */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Hayvan Listesi
              </h3>
              {animals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Henüz kayıtlı hayvan bulunmuyor. Yukarıdaki formu kullanarak
                  hayvan ekleyebilirsiniz.
                </div>
              ) : (
                <AnimalListTable animals={animals} onDelete={setSelected} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <DeleteModal
          animal={selected}
          onClose={() => setSelected(null)}
          onConfirm={(reason) => handleDelete(selected.id, reason)}
        />
      )}
    </div>
  );
}
