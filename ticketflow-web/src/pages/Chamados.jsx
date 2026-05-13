import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';

export default function Chamados() {
  // Lista de chamados (idealmente viria de um serviço ou estado global)
  const [todosChamados] = useState([
    { id: '101', assunto: 'Erro no login do sistema', cliente: 'Empresa ABC', data: '13/05/2026', status: 'Aberto', prioridade: 'Alta' },
    { id: '102', assunto: 'Instalação de impressora', cliente: 'João Silva', data: '12/05/2026', status: 'Em Atendimento', prioridade: 'Média' },
    { id: '103', assunto: 'Dúvida sobre faturamento', cliente: 'Maria Souza', data: '10/05/2026', status: 'Resolvido', prioridade: 'Baixa' },
  ]);

  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Lógica de Filtro (Requisito obrigatório)
  const chamadosFiltrados = filtroStatus === 'Todos' 
    ? todosChamados 
    : todosChamados.filter(c => c.status === filtroStatus);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Todos os Chamados</h1>
        <p className="text-gray-500">Consulte e gerencie as solicitações técnicas</p>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Filter size={18} /> Filtrar por Status:
          </div>
          <select 
            className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Aberto">Aberto</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por assunto..." 
            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
      </div>

      <ChamadosTabela chamados={chamadosFiltrados} aoExcluir={() => {}} />
    </Layout>
  );
}