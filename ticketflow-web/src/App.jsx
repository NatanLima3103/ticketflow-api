import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Importando a nova página
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Categorias from './pages/Categorias';
import Chamados from './pages/Chamados';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rota de Registro - Acesso público para novos usuários */}
        <Route path="/register" element={<Register />} />
        
        {/* Todas as rotas abaixo estão protegidas pela nossa catraca */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
        <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
        <Route path="/chamados" element={<PrivateRoute><Chamados /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}