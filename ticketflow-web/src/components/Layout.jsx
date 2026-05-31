import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, Users, Tags, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'bg-blue-800' : 'hover:bg-blue-600';

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-blue-700 text-white flex flex-col shrink-0">
        <div className="p-6 text-2xl font-bold border-b border-blue-600">TicketFlow</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/dashboard')}`}>
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link to="/chamados" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/chamados')}`}>
            <Ticket size={20}/> Chamados
          </Link>
          
          {/* Somente Admin vê Usuários */}
          {user?.perfil === 1 && (
            <Link to="/usuarios" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/usuarios')}`}>
              <Users size={20}/> Usuários
            </Link>
          )}

          {/* Admin e Técnico vêem Categorias */}
          {[1, 2].includes(user?.perfil) && (
            <Link to="/categorias" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/categorias')}`}>
              <Tags size={20}/> Categorias
            </Link>
          )}
        </nav>
        <button onClick={handleLogout} className="p-6 flex items-center gap-3 hover:bg-red-600 border-t border-blue-600 transition-colors">
          <LogOut size={20}/> Sair
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800 uppercase tracking-tight">TicketFlow System</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Olá, {user?.nome}</span>
            <div className="w-10 h-10 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full font-bold">
              {user?.nome?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
