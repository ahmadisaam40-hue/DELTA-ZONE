import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi'
import { HiShieldCheck } from 'react-icons/hi2'
import useAdminStore from '../store/useAdminStore'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAdminStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = login(username, password)
      if (ok) {
        navigate('/admin')
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyan opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* card */}
        <div className="bg-white/[0.02] border border-brand/10 rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_60px_rgba(0,234,255,0.04)]">

          {/* logo + title */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl" />
              <img
                src="/Screenshot_2026-04-12_184310-removebg-preview.png"
                alt="Delta Zone"
                className="relative w-16 h-16 object-contain drop-shadow-[0_0_16px_rgba(0,234,255,0.6)]"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand/20 bg-brand/5 rounded-full mb-3">
              <HiShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span className="text-xs text-brand font-medium tracking-wide">لوحة التحكم</span>
            </div>
            <h1 className="text-2xl font-bold text-white">تسجيل دخول الإدارة</h1>
            <p className="text-gray-500 text-xs mt-1">أدخل بياناتك للوصول إلى لوحة التحكم</p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* username */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">اسم المستخدم</label>
              <div className="relative">
                <HiUser className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">كلمة المرور</label>
              <div className="relative">
                <HiLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pr-10 pl-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/40 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-xs text-red-400"
              >
                <span>⚠</span> {error}
              </motion.div>
            )}

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-sm text-black bg-brand hover:bg-brand/90 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(0,234,255,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  جاري التحقق...
                </span>
              ) : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
