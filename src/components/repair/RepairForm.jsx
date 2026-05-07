import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiDesktopComputer } from 'react-icons/hi'
import { HiDevicePhoneMobile, HiTv, HiCheckCircle } from 'react-icons/hi2'
import Button from '../ui/Button'
import useRepairStore from '../../store/useRepairStore'

const deviceTypes = [
  { id: 'phone', icon: HiDevicePhoneMobile, label: 'هاتف' },
  { id: 'laptop', icon: HiDesktopComputer, label: 'لابتوب / كمبيوتر' },
  { id: 'console', icon: HiTv, label: 'جهاز ألعاب' },
  { id: 'tablet', icon: HiDevicePhoneMobile, label: 'تابلت' },
  { id: 'other', icon: HiDesktopComputer, label: 'جهاز آخر' },
]

export default function RepairForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    deviceType: '',
    problem: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState('')
  const submitRepair = useRepairStore((s) => s.submitRepair)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'الاسم مطلوب'
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    if (!form.deviceType) errs.deviceType = 'اختر نوع الجهاز'
    if (!form.problem.trim()) errs.problem = 'صف المشكلة'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const id = await submitRepair(form)
      setOrderId(id)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setForm({ name: '', phone: '', deviceType: '', problem: '' })
    setErrors({})
    setSubmitted(false)
    setOrderId('')
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center max-w-lg mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-6">
          <HiCheckCircle className="w-8 h-8 text-brand" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">تم استلام طلب الصيانة!</h3>
        <p className="text-gray-400 text-sm mb-4">
          رقم طلب الصيانة الخاص بك هو:
        </p>
        <div className="inline-block px-6 py-3 rounded-xl bg-glass border border-brand/30 mb-6">
          <span className="text-lg font-bold text-gradient" style={{ fontFamily: 'monospace' }}>{orderId}</span>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          احتفظ بهذا الرقم لتتبع حالة الصيانة. سنتواصل معك خلال 24 ساعة.
        </p>
        <Button variant="outline" onClick={reset}>
          تقديم طلب آخر
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 lg:p-8 space-y-6"
    >
      <h2 className="text-xl font-bold text-white">تقديم طلب صيانة</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="محمد أحمد"
          className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand/50 transition-all ${
            errors.name ? 'border-red-500/50' : 'border-glass-border'
          }`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+966 5XX XXX XXX"
          className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand/50 transition-all ${
            errors.phone ? 'border-red-500/50' : 'border-glass-border'
          }`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">نوع الجهاز</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {deviceTypes.map((dt) => (
            <button
              key={dt.id}
              type="button"
              onClick={() => setForm({ ...form, deviceType: dt.id })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs ${
                form.deviceType === dt.id
                  ? 'border-brand/50 bg-brand/10 text-brand'
                  : 'border-glass-border bg-glass text-gray-400 hover:border-white/20'
              }`}
            >
              <dt.icon className="w-5 h-5" />
              {dt.label}
            </button>
          ))}
        </div>
        {errors.deviceType && <p className="text-red-400 text-xs mt-1">{errors.deviceType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">وصف المشكلة</label>
        <textarea
          value={form.problem}
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
          placeholder="اشرح المشكلة التي تواجهها مع جهازك..."
          rows={4}
          className={`w-full px-4 py-3 rounded-xl bg-glass border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand/50 transition-all resize-none ${
            errors.problem ? 'border-red-500/50' : 'border-glass-border'
          }`}
        />
        {errors.problem && <p className="text-red-400 text-xs mt-1">{errors.problem}</p>}
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'جاري الإرسال...' : 'إرسال طلب الصيانة'}
      </Button>
    </motion.form>
  )
}
