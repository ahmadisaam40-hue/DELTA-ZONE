import { create } from 'zustand'
import {
  collection, getDocs, doc, setDoc, deleteDoc, onSnapshot, writeBatch, getDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'products'

const defaultProducts = [
  { id: 1, name: 'دلتا فانتوم برو', category: 'hardware', price: 2499, originalPrice: 2999, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600', badge: 'الأكثر مبيعاً', description: 'كمبيوتر ألعاب فائق القوة مع RTX 4090، معالج Intel i9-14900K، ذاكرة 64GB DDR5 ونظام تبريد سائل.', features: ['Intel Core i9-14900K', 'NVIDIA RTX 4090 24GB', 'ذاكرة 64GB DDR5', 'تخزين SSD 2TB NVMe', 'تبريد سائل 360mm'], inStock: true, isFeatured: true, isNew: false },
  { id: 2, name: 'شاشة دلتا فيجن 4K', category: 'hardware', price: 899, originalPrice: 1099, rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600', badge: 'عرض خاص', description: 'شاشة 32 بوصة بدقة 4K UHD IPS مع معدل تحديث 144Hz وتقنية HDR600.', features: ['32 بوصة 4K UHD IPS', 'معدل تحديث 144Hz', 'شهادة HDR600', 'زمن استجابة 1ms', 'متوافقة مع G-Sync'], inStock: true, isFeatured: true, isNew: false },
  { id: 3, name: 'حزمة دلتا OS الاحترافية', category: 'software', price: 199, originalPrice: 349, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', badge: 'الأكثر طلباً', description: 'حزمة مكتبية كاملة مع أدوات الذكاء الاصطناعي، مزامنة سحابية، وتحديثات مدى الحياة.', features: ['أدوات ذكاء اصطناعي', 'مزامنة سحابية', 'تحديثات مدى الحياة', 'دعم متعدد الأجهزة', 'دعم فني ممتاز'], inStock: true, isFeatured: true, isNew: false },
  { id: 4, name: 'بلايستيشن 5 برو', category: 'consoles', price: 699, originalPrice: 799, rating: 4.9, reviews: 512, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', badge: 'جديد', description: 'سوني بلايستيشن 5 برو مع وحدة رسوميات محسنة، 2TB SSD، ودعم 8K.', features: ['وحدة رسوميات محسنة', 'تخزين 2TB SSD', 'دعم 8K', 'تقنية Ray Tracing', 'يد تحكم DualSense'], inStock: true, isFeatured: true, isNew: true },
  { id: 5, name: 'سماعات دلتا بادز برو', category: 'accessories', price: 149, originalPrice: 199, rating: 4.6, reviews: 345, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600', badge: null, description: 'سماعات لاسلكية فاخرة مع إلغاء الضوضاء وتقنية الصوت المكاني وبطارية تدوم 36 ساعة.', features: ['إلغاء الضوضاء النشط', 'صوت مكاني', 'بطارية 36 ساعة', 'مقاومة للماء IPX5', 'شحن لاسلكي'], inStock: true, isFeatured: false, isNew: false },
  { id: 6, name: 'آيفون 16 برو ماكس', category: 'phones', price: 1199, originalPrice: 1299, rating: 4.9, reviews: 890, image: 'https://images.unsplash.com/photo-1592750475338-74b7b2f02f11?w=600', badge: 'رائج', description: 'آبل آيفون 16 برو ماكس بشريحة A18 Pro، تخزين 256GB، وتصميم التيتانيوم.', features: ['شريحة A18 Pro', 'تخزين 256GB', 'كاميرا 48MP', 'تصميم تيتانيوم', 'منفذ USB-C'], inStock: true, isFeatured: true, isNew: true },
  { id: 7, name: 'كيبورد دلتا الميكانيكي', category: 'accessories', price: 179, originalPrice: 229, rating: 4.7, reviews: 167, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600', badge: 'عرض خاص', description: 'كيبورد ميكانيكي Hot-Swappable مع إضاءة RGB وإطار ألمنيوم ومفاتيح Cherry MX.', features: ['مفاتيح Cherry MX', 'إضاءة RGB', 'إطار ألمنيوم', 'Hot-Swappable', 'USB-C'], inStock: true, isFeatured: false, isNew: false },
]

const useProductStore = create((set, get) => ({
  products: [],
  loading: true,

  // تشغيل مرة واحدة: ازرع البيانات فقط إن لم يُزرع من قبل
  init: async () => {
    const meta = await getDoc(doc(db, 'config', 'meta'))
    if (!meta.exists() || !meta.data()?.productsSeeded) {
      await get().seedDefaults()
    }
  },

  // استمع للتغييرات في Firestore بشكل فوري (بدون منطق زرع)
  subscribe: () => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snap) => {
      const prods = snap.docs.map(d => ({ ...d.data(), id: d.id }))
      set({ products: prods, loading: false })
    })
    return unsub
  },

  seedDefaults: async () => {
    const batch = writeBatch(db)
    defaultProducts.forEach(p => {
      batch.set(doc(db, COLLECTION, String(p.id)), p)
    })
    // سجّل علامة "تم الزرع" حتى لا يُكرر
    batch.set(doc(db, 'config', 'meta'), { productsSeeded: true })
    await batch.commit()
  },

  addProduct: async (product) => {
    const id = String(Date.now())
    await setDoc(doc(db, COLLECTION, id), { ...product, id, rating: 0, reviews: 0 })
  },

  updateProduct: async (id, data) => {
    await setDoc(doc(db, COLLECTION, String(id)), { ...data, id: String(id) }, { merge: true })
  },

  deleteProduct: async (id) => {
    await deleteDoc(doc(db, COLLECTION, String(id)))
  },

  resetToDefault: async () => {
    const snap = await getDocs(collection(db, COLLECTION))
    const batch = writeBatch(db)
    snap.docs.forEach(d => batch.delete(d.ref))
    await batch.commit()
    await get().seedDefaults()
  },

  getFeatured: () => get().products.filter(p => p.isFeatured),
}))

export default useProductStore
