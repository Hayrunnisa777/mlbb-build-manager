import React, { useState, useEffect } from 'react';
import Stats from './components/Stats';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { getInventoryItems, saveInventoryItems } from './services/api';
import { Gamepad2, RotateCcw } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getInventoryItems();
      setItems(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSaveItem = (item) => {
    let updated;
    if (editingItem) {
      updated = items.map(i => i.id === item.id ? item : i);
      setEditingItem(null);
    } else {
      updated = [item, ...items];
    }
    setItems(updated);
    saveInventoryItems(updated);
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    saveInventoryItems(updated);
  };

  const handleResetData = () => {
    localStorage.removeItem('mlbb_build_items');
    window.location.reload();
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-300 flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-amber-400" /> MLBB Build & Ekipman Yöneticisi
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Mobile Legends: Bang Bang eşyalarını yönet, kişisel build setlerini oluştur (React, Tailwind & LocalStorage)
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
            title="LocalStorage sıfırla ve API verilerini tekrar yükle"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Verileri Sıfırla
          </button>
        </header>

        {/* İstatistikler */}
        <Stats items={items} />

        {/* Ekle / Güncelle Formu */}
        <ItemForm
          onSave={handleSaveItem}
          editingItem={editingItem}
          onCancelEdit={() => setEditingItem(null)}
        />

        {/* Liste */}
        <div className="mt-8">
          <h3 className="text-base font-semibold text-white mb-4">Şafak Vadisi Ekipman Listesi</h3>
          <ItemList
            items={items}
            onDelete={handleDeleteItem}
            onEdit={(item) => setEditingItem(item)}
          />
        </div>
      </div>
    </div>
  );
}