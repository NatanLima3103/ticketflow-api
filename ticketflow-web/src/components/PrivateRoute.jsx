import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, allowedRoles }) {
  const { signed, loading, user } = useAuth();

  // Se ainda estiver carregando a verificação do token, não mostra nada ou um loading
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Se não estiver logado, manda pro login
  if (!signed) {
    return <Navigate to="/login" />;
  }

  // Se houver restrição de roles e o usuário não tiver a role necessária
  if (allowedRoles && !allowedRoles.includes(user.perfil)) {
    return <Navigate to="/dashboard" />;
  }

  // Se passar em tudo, mostra o componente
  return children;
}
