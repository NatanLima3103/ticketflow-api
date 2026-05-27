import React, { useState } from 'react';
import { UserPlus, Trash2, X, Wrench, User } from 'lucide-react';
import Layout from '../components/Layout';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Guilherme Silvério', email: 'guilherme@email.com', role: 'Admin', dataCriacao: '10/05/2026' },
    { id: 2, nome: 'Wagner Silva', email: 'wagner@email.com', role: 'Técnico', dataCriacao: '11/05/2026' },
    { id: 3, nome: 'Danuza Souza', email: 'danuza@email.com', role: 'Usuário', dataCriacao: '12/05/2026' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoUser, setNovoUser] = useState({ nome: '', email: '', role: 'Usuário', senha: '' });

  const handleSalvar = (e) => {
    e.preventDefault();
    const usuarioCompleto = {
      ...novoUser,
      id: Math.floor(Math.random() * 1000),
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };
    setUsuarios([...usuarios, usuarioCompleto]);
    setNovoUser({ nome: '', email: '', role: 'Usuário', senha: '' });
    setModalAberto(false);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja remover este utilizador?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Técnico': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Utilizadores</h1>
          <p className="text-gray-500">Controle os níveis de acesso ao sistema</p>
        </div>
        <button 
          onClick={() => setModalAberto(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm"
        >
          <UserPlus size={20} /> Novo Utilizador
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Utilizador</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Email</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Perfil</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Criado em</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {usuarios.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.nome.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{user.nome}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                <td className="p-4 font-bold">
                  <span className={`px-3 py-1 rounded-full text-[11px] border uppercase ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{user.dataCriacao}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleExcluir(user.id)} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Novo Utilizador</h3>
              <button onClick={() => setModalAberto(false)}><X className="text-gray-400" /></button>
            </div>
            
            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={novoUser.nome} onChange={(e) => setNovoUser({...novoUser, nome: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={novoUser.email} onChange={(e) => setNovoUser({...novoUser, email: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha (Mín. 6 caracteres)</label>
                <input type="password" required minLength="6" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={novoUser.senha} onChange={(e) => setNovoUser({...novoUser, senha: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={novoUser.role} onChange={(e) => setNovoUser({...novoUser, role: e.target.value})}>
                  <option value="Usuário">Usuário</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Admin">Administrador</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
