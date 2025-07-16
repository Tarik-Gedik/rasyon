// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage   from './pages/HomePage';
import RationPage from './pages/RationPage';
import AnimalPage from './pages/AnimalPage';

export default function App() {
    return (
        <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/ration"  element={<RationPage />} />
            <Route path="/animals" element={<AnimalPage />} />
        </Routes>
    );
}
