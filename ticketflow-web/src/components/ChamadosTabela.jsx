import { Trash2, CheckCircle, Clock, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ChamadosTabela({ chamados, aoExcluir, aoAlterarStatus, aoEditar }) {
  const { user } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3: return 'bg-green-100 text-green-800 border-green-200';
      case 4: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 1: return 'Aberto';
      case 2: return 'Em Atendimento';
      case 3: return 'Resolvido';
      case 4: return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const getPriorityColor = (prio) => {
    switch (prio) {
      case 3: return 'text-red-600';
      case 2: return 'text-orange-500';
      case 1: return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityLabel = (prio) => {
    switch (prio) {
      case 3: return 'Alta';
      case 2: return 'Média';
      case 1: return 'Baixa';
      default: return 'N/A';
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
              <td className="p-4 text-sm font-bold text-gray-800">{item.titulo}</td>
              <td className="p-4 text-sm text-gray-600">{item.categoriaNome || 'Sem Categoria'}</td>
              <td className="p-4 text-sm text-gray-600">{item.usuarioNome}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </td>
              <td className={`p-4 text-xs font-bold ${getPriorityColor(item.prioridade)}`}>
                {getPriorityLabel(item.prioridade)}
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  {/* Botão Editar (Admin/Tecnico ou o próprio dono se estiver aberto) */}
                  <button 
                    onClick={() => aoEditar(item)}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* Botão Atender (Admin/Tecnico e se estiver Aberto) */}
                  {[1, 2].includes(user.perfil) && item.status === 1 && (
                    <button 
                      onClick={() => aoAlterarStatus(item.id, 2)}
                      className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
                      title="Atender"
                    >
                      <Clock size={16} />
                    </button>
                  )}

                  {/* Botão Resolver (Admin/Tecnico e se não estiver Resolvido) */}
                  {[1, 2].includes(user.perfil) && item.status !== 3 && (
                    <button 
                      onClick={() => aoAlterarStatus(item.id, 3)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Concluir"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}

                  {/* Botão Excluir (Admin apenas) */}
                  {user.perfil === 1 && (
                    <button 
                      onClick={() => aoExcluir(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
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
