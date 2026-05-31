import { useState, useEffect } from 'react';
import { Ticket, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [estatisticas, setEstatisticas] = useState({ total: 0, abertos: 0, andamento: 0, resolvidos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  async function carregarEstatisticas() {
    try {
      setLoading(true);
      const response = await api.get('api/Chamados');
      const chamados = response.data;

      // Filtrar se for solicitante
      const chamadosVisiveis = user.perfil === 3 
        ? chamados.filter(c => c.usuarioId === user.id)
        : chamados;

      setEstatisticas({
        total: chamadosVisiveis.length,
        abertos: chamadosVisiveis.filter(c => c.status === 1).length,
        andamento: chamadosVisiveis.filter(c => c.status === 2).length,
        resolvidos: chamadosVisiveis.filter(c => c.status === 3).length,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      console.error("Erro ao carregar estatísticas");
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    { title: 'Total de Chamados', value: estatisticas.total, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Abertos', value: estatisticas.abertos, icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Em Atendimento', value: estatisticas.andamento, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resolvidos', value: estatisticas.resolvidos, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Olá, {user?.nome}!</h1>
        <p className="text-gray-500">Bem-vindo ao painel de controle do TicketFlow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{loading ? '...' : card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Precisa de ajuda?</h2>
        <p className="opacity-90 mb-6 max-w-md">Abra um novo chamado para que nossa equipe técnica possa resolver seu problema o mais rápido possível.</p>
        <button 
          onClick={() => window.location.href = '/chamados'}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors"
        >
          Ir para Chamados
        </button>
      </div>
    </Layout>
  );
}
