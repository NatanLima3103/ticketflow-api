import React, { useState, useEffect } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Chamados() {
  const { user } = useAuth();
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('0'); // '0' para todos
  const [filtroPrioridade, setFiltroPrioridade] = useState('0'); // '0' para todas
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSendoEditado, setChamadoSendoEditado] = useState(null);

  useEffect(() => {
    carregarChamados();
  }, []);

  async function carregarChamados() {
    try {
      setLoading(true);
      const response = await api.get('api/Chamados');
      setChamados(response.data);
    } catch (error) {
      alert("Erro ao carregar chamados");
    } finally {
      setLoading(false);
    }
  }

  const chamadosFiltrados = chamados.filter(c => {
    const matchesStatus = filtroStatus === '0' || c.status.toString() === filtroStatus;
    const matchesPrioridade = filtroPrioridade === '0' || c.prioridade.toString() === filtroPrioridade;
    const matchesBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                         c.descricao.toLowerCase().includes(busca.toLowerCase());
    
    // Filtro de visibilidade: Solicitante (3) só vê os dele
    const matchesUser = user.perfil !== 3 || c.usuarioId === user.id;

    return matchesStatus && matchesPrioridade && matchesBusca && matchesUser;
  });

  const salvarChamado = async (dados) => {
    try {
      if (dados.id) {
        await api.put(`api/Chamados/${dados.id}`, {
            ...dados,
            usuarioId: dados.usuarioId || user.id // Mantém o dono original se possível
        });
      } else {
        await api.post('api/Chamados', {
          ...dados,
          usuarioId: user.id, // O usuário logado é o solicitante
          status: 1 // Aberto
        });
      }
      carregarChamados();
      setModalAberto(false);
      setChamadoSendoEditado(null);
    } catch (error) {
      alert("Erro ao salvar chamado");
    }
  };

  const abrirEdicao = (chamado) => {
    setChamadoSendoEditado(chamado);
    setModalAberto(true);
  };

  const alterarStatus = async (id, novoStatus) => {
    try {
      const chamado = chamados.find(c => c.id === id);
      await api.put(`api/Chamados/${id}`, {
        ...chamado,
        status: novoStatus,
        tecnicoResponsavelId: novoStatus === 2 ? user.id : chamado.tecnicoResponsavelId
      });
      carregarChamados();
    } catch (error) {
      alert("Erro ao alterar status");
    }
  };

  const excluirChamado = async (id) => {
    if (window.confirm("Excluir chamado?")) {
      try {
        await api.delete(`api/Chamados/${id}`);
        carregarChamados();
      } catch (error) {
        alert("Erro ao excluir chamado");
      }
    }
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
            <option value="0">Todos</option>
            <option value="1">Aberto</option>
            <option value="2">Em Atendimento</option>
            <option value="3">Resolvido</option>
          </select>
        </div>

        <div className="flex items-center gap-2 border-l pl-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Prioridade</span>
          <select className="bg-gray-50 border-none rounded-lg text-sm p-2 outline-none" value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)}>
            <option value="0">Todas</option>
            <option value="3">Alta</option>
            <option value="2">Média</option>
            <option value="1">Baixa</option>
          </select>
        </div>

        <div className="flex-1 relative border-l pl-4">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Buscar ticket..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-500">Carregando chamados...</div>
      ) : (
        <ChamadosTabela 
          chamados={chamadosFiltrados} 
          aoExcluir={excluirChamado} 
          aoAlterarStatus={alterarStatus} 
          aoEditar={abrirEdicao}
        />
      )}

      <NovoChamadoModal 
        isOpen={modalAberto} 
        onClose={() => { setModalAberto(false); setChamadoSendoEditado(null); }} 
        aoSalvar={salvarChamado}
        chamadoParaEditar={chamadoSendoEditado}
      />
    </Layout>
  );
}
