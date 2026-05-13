import React, { useState } from 'react';
import { Plus, FolderPlus, Trash2, Edit } from 'lucide-react';
import Layout from '../components/Layout';

export default function Categorias() {
  // Dados mockados seguindo os requisitos (ID, Nome, Descrição)
  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Hardware', descricao: 'Problemas físicos em computadores e periféricos' },
    { id: 2, nome: 'Software', descricao: 'Erros de programas e sistemas operacionais' },
    { id: 3, nome: 'Rede', descricao: 'Problemas de conexão, Wi-Fi e cabos' },
    { id: 4, nome: 'Impressora', descricao: 'Atolamento de papel, toner ou instalação' },
  ]);

  const excluirCategoria = (id) => {
    if (window.confirm("Deseja excluir esta categoria? Isso pode afetar chamados vinculados.")) {
      setCategorias(categorias.filter(cat => cat.id !== id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Categorias</h1>
          <p className="text-gray-500">Gerencie os tipos de problemas do sistema</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={20} /> Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">ID</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Nome</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Descrição</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-sm text-gray-500 font-medium">#{cat.id}</td>
                <td className="p-4 text-sm font-bold text-gray-800">{cat.nome}</td>
                <td className="p-4 text-sm text-gray-600">{cat.descricao}</td>
                <td className="p-4 text-sm">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => excluirCategoria(cat.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
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
