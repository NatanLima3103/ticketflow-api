import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, Users, Settings, LogOut, PlusCircle } from 'lucide-react';
import ChamadosTabela from '../components/ChamadosTabela';
import NovoChamadoModal from '../components/NovoChamadoModal';

export default function Dashboard() {
  const navigate = useNavigate();
  // Recupera o nome do usuário que salvamos no Login
  const usuario = JSON.parse(localStorage.getItem('@TicketFlow:usuario') || '{}');

  // Estado para controlar a abertura do modal
  const [modalAberto, setModalAberto] = React.useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('@TicketFlow:token');
    localStorage.removeItem('@TicketFlow:usuario');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Menu Lateral - Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-600">
          TicketFlow
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-blue-800 rounded-lg"><LayoutDashboard size={20}/> Dashboard</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg transition-colors"><Ticket size={20}/> Chamados</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg transition-colors"><Users size={20}/> Utilizadores</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg transition-colors"><Settings size={20}/> Definições</a>
        </nav>

        <button 
          onClick={handleLogout}
          className="p-6 flex items-center gap-3 hover:bg-red-600 transition-colors border-t border-blue-600"
        >
          <LogOut size={20}/> Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">Painel de Controlo</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Olá, <span className="font-bold">{usuario.nome || 'Utilizador'}</span></span>
            <div className="w-10 h-10 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full font-bold">
              {usuario.nome?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Área de Dados */}
        <section className="p-8 overflow-y-auto">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-sm text-gray-500 uppercase font-bold">Total de Chamados</p>
              <h3 className="text-3xl font-bold">24</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <p className="text-sm text-gray-500 uppercase font-bold">Em Aberto</p>
              <h3 className="text-3xl font-bold">12</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-sm text-gray-500 uppercase font-bold">Resolvidos</p>
              <h3 className="text-3xl font-bold">08</h3>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Últimos Chamados</h3>
          <ChamadosTabela />

          {/* Botão de Ação Rápida */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-sm text-center border-2 border-dashed border-gray-200">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Precisas de ajuda técnica?</h4>
            <button 
              onClick={() => setModalAberto(true)} 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              <PlusCircle size={20}/> Abrir Novo Chamado
            </button>
          </div>
        </section>

        {/* Modal de Novo Chamado */}
        <NovoChamadoModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      </main>
    </div>
  );
}
