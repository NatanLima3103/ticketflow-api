import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NovoChamadoModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('Media');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando chamado:", { titulo, prioridade });
    // Aqui depois chamaremos a API
    onClose(); // Fecha o modal após enviar
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Abrir Novo Chamado</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Problema</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Impressora não funciona"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="Baixa">Baixa</option>
              <option value="Media">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Criar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
