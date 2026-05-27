import React from 'react';
import { Trash2, CheckCircle, Clock, Edit2 } from 'lucide-react';

export default function ChamadosTabela({ chamados, aoExcluir, aoAlterarStatus, aoEditar }) {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberto': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Em Atendimento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolvido': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (prio) => {
    switch (prio) {
      case 'Alta': return 'text-red-600';
      case 'Media': return 'text-orange-500';
      case 'Baixa': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase">ID</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase">Assunto</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase">Categoria</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase">Cliente</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase text-center">Status</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase">Prioridade</th>
            <th className="p-4 font-bold text-gray-600 text-xs uppercase text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {chamados.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-400">#{item.id}</td>
              <td className="p-4 text-sm font-bold text-gray-800">{item.assunto}</td>
              <td className="p-4 text-sm text-gray-600">{item.categoria || 'Geral'}</td>
              <td className="p-4 text-sm text-gray-600">{item.cliente}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className={`p-4 text-xs font-bold ${getPriorityColor(item.prioridade)}`}>
                {item.prioridade}
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  {/* Botão Editar */}
                  <button 
                    onClick={() => aoEditar(item)}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* Botão Atender (Só aparece se estiver Aberto) */}
                  {item.status === 'Aberto' && (
                    <button 
                      onClick={() => aoAlterarStatus(item.id, 'Em Atendimento')}
                      className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
                      title="Atender"
                    >
                      <Clock size={16} />
                    </button>
                  )}

                  {/* Botão Resolver (Só aparece se não estiver Resolvido) */}
                  {item.status !== 'Resolvido' && (
                    <button 
                      onClick={() => aoAlterarStatus(item.id, 'Resolvido')}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Concluir"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}

                  {/* Botão Excluir */}
                  <button 
                    onClick={() => aoExcluir(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {chamados.length === 0 && (
        <div className="p-10 text-center text-gray-400 italic bg-white">
          Nenhum chamado encontrado com esses filtros.
        </div>
      )}
    </div>
  );
}