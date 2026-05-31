import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@TicketFlow:usuario');
    const storedToken = localStorage.getItem('@TicketFlow:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  async function login(email, senha) {
    try {
      const response = await api.post('api/Auth/login', { email, senha });
      
      const { token, usuario } = response.data;

      localStorage.setItem('@TicketFlow:token', token);
      localStorage.setItem('@TicketFlow:usuario', JSON.stringify(usuario));

      setUser(usuario);
      return { success: true };
    } catch (error) {
      const message = error.response?.data || 'Erro ao realizar login';
      return { success: false, message };
    }
  }

  function logout() {
    localStorage.removeItem('@TicketFlow:token');
    localStorage.removeItem('@TicketFlow:usuario');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
