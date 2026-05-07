import { create } from 'zustand'
import { collection, addDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'repairs'

const useRepairStore = create((set) => ({
  repairs: [],
  orders: [],

  subscribe: () => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snap) => {
      const orders = snap.docs.map(d => ({ ...d.data(), docId: d.id }))
      set({ orders, repairs: orders })
    })
    return unsub
  },

  submitRepair: async (repair) => {
    const newRepair = {
      ...repair,
      id: `DZ-${Date.now()}`,
      status: 'قيد الانتظار',
      date: new Date().toISOString().split('T')[0],
    }
    await addDoc(collection(db, COLLECTION), newRepair)
    return newRepair.id
  },

  trackOrder: (orderId) => {
    const state = useRepairStore.getState()
    return state.orders.find((o) => o.id === orderId) || null
  },

  updateOrderStatus: async (docId, status) => {
    await updateDoc(doc(db, COLLECTION, docId), { status })
  },
}))

export default useRepairStore
