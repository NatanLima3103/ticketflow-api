import React, { useState } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import Layout from '../components/Layout';

export default function Categorias() {
  // Estado para a lista de categorias (Requisito: Id, Nome, Descrição)
  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Hardware', descricao: 'Problemas físicos em computadores e periféricos' },
    { id: 2, nome: 'Software', descricao: 'Erros de programas e sistemas operacionais' },
    { id: 3, nome: 'Rede', descricao: 'Problemas de conexão, Wi-Fi e cabos' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novaCat, setNovaCat] = useState({ nome: '', descricao: '' });

  // Função para Criar (C do CRUD)
  const handleSalvar = (e) => {
    e.preventDefault();
    const categoriaCompleta = {
      ...novaCat,
      id: Math.floor(Math.random() * 1000)
    };
    setCategorias([...categorias, categoriaCompleta]);
    setNovaCat({ nome: '', descricao: '' });
    setModalAberto(false);
  };

  // Função para Excluir (D do CRUD)
  const handleExcluir = (id) => {
    if (window.confirm("Deseja excluir esta categoria?")) {
      setCategorias(categorias.filter(c => c.id !== id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-gray-500">Defina as categorias para os chamados</p>
        </div>
        <button 
          onClick={() => setModalAberto(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          <Plus size={20} /> Nova Categoria
        </button>
      </div>

      {/* Tabela de Listagem (R do CRUD) */}
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
                    <button onClick={() => handleExcluir(cat.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro de Categoria */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Nova Categoria</h3>
              <button onClick={() => setModalAberto(false)}><X className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Categoria</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                  placeholder="Ex: Redes"
                  value={novaCat.nome}
                  onChange={(e) => setNovaCat({...novaCat, nome: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                  placeholder="Descreva o propósito desta categoria"
                  value={novaCat.descricao}
                  onChange={(e) => setNovaCat({...novaCat, descricao: e.target.value})}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
