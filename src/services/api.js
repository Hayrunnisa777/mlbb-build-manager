import axios from 'axios';

const STORAGE_KEY = 'mlbb_build_items';

const INITIAL_ITEMS = [
  { id: '1', name: 'Umutsuzluk Kılıcı (Blade of Despair)', category: 'Saldırı', statValue: 160, tier: 'Efsanevi', isFromApi: true },
  { id: '2', name: 'Kutsal Kristal (Holy Crystal)', category: 'Büyü', statValue: 100, tier: 'Efsanevi', isFromApi: true },
  { id: '3', name: 'Athena\'nın Kalkanı (Athena\'s Shield)', category: 'Savunma', statValue: 900, tier: 'Epik', isFromApi: true },
  { id: '4', name: 'Savaşçı Botları (Warrior Boots)', category: 'Hareket', statValue: 40, tier: 'Temel', isFromApi: true },
];

export const getInventoryItems = async () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }

  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=4');
    const apiMapped = res.data.map((item, index) => ({
      ...INITIAL_ITEMS[index],
      apiId: item.id
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiMapped));
    return apiMapped;
  } catch (error) {
    console.error('API Hatası:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
    return INITIAL_ITEMS;
  }
};

export const saveInventoryItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};