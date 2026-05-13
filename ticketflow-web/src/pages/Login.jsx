import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simula que o login deu certo gravando os dados na mão
    localStorage.setItem('@TicketFlow:token', 'token-fake-123');
    localStorage.setItem('@TicketFlow:usuario', JSON.stringify({ nome: 'Guilherme' }));
    
    // Manda para o dashboard pelo caminho interno do React (que não dá erro 404)
    navigate('/dashboard');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">TicketFlow</h1>
          <p className="mt-2 text-gray-500">Faça login para acessar o sistema</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {erro && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 outline-none"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
