import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente funciona como um "pedágio"
export default function PrivateRoute({ children }) {
  // Verifica se o token existe no localStorage que salvamos no Login
  const token = localStorage.getItem('@TicketFlow:token');

  // Se existir o token, deixa passar (children). Se não, manda de volta pro Login.
  return token ? children : <Navigate to="/login" />;
}
