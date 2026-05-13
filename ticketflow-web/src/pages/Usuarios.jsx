import React, { useState } from 'react';
import { Plus, UserPlus, ShieldCheck, User, Wrench, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';

export default function Usuarios() {
  // Dados simulando o Banco de Dados (Requisito: Id, Nome, Email, Perfil)
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Guilherme Silvério', email: 'guilherme@email.com', role: 'Admin' },
    { id: 2, nome: 'Wagner Silva', email: 'wagner@email.com', role: 'Técnico' },
    { id: 3, nome: 'Danuza Souza', email: 'danuza@email.com', role: 'Usuário' },
  ]);

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
          <p className="text-gray-500">Controle quem tem acesso ao TicketFlow</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          <UserPlus size={20} /> Novo Utilizador
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Utilizador</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Email</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Perfil/Role</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {usuarios.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                    {user.nome.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{user.nome}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
