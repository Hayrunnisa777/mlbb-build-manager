# MLBB Build & Ekipman Yöneticisi

Mobile Legends: Bang Bang oyunundaki eşyaları ve kişisel build setlerini yönetmek için geliştirilmiş, React tabanlı tek sayfalık (SPA) bir web uygulaması.

**Canlı Demo:** https://hayrunnisa777.github.io/mlbb-build-manager/

> Staj teslim projesi — React, Vite, Tailwind CSS, Axios ve LocalStorage kullanılarak sıfırdan geliştirilmiştir.

---

## İçindekiler

1. [Projenin Amacı](#projenin-amacı)
2. [Özellikler](#özellikler)
3. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
4. [Ekran Bölümleri](#ekran-bölümleri)
5. [Proje Yapısı](#proje-yapısı)
6. [Veri Modeli](#veri-modeli)
7. [Veri Akışı ve Mimari](#veri-akışı-ve-mimari)
8. [Kurulum](#kurulum)
9. [Komutlar](#komutlar)
10. [Dağıtım (GitHub Pages)](#dağıtım-github-pages)
11. [Öğrenilen Konular](#öğrenilen-konular)
12. [Geliştirilebilecek Yönler](#geliştirilebilecek-yönler)

---

## Projenin Amacı

MLBB oyuncuları maç öncesinde hangi eşyaları alacaklarını planlar. Bu uygulama, oyuncunun kendi ekipman envanterini oluşturmasını, her eşyanın kategorisini ve stat değerini kaydetmesini, toplam güç skorunu anlık görmesini sağlar.

Teknik olarak proje; **React'te state yönetimi, component'lere ayırma, form işleme, CRUD operasyonları, harici API tüketimi ve tarayıcı tarafında kalıcı veri saklama** konularının uçtan uca uygulandığı bir örnektir.

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| **Eşya Ekleme** | Ad, kategori, ana stat değeri ve tier bilgisiyle yeni ekipman kaydı |
| **Eşya Güncelleme** | Kart üzerindeki kalem ikonuyla form düzenleme moduna geçer, kayıt üzerine yazılır |
| **Eşya Silme** | Tek tıkla listeden kaldırma |
| **Canlı İstatistikler** | Toplam eşya sayısı, Efsanevi tier sayısı ve kümülatif stat skoru anlık hesaplanır |
| **Kalıcı Veri** | Tüm değişiklikler `localStorage`'a yazılır; sayfa yenilense de veriler durur |
| **API Entegrasyonu** | İlk açılışta Axios ile harici bir API'den başlangıç verisi çekilir |
| **Hata Yönetimi** | API'ye ulaşılamazsa uygulama sabit yedek veriyle kesintisiz açılır |
| **Verileri Sıfırla** | LocalStorage temizlenip başlangıç durumuna dönülür |
| **Responsive Tasarım** | Mobil, tablet ve masaüstü için ayrı grid düzenleri |
| **Görsel Tier Sistemi** | Temel / Gelişmiş / Epik / Efsanevi kademeleri renkli rozetlerle ayrışır |

---

## Kullanılan Teknolojiler

| Katman | Teknoloji | Sürüm | Neden Seçildi |
|---|---|---|---|
| Kütüphane | **React** | 19 | Component tabanlı yapı, Hooks ile sade state yönetimi |
| Build Aracı | **Vite** | 8 | Anında HMR, hızlı production build |
| Stil | **Tailwind CSS** | 4 | Utility-first yaklaşım, ayrı CSS dosyası gerektirmez |
| HTTP İstemcisi | **Axios** | 1.19 | Promise tabanlı, sade hata yakalama |
| İkonlar | **lucide-react** | 1.33 | Hafif, SVG tabanlı, tree-shake edilebilir ikon seti |
| Kod Kalitesi | **ESLint** | 10 | React Hooks kurallarının denetimi |
| Kalıcılık | **LocalStorage** | — | Backend gerektirmeden veri saklama |
| CI/CD | **GitHub Actions** | — | Push sonrası otomatik build ve yayına alma |

---

## Ekran Bölümleri

**1. Header**
Uygulama başlığı (gradient metin + `Gamepad2` ikonu) ve sağda "Verileri Sıfırla" butonu.

**2. İstatistik Kartları (`Stats.jsx`)**
Üç kart halinde; kayıtlı eşya sayısı, Efsanevi tier sayısı, kümülatif stat skoru. Değerler `items` dizisinden her render'da yeniden hesaplanır — ayrı bir state tutulmaz.

**3. Ekleme / Güncelleme Formu (`ItemForm.jsx`)**
4 kolonlu grid: eşya adı (text), kategori (select), ana stat (number, 1–9999), tier (select).
Form `editingItem` prop'una göre iki mod arasında geçiş yapar; düzenleme modunda buton rengi amber'a döner ve "İptal" seçeneği açılır.

**4. Ekipman Listesi (`ItemList.jsx`)**
Responsive kart grid'i (mobilde 1, tablette 2, masaüstünde 3 kolon). Her kartta kategori ikonu, tier rozeti, stat değeri, API kaynaklı kayıtlar için "API Verisi" etiketi ve düzenle/sil butonları bulunur. Liste boşsa yönlendirici bir boş durum mesajı gösterilir.

---

## Proje Yapısı

```
mlbb-build-manager/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages otomatik dağıtım iş akışı
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # Görseller (hero.png, logolar)
│   ├── components/
│   │   ├── ItemForm.jsx        # Ekleme/güncelleme formu
│   │   ├── ItemList.jsx        # Eşya kartları listesi
│   │   └── Stats.jsx           # İstatistik kartları
│   ├── services/
│   │   └── api.js              # Axios + LocalStorage veri katmanı
│   ├── App.jsx                 # Ana bileşen, tüm state burada
│   ├── App.css
│   ├── index.css               # Tailwind girişi
│   └── main.jsx                # React giriş noktası
├── index.html
├── vite.config.js              # base path + React & Tailwind eklentileri
├── eslint.config.js
└── package.json
```

---

## Veri Modeli

Her eşya kaydı aşağıdaki yapıdadır:

```js
{
  id: "1",                                        // string, benzersiz (Date.now())
  name: "Umutsuzluk Kılıcı (Blade of Despair)",   // string
  category: "Saldırı",                            // Saldırı | Büyü | Savunma | Hareket | Orman/Roam
  statValue: 160,                                 // number, 1–9999
  tier: "Efsanevi",                               // Temel | Gelişmiş | Epik | Efsanevi
  isFromApi: true,                                // boolean — kart üzerinde rozet gösterimi için
  apiId: 1                                        // number (yalnızca API'den gelenlerde)
}
```

LocalStorage anahtarı: **`mlbb_build_items`**

---

## Veri Akışı ve Mimari

Uygulama tek yönlü veri akışı (top-down) prensibiyle çalışır. Tüm state `App.jsx` içinde tutulur, alt bileşenler saf (presentational) bileşenlerdir.

```
                 ┌─────────────────────────┐
                 │        App.jsx          │
                 │  items / editingItem    │
                 │      / loading          │
                 └───┬────────────┬────────┘
        props ↓      │            │      ↑ callback
   ┌─────────────┐ ┌─┴────────┐ ┌─┴──────────┐
   │  Stats.jsx  │ │ItemForm  │ │ItemList.jsx│
   │  (salt oku) │ │  .jsx    │ │            │
   └─────────────┘ └──────────┘ └────────────┘
                          │
                          ↓
                 ┌─────────────────────┐
                 │ services/api.js     │
                 │ Axios + LocalStorage│
                 └─────────────────────┘
```

**İlk yükleme sırası (`api.js` → `getInventoryItems`):**

1. `localStorage`'da `mlbb_build_items` var mı diye bakılır.
2. **Varsa** kayıtlı veri döndürülür — API'ye hiç gidilmez.
3. **Yoksa** Axios ile `jsonplaceholder.typicode.com/todos?_limit=4` çağrılır; gelen kayıtların `id`'leri sabit MLBB eşya listesiyle eşleştirilir ve `localStorage`'a yazılır.
4. **API hata verirse** `catch` bloğu devreye girer, sabit `INITIAL_ITEMS` listesi yazılır. Uygulama her koşulda açılır.

Yükleme boyunca `loading` state'i `true` kalır ve ekranda "Yükleniyor..." gösterilir.

**Yazma işlemleri:** `handleSaveItem` ve `handleDeleteItem` önce yeni diziyi hesaplar, `setItems` ile state'i günceller, ardından aynı diziyi `saveInventoryItems` ile `localStorage`'a yazar. Böylece ekran ve kalıcı veri her zaman senkron kalır.

---

## Kurulum

Gereksinim: **Node.js 20+** ve npm.

```bash
# 1. Depoyu klonla
git clone https://github.com/Hayrunnisa777/mlbb-build-manager.git
cd mlbb-build-manager

# 2. Bağımlılıkları kur
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

---

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Vite geliştirme sunucusunu HMR ile başlatır |
| `npm run build` | Production build üretir → `dist/` |
| `npm run preview` | Alınan build'i yerelde sunar (yayın öncesi kontrol) |
| `npm run lint` | ESLint ile kod denetimi yapar |

---

## Dağıtım (GitHub Pages)

Proje, `main` branch'ine her push'ta **GitHub Actions** üzerinden otomatik olarak yayına alınır.

**İş akışı** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `actions/checkout@v4` ile depo çekilir
2. Node 20 kurulur, npm önbelleği kullanılır
3. `npm ci` ile bağımlılıklar kurulur
4. `npm run build` ile `dist/` üretilir
5. `actions/upload-pages-artifact@v3` ile `dist/` artifact olarak yüklenir
6. `actions/deploy-pages@v4` ile GitHub Pages'e dağıtılır

**Alt dizin (base path) ayarı** — Site kök dizinde değil `/mlbb-build-manager/` altında yayınlandığı için `vite.config.js` içinde base yolu tanımlanmıştır:

```js
base: process.env.NODE_ENV === 'production' ? '/mlbb-build-manager/' : '/'
```

Bu ayar olmadan build sonrası JS ve CSS dosyaları `/assets/...` yolundan aranır ve sayfa boş açılır.

> **Not:** Repo ayarlarında **Settings → Pages → Source** değeri **GitHub Actions** olmalıdır. "Deploy from a branch" seçiliyse ham kaynak dosyalar yayınlanır ve site boş görünür.

---

## Öğrenilen Konular

- **React Hooks:** `useState` ile lokal state, `useEffect` ile ilk yükleme ve `editingItem` değişiminde formun senkronize edilmesi
- **Component mimarisi:** State'i tek bir üst bileşende toplayıp alt bileşenleri props ile besleme (lifting state up)
- **Türetilmiş veri:** İstatistiklerin ayrı state yerine mevcut `items` dizisinden hesaplanması — tek doğruluk kaynağı prensibi
- **Kontrollü form (controlled component):** Tüm input değerlerinin React state'inden okunması, tek bir `formData` nesnesiyle yönetimi
- **Tek formla iki mod:** Aynı bileşenin `editingItem` prop'una göre hem ekleme hem güncelleme yapması
- **Async / await + hata yönetimi:** Axios isteğinin `try/catch` ile sarılıp fallback veriye düşmesi
- **Kalıcılık:** `localStorage` ile backend olmadan veri saklama ve JSON serileştirme
- **Tailwind CSS:** Utility sınıflarıyla responsive grid, koşullu sınıf birleştirme (template literal ile dinamik renk)
- **CI/CD:** GitHub Actions ile otomatik build-deploy hattı ve alt dizin dağıtımında base path sorunu

---

## Geliştirilebilecek Yönler

- Kategori ve tier'a göre **filtreleme / arama**
- Stat değerine veya isme göre **sıralama**
- Birden fazla **build seti** oluşturup aralarında geçiş
- Silme işlemi öncesi **onay diyaloğu**
- LocalStorage yerine gerçek bir **backend + veritabanı**
- Formda daha ayrıntılı **doğrulama mesajları** (şu an sessizce engelleniyor)
- JavaScript yerine **TypeScript**'e geçiş

---

## Lisans

Eğitim ve staj teslim amacıyla hazırlanmıştır.
