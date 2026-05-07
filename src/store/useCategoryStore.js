import { create } from 'zustand'
import {
  doc, setDoc, onSnapshot, getDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const DOC_REF = 'config/categories'

const defaultCategories = [
  { id: 'hardware', name: 'هاردوير', icon: 'Cpu', subcategories: [
    { id: 'pc', name: 'كمبيوترات' },
    { id: 'laptops', name: 'لابتوبات' },
    { id: 'monitors', name: 'شاشات' },
  ]},
  { id: 'software', name: 'برامج', icon: 'Code', subcategories: [
    { id: 'os', name: 'أنظمة تشغيل' },
    { id: 'antivirus', name: 'حماية' },
    { id: 'office', name: 'حزم مكتبية' },
  ]},
  { id: 'accessories', name: 'إكسسوارات', icon: 'Headphones', subcategories: [
    { id: 'keyboards', name: 'كيبوردات' },
    { id: 'mice', name: 'ماوس' },
    { id: 'headsets', name: 'سماعات' },
  ]},
  { id: 'consoles', name: 'أجهزة ألعاب', icon: 'Gamepad', subcategories: [
    { id: 'playstation', name: 'بلايستيشن' },
    { id: 'xbox', name: 'إكس بوكس' },
    { id: 'nintendo', name: 'نينتندو' },
  ]},
  { id: 'phones', name: 'هواتف', icon: 'Smartphone', subcategories: [
    { id: 'iphone', name: 'آيفون' },
    { id: 'samsung', name: 'سامسونج' },
    { id: 'google', name: 'جوجل' },
  ]},
]

const useCategoryStore = create((set, get) => ({
  categories: [],

  init: async () => {
    const snap = await getDoc(doc(db, 'config', 'meta'))
    if (!snap.exists() || !snap.data()?.categoriesSeeded) {
      await get().seedDefaults()
    }
  },

  subscribe: () => {
    const unsub = onSnapshot(doc(db, 'config', 'categories'), (snap) => {
      if (snap.exists()) {
        set({ categories: snap.data().list ?? [] })
      } else {
        set({ categories: [] })
      }
    })
    return unsub
  },

  seedDefaults: async () => {
    await setDoc(doc(db, 'config', 'categories'), { list: defaultCategories })
    await setDoc(doc(db, 'config', 'meta'), { categoriesSeeded: true }, { merge: true })
  },

  save: async (cats) => {
    await setDoc(doc(db, 'config', 'categories'), { list: cats })
    set({ categories: cats })
  },

  addCategory: (name, icon = 'Grid') => {
    const id = 'cat_' + Date.now()
    const updated = [...get().categories, { id, name, icon, subcategories: [] }]
    get().save(updated)
  },

  deleteCategory: (catId) => {
    const updated = get().categories.filter(c => c.id !== catId)
    get().save(updated)
  },

  updateCategory: (catId, data) => {
    const updated = get().categories.map(c => c.id === catId ? { ...c, ...data } : c)
    get().save(updated)
  },

  addSubcategory: (catId, name) => {
    const subId = 'sub_' + Date.now()
    const updated = get().categories.map(c => {
      if (c.id === catId) {
        return { ...c, subcategories: [...c.subcategories, { id: subId, name }] }
      }
      return c
    })
    get().save(updated)
  },

  deleteSubcategory: (catId, subId) => {
    const updated = get().categories.map(c => {
      if (c.id === catId) {
        return { ...c, subcategories: c.subcategories.filter(s => s.id !== subId) }
      }
      return c
    })
    get().save(updated)
  },

  updateSubcategory: (catId, subId, name) => {
    const updated = get().categories.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          subcategories: c.subcategories.map(s => s.id === subId ? { ...s, name } : s)
        }
      }
      return c
    })
    get().save(updated)
  },

  resetToDefault: async () => {
    await get().seedDefaults()
  },
}))

export default useCategoryStore
