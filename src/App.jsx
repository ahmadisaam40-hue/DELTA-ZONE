import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import ProtectedAdminRoute from './components/layout/ProtectedAdminRoute'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Repair from './pages/Repair'
import Cart from './pages/Cart'
import About from './pages/About'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import useProductStore from './store/useProductStore'
import useCategoryStore from './store/useCategoryStore'
import useRepairStore from './store/useRepairStore'
import useOrderStore from './store/useOrderStore'

export default function App() {
  const initProducts = useProductStore((s) => s.init)
  const subscribeProducts = useProductStore((s) => s.subscribe)
  const initCategories = useCategoryStore((s) => s.init)
  const subscribeCategories = useCategoryStore((s) => s.subscribe)
  const subscribeRepairs = useRepairStore((s) => s.subscribe)
  const subscribeOrders = useOrderStore((s) => s.subscribe)

  useEffect(() => {
    initProducts()
    initCategories()
    const unsubP = subscribeProducts()
    const unsubC = subscribeCategories()
    const unsubR = subscribeRepairs()
    const unsubO = subscribeOrders()
    return () => { unsubP(); unsubC(); unsubR(); unsubO() }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/repair" element={<Layout><Repair /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Layout><Admin /></Layout>
          </ProtectedAdminRoute>
        } />
      </Routes>
    </AnimatePresence>
  )
}
