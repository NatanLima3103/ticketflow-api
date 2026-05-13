import React, { useState } from 'react';
import { Ticket, Filter, Search, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';

export default function Chamados() {
  // Lista centralizada (Simulando o Banco de Dados com Categorias)
  const [chamados, setChamados] = useState([
    { id: '101', assunto: 'Erro no login', cliente: 'Guilherme', categoria: 'Software', status: 'Aberto', prioridade: 'Alta', data: '13/05/2026' },
    { id: '102', assunto: 'Impressora travada', cliente: 'Wagner', categoria: 'Hardware', status: 'Em Atendimento', prioridade: 'Média', data: '12/05/2026' },
    { id: '103', assunto: 'Sem internet no setor A', cliente: 'Danuza', categoria: 'Rede', status: 'Resolvido', prioridade: 'Alta', data: '10/05/2026' },
  ]);

  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  // Lógica de Filtro e Busca (Requisito de Negócio)
  const chamadosFiltrados = chamados.filter(c => {
    const matchesStatus = filtroStatus === 'Todos' || c.status === filtroStatus;
    const matchesBusca = c.assunto.toLowerCase().includes(busca.toLowerCase()) || 
                         c.cliente.toLowerCase().includes(busca.toLowerCase());
    return matchesStatus && matchesBusca;
  });

  const adicionarChamado = (novo) => {
    const completo = {
      ...novo,
      id: Math.floor(Math.random() * 1000).toString(),
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Aberto',
      cliente: 'Guilherme' // Usuário logado
    };
    setChamados([completo, ...chamados]);
  };

  const excluirChamado = (id) => {
    if(window.confirm("Excluir este chamado permanentemente?")) {
      setChamados(chamados.filter(c => c.id !== id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Centro de Chamados</h1>
          <p className="text-gray-500">Visualize e filtre todas as solicitações de suporte</p>
        </div>
        <button 
          onClick={() => setModalAberto(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={20} /> Novo Chamado
        </button>
      </div>

      {/* Barra de Ferramentas: Filtros e Busca */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <select 
              className="border-none bg-gray-50 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Aberto">Abertos</option>
              <option value="Em Atendimento">Em Atendimento</option>
              <option value="Resolvido">Resolvidos</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por título ou cliente..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm w-72 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Listagem */}
      <ChamadosTabela chamados={chamadosFiltrados} aoExcluir={excluirChamado} />

      <NovoChamadoModal 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        aoSalvar={adicionarChamado} 
      />
    </Layout>
  );
}