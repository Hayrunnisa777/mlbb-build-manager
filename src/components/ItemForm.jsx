import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, X } from 'lucide-react';

const TIERS = ['Temel', 'Gelişmiş', 'Epik', 'Efsanevi'];
const CATEGORIES = ['Saldırı', 'Büyü', 'Savunma', 'Hareket', 'Orman/Roam'];

export default function ItemForm({ onSave, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Saldırı',
    statValue: '',
    tier: 'Temel'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({ name: '', category: 'Saldırı', statValue: '', tier: 'Temel' });
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.statValue) return;

    onSave({
      ...formData,
      id: editingItem ? editingItem.id : Date.now().toString(),
      statValue: Number(formData.statValue),
      isFromApi: editingItem ? editingItem.isFromApi : false
    });

    setFormData({ name: '', category: 'Saldırı', statValue: '', tier: 'Temel' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          {editingItem ? <Edit3 className="w-5 h-5 text-amber-400" /> : <PlusCircle className="w-5 h-5 text-blue-400" />}
          {editingItem ? 'Eşya Özelliklerini Güncelle' : 'Şafak Vadisi Ekipmanı Ekle'}
        </h2>
        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <X className="w-4 h-4" /> İptal
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Eşya / Build Adı</label>
          <input
            type="text"
            required
            placeholder="Örn: Berserker'ın Öfkesi"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Kategori</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Ana Stat (Saldırı/Zırh/Büyü)</label>
          <input
            type="number"
            min="1"
            max="9999"
            required
            placeholder="Örn: 65"
            value={formData.statValue}
            onChange={(e) => setFormData({ ...formData, statValue: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Ekipman Kademesi (Tier)</label>
          <select
            value={formData.tier}
            onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
          >
            {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className={`mt-5 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg ${
          editingItem
            ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
        }`}
      >
        {editingItem ? 'Eşyayı Güncelle' : 'Build Listesine Ekle'}
      </button>
    </form>
  );
}