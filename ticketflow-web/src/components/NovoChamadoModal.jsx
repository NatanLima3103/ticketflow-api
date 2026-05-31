import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

export default function NovoChamadoModal({ isOpen, onClose, aoSalvar, chamadoParaEditar }) {
  const [form, setForm] = useState({ titulo: '', descricao: '', prioridade: 2, categoriaId: '' });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (isOpen) {
      carregarCategorias();
    }
  }, [isOpen]);

  async function carregarCategorias() {
    try {
      const response = await api.get('api/Categorias');
      setCategorias(response.data);
      
      if (!chamadoParaEditar && response.data.length > 0) {
        setForm(prev => ({ ...prev, categoriaId: response.data[0].id }));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias");
    }
  }

  useEffect(() => {
    if (chamadoParaEditar) {
      setForm({
        titulo: chamadoParaEditar.titulo,
        descricao: chamadoParaEditar.descricao || '',
        prioridade: chamadoParaEditar.prioridade,
        categoriaId: chamadoParaEditar.categoriaId
      });
    } else {
      setForm({ titulo: '', descricao: '', prioridade: 2, categoriaId: categorias[0]?.id || '' });
    }
  }, [chamadoParaEditar, isOpen, categorias]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    aoSalvar({ 
        ...form, 
        id: chamadoParaEditar?.id,
        prioridade: Number(form.prioridade),
        categoriaId: Number(form.categoriaId)
    });
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
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Assunto</label>
            <input 
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={form.titulo}
                onChange={(e) => setForm({...form, titulo: e.target.value})}
                placeholder="Título do chamado"
                required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Descrição</label>
            <textarea 
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={form.descricao}
                onChange={(e) => setForm({...form, descricao: e.target.value})}
                placeholder="Detalhes do problema"
                rows="3"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Categoria</label>
            <select 
                className="w-full px-4 py-2 border rounded-lg outline-none bg-white"
                value={form.categoriaId}
                onChange={(e) => setForm({...form, categoriaId: e.target.value})}
                required
            >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Prioridade</label>
            <select 
                className="w-full px-4 py-2 border rounded-lg outline-none bg-white"
                value={form.prioridade}
                onChange={(e) => setForm({...form, prioridade: e.target.value})}
            >
                <option value={1}>Baixa</option>
                <option value={2}>Média</option>
                <option value={3}>Alta</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
