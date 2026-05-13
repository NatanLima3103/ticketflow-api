import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando o site abrir, ele redireciona automaticamente para /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Define que o endereço /login carrega o componente Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;