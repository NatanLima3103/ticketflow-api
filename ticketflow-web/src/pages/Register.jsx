import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      return setErro("As senhas não coincidem!");
    }

    setLoading(true);

    try {
      await api.post('api/Usuarios', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        perfil: 3 
      });

      alert("Conta criada com sucesso! Agora faça seu login.");
      navigate('/login');
    } catch (error) {
      const message = error.response?.data || 'Erro ao criar conta. Verifique os dados.';
      setErro(typeof message === 'string' ? message : 'Erro na validação dos campos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">TicketFlow</h1>
          <p className="text-gray-500">Crie sua conta para abrir chamados</p>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" required placeholder="Nome Completo"
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({...form, nome: e.target.value})}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" required placeholder="Seu melhor e-mail"
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="password" required minLength="6" placeholder="Senha (Mín. 6 caracteres)"
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({...form, senha: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="password" required placeholder="Confirme sua senha"
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({...form, confirmarSenha: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar Minha Conta'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Já tem uma conta? <Link to="/login" className="text-blue-600 font-bold hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
