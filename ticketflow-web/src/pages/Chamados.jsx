import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';

export default function Chamados() {
  const [chamados, setChamados] = useState([
    { id: '101', assunto: 'Erro no login', cliente: 'Guilherme', categoria: 'Software', status: 'Aberto', prioridade: 'Alta', data: '13/05/2026' },
    { id: '102', assunto: 'Impressora travada', cliente: 'Wagner', categoria: 'Hardware', status: 'Em Atendimento', prioridade: 'Média', data: '12/05/2026' },
    { id: '103', assunto: 'Sem internet no setor A', cliente: 'Danuza', categoria: 'Rede', status: 'Resolvido', prioridade: 'Alta', data: '10/05/2026' },
  ]);

  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  
  // Estado para controlar qual chamado estamos editando
  const [chamadoSendoEditado, setChamadoSendoEditado] = useState(null);

  // Filtro Combinado
  const chamadosFiltrados = chamados.filter(c => {
    const matchesStatus = filtroStatus === 'Todos' || c.status === filtroStatus;
    const matchesPrioridade = filtroPrioridade === 'Todos' || c.prioridade === filtroPrioridade;
    const matchesBusca = c.assunto.toLowerCase().includes(busca.toLowerCase());
    return matchesStatus && matchesPrioridade && matchesBusca;
  });

  // Função Única para Salvar (Criação ou Edição)
  const salvarChamado = (dados) => {
    if (dados.id) {
      // Se tem ID, estamos editando
      setChamados(chamados.map(c => c.id === dados.id ? { ...c, ...dados } : c));
    } else {
      // Se não tem ID, estamos criando um novo
      const novo = { 
        ...dados, 
        id: Math.floor(Math.random() * 1000).toString(), 
        data: new Date().toLocaleDateString('pt-BR'), 
        status: 'Aberto', 
        cliente: 'Guilherme' 
      };
      setChamados([novo, ...chamados]);
    }
    setChamadoSendoEditado(null);
  };

  const abrirEdicao = (chamado) => {
    setChamadoSendoEditado(chamado);
    setModalAberto(true);
  };

  const alterarStatus = (id, novoStatus) => {
    setChamados(chamados.map(c => c.id === id ? { ...c, status: novoStatus } : c));
  };

  const excluirChamado = (id) => {
    if(window.confirm("Excluir chamado?")) setChamados(chamados.filter(c => c.id !== id));
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Centro de Chamados</h1>
          <p className="text-gray-500">Gestão completa de tickets e suporte</p>
        </div>
        <button 
          onClick={() => { setChamadoSendoEditado(null); setModalAberto(true); }} 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Novo Chamado
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
          <select className="bg-gray-50 border-none rounded-lg text-sm p-2 outline-none" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Aberto">Aberto</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </div>

        <div className="flex items-center gap-2 border-l pl-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Prioridade</span>
          <select className="bg-gray-50 border-none rounded-lg text-sm p-2 outline-none" value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)}>
            <option value="Todos">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>

        <div className="flex-1 relative border-l pl-4">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Buscar ticket..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      <ChamadosTabela 
        chamados={chamadosFiltrados} 
        aoExcluir={excluirChamado} 
        aoAlterarStatus={alterarStatus} 
        aoEditar={abrirEdicao}
      />

      <NovoChamadoModal 
        isOpen={modalAberto} 
        onClose={() => { setModalAberto(false); setChamadoSendoEditado(null); }} 
        aoSalvar={salvarChamado}
        chamadoParaEditar={chamadoSendoEditado}
      />
    </Layout>
  );
}
