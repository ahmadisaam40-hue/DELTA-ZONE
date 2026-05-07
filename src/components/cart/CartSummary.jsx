import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiTag } from 'react-icons/hi'
import Button from '../ui/Button'
import useCartStore from '../../store/useCartStore'
import useOrderStore from '../../store/useOrderStore'

export default function CartSummary() {
  const items = useCartStore((s) => s.items)
  const [step, setStep] = useState('summary') // 'summary' | 'info' | 'done'
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const submitOrder = useOrderStore((s) => s.submitOrder)

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginal = items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)
  const savings = totalOriginal - totalPrice
  const tax = totalPrice * 0.08
  const total = totalPrice + tax

  const validateInfo = () => {
    const e = {}
    if (!customer.name.trim()) e.name = 'الاسم مطلوب'
    if (!customer.phone.trim()) e.phone = 'رقم الهاتف مطلوب'
    if (!customer.address.trim()) e.address = 'العنوان مطلوب'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCheckout = async () => {
    if (!validateInfo()) return
    setSubmitting(true)
    try {
      const id = await submitOrder(
        items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image || '' })),
        parseFloat(total.toFixed(2)),
        customer
      )
      setOrderId(id)
      setStep('done')
      useCartStore.getState().clearCart()
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && step === 'summary') return null

  if (step === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-6">
          <HiCheckCircle className="w-8 h-8 text-brand" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">تم تأكيد الطلب!</h3>
        <p className="text-gray-400 text-sm mb-3">
          شكراً <span className="text-white font-semibold">{customer.name}</span> على الشراء. سيتم التواصل معك على <span className="text-white">{customer.phone}</span>.
        </p>
        {orderId && (
          <div className="inline-block px-5 py-2 rounded-xl bg-glass border border-brand/30 mb-6">
            <span className="text-sm font-bold text-brand" style={{ fontFamily: 'monospace' }}>{orderId}</span>
          </div>
        )}
        <Button variant="outline" onClick={() => { setStep('summary'); setCustomer({ name: '', phone: '', address: '' }) }}>
          متابعة التسوق
        </Button>
      </motion.div>
    )
  }

  if (step === 'info') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 lg:p-8 space-y-5"
      >
        <div className="flex items-center gap-3">
          <button onClick={() => setStep('summary')} className="p-1.5 rounded-lg hover:bg-glass text-gray-400 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <h3 className="text-lg font-bold text-white">بيانات التوصيل</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">الاسم الكامل *</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer(p => ({ ...p, name: e.target.value }))}
              placeholder="أدخل اسمك الكامل"
              className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${errors.name ? 'border-red-500/50' : 'border-glass-border focus:border-brand/50'}`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">رقم الهاتف *</label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer(p => ({ ...p, phone: e.target.value }))}
              placeholder="05XXXXXXXX"
              className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${errors.phone ? 'border-red-500/50' : 'border-glass-border focus:border-brand/50'}`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">العنوان *</label>
            <textarea
              value={customer.address}
              onChange={(e) => setCustomer(p => ({ ...p, address: e.target.value }))}
              placeholder="المدينة، الحي، الشارع..."
              rows={2}
              className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none transition-all resize-none ${errors.address ? 'border-red-500/50' : 'border-glass-border focus:border-brand/50'}`}
            />
            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
          </div>
        </div>

        <div className="border-t border-glass-border pt-3 flex justify-between text-base">
          <span className="font-semibold text-white">الإجمالي</span>
          <span className="font-bold text-white">${total.toFixed(2)}</span>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleCheckout}
          disabled={submitting}
        >
          {submitting ? 'جاري التأكيد...' : 'تأكيد الطلب'}
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="glass-card p-6 lg:p-8 space-y-5">
      <h3 className="text-lg font-bold text-white">ملخص الطلب</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>المجموع ({items.reduce((s, i) => s + i.quantity, 0)} منتجات)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-brand">
            <span className="flex items-center gap-1">
              <HiTag className="w-3.5 h-3.5" />
              التوفير
            </span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-400">
          <span>الضريبة (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>الشحن</span>
          <span className="text-brand">مجاني</span>
        </div>
        <div className="border-t border-glass-border pt-3 flex justify-between text-base">
          <span className="font-semibold text-white">الإجمالي</span>
          <span className="font-bold text-white">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        onClick={() => setStep('info')}
      >
        إتمام الشراء
      </Button>

      <p className="text-center text-xs text-gray-600">
        دفع آمن عبر سترايب
      </p>
    </div>
  )
}
