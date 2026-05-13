import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Layout from '../components/Layout';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';

export default function Dashboard() {
  const [chamados, setChamados] = useState([
    { id: '101', assunto: 'Erro no login do sistema', cliente: 'Empresa ABC', data: '13/05/2026', status: 'Aberto', prioridade: 'Alta' },
    { id: '102', assunto: 'Instalação de impressora', cliente: 'João Silva', data: '12/05/2026', status: 'Em Atendimento', prioridade: 'Média' },
    { id: '103', assunto: 'Dúvida sobre faturamento', cliente: 'Maria Souza', data: '10/05/2026', status: 'Resolvido', prioridade: 'Baixa' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  
  const adicionarChamado = (novoChamado) => {
    const chamadoCompleto = {
      ...novoChamado,
      id: Math.floor(Math.random() * 1000).toString(),
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Aberto',
      cliente: 'Guilherme' // Ajustaremos para ser dinâmico depois
    };
    setChamados([chamadoCompleto, ...chamados]);
  };

  const excluirChamado = (id) => {
    setChamados(chamados.filter(c => c.id !== id));
  };

  const totalChamados = chamados.length;
  const numAbertos = chamados.filter(c => c.status !== 'Resolvido').length;
  const numResolvidos = chamados.filter(c => c.status === 'Resolvido').length;

  return (
    <Layout>
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Total de Chamados</p>
          <h3 className="text-3xl font-bold">{totalChamados}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Em Aberto</p>
          <h3 className="text-3xl font-bold">{numAbertos}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Resolvidos</p>
          <h3 className="text-3xl font-bold">{numResolvidos}</h3>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Últimos Chamados</h3>
      <ChamadosTabela chamados={chamados} aoExcluir={excluirChamado} />

      <div className="mt-8 bg-white p-8 rounded-xl shadow-sm text-center border-2 border-dashed border-gray-200">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Precisas de ajuda técnica?</h4>
        <button 
          onClick={() => setModalAberto(true)} 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
        >
          <PlusCircle size={20}/> Abrir Novo Chamado
        </button>
      </div>

      <NovoChamadoModal 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        aoSalvar={adicionarChamado} 
      />
    </Layout>
  );
}
