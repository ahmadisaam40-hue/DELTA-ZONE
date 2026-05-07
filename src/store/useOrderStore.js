import { create } from 'zustand'
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'orders'

const useOrderStore = create((set) => ({
  orders: [],

  subscribe: () => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snap) => {
      const orders = snap.docs.map(d => ({ ...d.data(), docId: d.id }))
      orders.sort((a, b) => new Date(b.date) - new Date(a.date))
      set({ orders })
    })
    return unsub
  },

  submitOrder: async (items, total, customer = {}) => {
    const orderId = `ORD-${Date.now()}`
    await addDoc(collection(db, COLLECTION), {
      id: orderId,
      items,
      total,
      customer,
      status: 'جديد',
      date: new Date().toISOString(),
    })
    return orderId
  },

  updateOrderStatus: async (docId, status) => {
    await updateDoc(doc(db, COLLECTION, docId), { status })
  },
}))

export default useOrderStore
