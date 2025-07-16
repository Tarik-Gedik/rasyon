import React, { useState } from 'react';
import axios from 'axios';

export default function CalculateRationForm() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('MALE');
    const [pregnant, setPregnant] = useState(false);
    const [results, setResults] = useState({});

    // Yaşı integer olarak alıyoruz
    const ageMonths = parseInt(age, 10) || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const a = ageMonths;
        const w = parseFloat(weight);

        if (isNaN(a) || isNaN(w)) {
            alert('Lütfen geçerli yaş ve kilo girin.');
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/animals/calculate',
                { age: a, weight: w, gender, pregnant }
            );
            setResults(data);
        } catch (err) {
            console.error('API hatası:', err);
            alert('Sunucudan hata alındı. Konsolu kontrol edin.');
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Yaş (ay)"
                    required
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Ağırlık (kg)"
                    required
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
                <select value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="MALE">Erkek</option>
                    <option value="FEMALE">Dişi</option>
                </select>

                {gender === 'FEMALE' && ageMonths > 14 && (
                    <label style={{ marginLeft: '1em' }}>
                        <input
                            type="checkbox"
                            checked={pregnant}
                            onChange={e => setPregnant(e.target.checked)}
                        />
                        Gebe
                    </label>
                )}

                <button type="submit" style={{ marginLeft: '1em' }}>
                    Hesapla
                </button>
            </form>

            {Object.keys(results).length > 0 && (
                <div style={{ marginTop: '2em' }}>
                    <h3>Sonuçlar</h3>
                    <ul>
                        {Object.entries(results).map(([feedName, amount]) => (
                            <li key={feedName}>
                                {feedName}: {amount} kg
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
