import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';

export default function Dashboard() {
  const [chamados, setChamados] = useState([
    { id: '101', assunto: 'Erro no login do sistema', cliente: 'Empresa ABC', data: '13/05/2026', status: 'Aberto', prioridade: 'Alta', categoria: 'Software' },
    { id: '102', assunto: 'Instalação de impressora', cliente: 'João Silva', data: '12/05/2026', status: 'Em Atendimento', prioridade: 'Média', categoria: 'Hardware' },
    { id: '103', assunto: 'Dúvida sobre faturamento', cliente: 'Maria Souza', data: '10/05/2026', status: 'Resolvido', prioridade: 'Baixa', categoria: 'Financeiro' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoParaEditar, setChamadoParaEditar] = useState(null);
  
  const salvarChamado = (dados) => {
    if (dados.id) {
      setChamados(chamados.map(c => c.id === dados.id ? { ...c, ...dados } : c));
    } else {
      const novo = {
        ...dados,
        id: Math.floor(Math.random() * 1000).toString(),
        data: new Date().toLocaleDateString('pt-BR'),
        status: 'Aberto',
        cliente: 'Guilherme'
      };
      setChamados([novo, ...chamados]);
    }
    setChamadoParaEditar(null);
  };

  const abrirEdicao = (chamado) => {
    setChamadoParaEditar(chamado);
    setModalAberto(true);
  };

  const alterarStatus = (id, novoStatus) => {
    setChamados(chamados.map(c => c.id === id ? { ...c, status: novoStatus } : c));
  };

  const excluirChamado = (id) => {
    if (window.confirm("Excluir este chamado?")) {
      setChamados(chamados.filter(c => c.id !== id));
    }
  };

  const totalChamados = chamados.length;
  const numAbertos = chamados.filter(c => c.status !== 'Resolvido').length;
  const numResolvidos = chamados.filter(c => c.status === 'Resolvido').length;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-400 uppercase font-bold">Total de Tickets</p>
          <h3 className="text-3xl font-bold text-gray-800">{totalChamados}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-xs text-gray-400 uppercase font-bold">Pendente</p>
          <h3 className="text-3xl font-bold text-gray-800">{numAbertos}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-400 uppercase font-bold">Resolvidos</p>
          <h3 className="text-3xl font-bold text-gray-800">{numResolvidos}</h3>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Últimos Chamados</h3>
      <ChamadosTabela 
        chamados={chamados} 
        aoExcluir={excluirChamado}
        aoEditar={abrirEdicao}
        aoAlterarStatus={alterarStatus}
      />

      <div className="mt-8 bg-white p-8 rounded-xl shadow-sm text-center border-2 border-dashed border-gray-200">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Encontrou um novo problema?</h4>
        <button 
          onClick={() => { setChamadoParaEditar(null); setModalAberto(true); }} 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          <PlusCircle size={20}/> Abrir Novo Chamado
        </button>
      </div>

      <NovoChamadoModal 
        isOpen={modalAberto} 
        onClose={() => { setModalAberto(false); setChamadoParaEditar(null); }} 
        aoSalvar={salvarChamado}
        chamadoParaEditar={chamadoParaEditar}
      />
    </Layout>
  );
}
