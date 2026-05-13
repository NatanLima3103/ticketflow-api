import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NovoChamadoModal({ isOpen, onClose, aoSalvar }) {
  if (!isOpen) return null;

  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('Media');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envia os dados para a função que está no Dashboard
    aoSalvar({ assunto: titulo, prioridade: prioridade });
    setTitulo(''); // Limpa o formulário
    onClose(); // Fecha o modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Abrir Novo Chamado</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Problema</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              placeholder="Ex: Erro no acesso"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="Baixa">Baixa</option>
              <option value="Media">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
              Criar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
