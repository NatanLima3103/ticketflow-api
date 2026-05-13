import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';

export default function ChamadosTabela({ chamados, aoExcluir }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberto': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Em Atendimento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolvido': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 font-semibold text-gray-600 text-sm">ID</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Assunto</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Cliente</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Data</th>
            <th className="p-4 font-semibold text-gray-600 text-sm text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {chamados.length > 0 ? (
            chamados.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-500">#{item.id}</td>
                <td className="p-4 text-sm text-gray-800 font-medium">{item.assunto}</td>
                <td className="p-4 text-sm text-gray-600">{item.cliente}</td>
                <td className="p-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{item.data}</td>
                <td className="p-4 text-sm">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            onClick={() => aoExcluir(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-8 text-center text-gray-500 italic">Nenhum chamado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}