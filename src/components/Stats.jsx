import React from 'react';
import { Shield, Sparkles, Sword } from 'lucide-react';

export default function Stats({ items }) {
  const totalItems = items.length;
  const legendaryCount = items.filter(i => i.tier === 'Efsanevi').length;
  const totalStat = items.reduce((acc, curr) => acc + Number(curr.statValue || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-blue-950/20">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
          <Sword className="w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Kayıtlı Eşya & Build</p>
          <h3 className="text-2xl font-bold text-white">{totalItems}</h3>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-amber-950/20">
        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Efsanevi Tier Eşyalar</p>
          <h3 className="text-2xl font-bold text-amber-400">{legendaryCount}</h3>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-cyan-950/20">
        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Kümülatif Stat Skoru</p>
          <h3 className="text-2xl font-bold text-cyan-400">{totalStat}</h3>
        </div>
      </div>
    </div>
  );
}