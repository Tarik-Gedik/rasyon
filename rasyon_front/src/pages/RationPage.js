import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RationPage() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("MALE");
  const [pregnant, setPregnant] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = parseInt(age, 10);
    const w = parseFloat(weight);
    if (isNaN(a) || isNaN(w)) {
      alert("Lütfen geçerli yaş ve kilo girin.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/animals/calculate",
        { age: a, weight: w, gender, pregnant }
      );
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Sunucudan hata alındı. Konsolu kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
      {/* Arka plan */}
      <img
        src="/ration-bg.jpg"
        alt="Rasyon Hesaplama"
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0">
              Rasyon Hesaplama
            </h2>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition shadow-sm"
            >
              Ana Sayfaya Dön
            </Link>
          </div>

          {/* Tanıtım kartı */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Beslenme Planı Oluşturun
            </h3>
            <p className="text-gray-600">
              Bu sayfada hayvanların özelliklerine göre ideal beslenme rasyonunu
              hesaplayabilirsiniz. Hayvanın yaşı, ağırlığı, cinsiyeti ve gebelik
              durumuna göre bilimsel verilerle optimum beslenme miktarları
              sunulur.
            </p>
          </div>

          {/* Form ve Sonuç bölümü */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hesaplama formu */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800">
                  Hayvan Bilgileri
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yaş (ay)
                    </label>
                    <input
                      type="number"
                      placeholder="Yaş (ay)"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ağırlık (kg)
                    </label>
                    <input
                      type="number"
                      placeholder="Ağırlık (kg)"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cinsiyet
                    </label>
                    <select
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="MALE">Erkek</option>
                      <option value="FEMALE">Dişi</option>
                    </select>
                  </div>
                  {gender === "FEMALE" && parseInt(age, 10) > 14 && (
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="pregnant"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={pregnant}
                        onChange={(e) => setPregnant(e.target.checked)}
                      />
                      <label
                        htmlFor="pregnant"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Gebe
                      </label>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Hesaplanıyor..." : "Rasyon Hesapla"}
                  </button>
                </form>
              </div>
            </div>

            {/* Sonuçlar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-50 p-4 border-b border-green-100">
                <h3 className="text-xl font-semibold text-green-800">
                  Hesaplama Sonuçları
                </h3>
              </div>
              <div className="p-6">
                {Object.keys(results).length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">
                      Hayvanın özelliklerine göre günlük beslenme planı:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {Object.entries(results).map(([name, amt]) => (
                        <div
                          key={name}
                          className="flex justify-between border-b border-gray-200 py-3 last:border-0"
                        >
                          <span className="font-medium text-gray-800">
                            {name}
                          </span>
                          <span className="font-bold text-green-700">
                            {amt} kg
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      * Bu değerler tahmini olup hayvanın sağlık durumuna göre
                      değişiklik gösterebilir
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 text-gray-300 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">
                      Rasyon hesaplaması için form bilgilerini doldurun ve
                      hesapla butonuna tıklayın.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
