import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NovoChamadoModal({ isOpen, onClose, aoSalvar }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    assunto: '',
    prioridade: 'Media',
    categoria: 'Software' // Valor inicial padrão
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Regra de Negócio: Não permitir criar sem título (HTML5 'required' já ajuda)
    if (!form.assunto.trim()) return alert("O título é obrigatório!");

    aoSalvar(form);
    setForm({ assunto: '', prioridade: 'Media', categoria: 'Software' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">Abrir Novo Chamado</h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título do Problema</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 transition-all"
              placeholder="Descreva brevemente o erro..."
              value={form.assunto}
              onChange={(e) => setForm({...form, assunto: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Categoria</label>
              <select 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 transition-all bg-white"
                value={form.categoria}
                onChange={(e) => setForm({...form, categoria: e.target.value})}
              >
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Rede">Rede</option>
                <option value="Impressora">Impressora</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Prioridade</label>
              <select 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 transition-all bg-white"
                value={form.prioridade}
                onChange={(e) => setForm({...form, prioridade: e.target.value})}
              >
                <option value="Baixa">Baixa</option>
                <option value="Media">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Criar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}