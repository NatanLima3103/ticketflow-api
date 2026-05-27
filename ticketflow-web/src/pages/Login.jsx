import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulação de autenticação (Aqui você integraria com o backend futuramente)
    if (email && senha.length >= 6) {
      const usuarioFake = {
        nome: email.split('@')[0],
        email: email,
        role: 'Admin'
      };
      
      localStorage.setItem('@TicketFlow:token', 'token-gerado-123');
      localStorage.setItem('@TicketFlow:usuario', JSON.stringify(usuarioFake));
      
      navigate('/dashboard');
    } else {
      alert("Credenciais inválidas ou senha muito curta!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">TicketFlow</h1>
          <p className="text-gray-500 mt-2">Gestão de Chamados Inteligente</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              required 
              placeholder="Seu e-mail"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="password" 
              required 
              placeholder="Sua senha"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-600 text-sm">
            Ainda não tem uma conta? 
            <Link to="/register" className="ml-1 text-blue-600 font-bold hover:underline transition-all">
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
