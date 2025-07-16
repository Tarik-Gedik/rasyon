import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddAnimalForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("MALE");
  const [pregnant, setPregnant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weightError, setWeightError] = useState("");

  const ageMonths = parseInt(age, 10) || 0;

  // Cinsiyete ve yaşa göre kilo aralığını döndüren fonksiyon
  const getWeightRange = (age, gender) => {
    if (age <= 0) return { min: 0, max: 0 };

    if (gender === "FEMALE") {
      if (age >= 0 && age <= 3)  return { min: 0,   max: 99   };
      if (age >= 4 && age <= 8)  return { min: 100, max: 200  };
      if (age >= 9 && age <= 14) return { min: 201, max: 330  };
      if (age >= 15 && age <= 19) return { min: 331, max: 440 };
      if (age >= 20 && age <= 24) return { min: 441, max: 540 };
      if (age >= 25)               return { min: 500,  max: 1500 };
    } else {
      // MALE
      if (age >= 1 && age <= 3)   return { min: 0,   max: 125  };
      if (age >= 4 && age <= 8)   return { min: 126, max: 274  };
      if (age >= 9 && age <= 14)  return { min: 275, max: 375  };
      if (age >= 15)              return { min: 376, max: 2000 };
    }

    // Hiçbir koşula uymazsa
    return { min: 0, max: 0 };
  };

  // Yaş, kilo veya cinsiyet değiştiğinde hata mesajını güncelle
  useEffect(() => {
    if (ageMonths > 0 && weight) {
      const { min, max } = getWeightRange(ageMonths, gender);
      const currentWeight = Number(weight);

      if (currentWeight < min || currentWeight > max) {
        setWeightError(
            `${gender === "FEMALE" ? "Dişi" : "Erkek"} için ` +
            `${ageMonths} aylık hayvan aralığı: ${min}-${max} kg`
        );
      } else {
        setWeightError("");
      }
    } else {
      setWeightError("");
    }
  }, [ageMonths, weight, gender]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { min, max } = getWeightRange(ageMonths, gender);
    const currentWeight = Number(weight);

    if (currentWeight < min || currentWeight > max) {
      alert(
          `${gender === "FEMALE" ? "Dişi" : "Erkek"} için ` +
          `${ageMonths} aylık hayvan aralığı: ${min}-${max} kg`
      );
      return;
    }

    setLoading(true);
    axios
        .post("http://localhost:8080/api/animals", {
          id: name,
          name,
          age: ageMonths,
          weight: currentWeight,
          gender,
          pregnant,
        })
        .then(() => {
          setName("");
          setAge("");
          setWeight("");
          setGender("MALE");
          setPregnant(false);
          onAdd();
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Ekleme hatası. Konsolu kontrol et.");
          setLoading(false);
        });
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        {/* Form açıklaması */}
        <div className="col-span-full mb-2">
          <p className="text-sm text-gray-500">
            Tüm alanları doldurun. Dişi hayvanlar için, 14 ay üzeri olması
            durumunda gebelik durumu seçeneği aktif olacaktır.
          </p>
        </div>

        {/* Kulak Küpesi */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kulak Küpesi
          </label>
          <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-500"
              placeholder="Kulak Küpesi No"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          />
        </div>

        {/* Yaş */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yaş (ay)
          </label>
          <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-500"
              type="number"
              placeholder="Yaş (ay)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
          />
        </div>

        {/* Kilo */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kilo (kg)
          </label>
          <input
              className={`w-full border ${
                  weightError ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-500`}
              type="number"
              placeholder="Kilo (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
          />
          {weightError && (
              <p className="text-xs text-red-500 mt-1">{weightError}</p>
          )}
        </div>

        {/* Cinsiyet */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cinsiyet
          </label>
          <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
          >
            <option value="MALE">Erkek</option>
            <option value="FEMALE">Dişi</option>
          </select>
        </div>

        {/* Gebelik */}
        {gender === "FEMALE" && ageMonths > 14 && (
            <div className="col-span-12 md:col-span-6 flex items-center">
              <input
                  type="checkbox"
                  id="pregnant-checkbox"
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={pregnant}
                  onChange={(e) => setPregnant(e.target.checked)}
              />
              <label
                  htmlFor="pregnant-checkbox"
                  className="ml-2 block text-sm text-gray-700"
              >
                Gebe
              </label>
            </div>
        )}

        {/* Gönder */}
        <div className="col-span-full mt-2">
          <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={loading}
          >
            {loading ? (
                <span className="flex items-center">
              <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Kaydediliyor...
            </span>
            ) : (
                "Hayvanı Kaydet"
            )}
          </button>
        </div>
      </form>
  );
}
