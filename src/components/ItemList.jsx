import React from 'react';
import { Trash2, Edit, Sword, Shield, Sparkles, Wind, Flame } from 'lucide-react';

const tierBadgeColors = {
  Temel: 'bg-slate-800 text-slate-300 border-slate-700',
  Gelişmiş: 'bg-blue-950/80 text-blue-400 border-blue-800',
  Epik: 'bg-purple-950/80 text-purple-400 border-purple-800',
  Efsanevi: 'bg-amber-950/80 text-amber-400 border-amber-600/80 shadow-sm shadow-amber-500/20'
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Saldırı': return <Sword className="w-4 h-4 text-rose-400" />;
    case 'Büyü': return <Flame className="w-4 h-4 text-cyan-400" />;
    case 'Savunma': return <Shield className="w-4 h-4 text-emerald-400" />;
    case 'Hareket': return <Wind className="w-4 h-4 text-amber-400" />;
    default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
  }
};

export default function ItemList({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500">
        Şafak Vadisi envanterinde henüz ekipman yok. Yukarıdaki formdan ekleyebilirsin!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition duration-200 flex flex-col justify-between shadow-lg"
        >
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base leading-tight">{item.name}</h4>
                  <span className="text-xs text-slate-400">{item.category}</span>
                </div>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${tierBadgeColors[item.tier] || tierBadgeColors.Temel}`}>
                {item.tier}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Stat Değeri: <strong className="text-slate-200 text-sm font-semibold">+{item.statValue}</strong></span>
              {item.isFromApi && <span className="text-[10px] text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">API Verisi</span>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800/60">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
              title="Düzenle"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
              title="Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}