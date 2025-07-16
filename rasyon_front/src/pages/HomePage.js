import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
      {/* Arka plan */}
      <img
        src="/home-bg.jpg"
        alt="Çiftlik Anasayfa"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-5xl font-bold text-green-800 mb-6 tracking-tight">
              Sığır Yetiştiriciliği{" "}
              <span className="text-green-600">Takip Sistemi</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Modern çiftlik yönetimi için geliştirilmiş kapsamlı çözüm.
              Hayvanlarınızı kolaylıkla takip edin, beslenme programlarını
              optimize edin ve verimli bir çiftlik yönetimi sağlayın.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="bg-green-50 p-6 rounded-xl shadow-md transform transition hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  Hayvan Yönetimi
                </h3>
                <p className="text-gray-600 mb-6">
                  Çiftliğinizdeki tüm hayvanları kaydedin, düzenleyin ve takip
                  edin. Kulak küpesi, yaş, kilo ve daha fazlası.
                </p>
                <Link
                  to="/animals"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
                >
                  Hayvanları Yönet
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl shadow-md transform transition hover:scale-105">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  Rasyon Hesaplama
                </h3>
                <p className="text-gray-600 mb-6">
                  Hayvanlarınız için ideal yem miktarını hesaplayın. Yaş, kilo
                  ve özel durumlarına göre optimize edilmiş beslenme planları.
                </p>
                <Link
                  to="/ration"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
                >
                  Rasyon Hesapla
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Sığır yetiştiriciliğinizi dijital ortamda yönetin ve
              verimliliğinizi artırın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
