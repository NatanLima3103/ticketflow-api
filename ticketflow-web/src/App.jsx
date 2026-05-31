import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Categorias from './pages/Categorias';
import Chamados from './pages/Chamados';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas Protegidas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/usuarios" element={
            <PrivateRoute allowedRoles={[1]}> {/* 1 = Admin */}
              <Usuarios />
            </PrivateRoute>
          } />
          
          <Route path="/categorias" element={
            <PrivateRoute allowedRoles={[1, 2]}> {/* 1 = Admin, 2 = Tecnico */}
              <Categorias />
            </PrivateRoute>
          } />
          
          <Route path="/chamados" element={
            <PrivateRoute>
              <Chamados />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
