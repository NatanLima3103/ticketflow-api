import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NovoChamadoModal({ isOpen, onClose, aoSalvar, chamadoParaEditar }) {
  const [form, setForm] = useState({ assunto: '', prioridade: 'Media', categoria: 'Software' });

  useEffect(() => {
    if (chamadoParaEditar) {
      setForm({
        assunto: chamadoParaEditar.assunto,
        prioridade: chamadoParaEditar.prioridade,
        categoria: chamadoParaEditar.categoria || 'Software'
      });
    } else {
      setForm({ assunto: '', prioridade: 'Media', categoria: 'Software' });
    }
  }, [chamadoParaEditar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    aoSalvar({ ...form, id: chamadoParaEditar?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {chamadoParaEditar ? '✏️ Editar Chamado' : '🆕 Novo Chamado'}
          </h3>
          <button onClick={onClose}><X className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.assunto}
            onChange={(e) => setForm({...form, assunto: e.target.value})}
            placeholder="Assunto"
            required
          />
          <select 
            className="w-full px-4 py-2 border rounded-lg outline-none bg-white"
            value={form.prioridade}
            onChange={(e) => setForm({...form, prioridade: e.target.value})}
          >
            <option value="Baixa">Baixa</option>
            <option value="Media">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}