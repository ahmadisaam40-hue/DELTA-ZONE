import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiExclamation } from 'react-icons/hi'
import { HiClock, HiCog, HiCheckCircle, HiWrenchScrewdriver } from 'react-icons/hi2'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Button from '../ui/Button'
import useRepairStore from '../../store/useRepairStore'

const REPAIRPRO_API = 'http://localhost:3210'

// Map RepairPro statuses to Arabic
const rpStatusMap = {
  'new':        'تم الاستلام',
  'pending':    'تم الاستلام',
  'in_progress':'قيد الصيانة',
  'waiting':    'قيد الصيانة',
  'ready':      'جاهز للتسليم',
  'done':       'جاهز للتسليم',
  'completed':  'مكتمل',
  'delivered':  'مكتمل',
}

function mapRPStatus(s) {
  if (!s) return 'قيد الانتظار'
  return rpStatusMap[s.toLowerCase()] || s
}

const statusConfig = {
  'تم الاستلام': {
    icon: HiClock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    progress: 33,
  },
  'قيد الصيانة': {
    icon: HiCog,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    progress: 66,
  },
  'جاهز للتسليم': {
    icon: HiWrenchScrewdriver,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    progress: 100,
  },
  'مكتمل': {
    icon: HiCheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    progress: 100,
  },
}

function cleanNotes(text) {
  if (!text) return ''
  return text.replace(/\s*\[Delta Zone: Synced\]/g, '').trim()
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState('') // 'firebase' | 'repairpro'
  const trackOrder = useRepairStore((s) => s.trackOrder)

  const handleTrack = async () => {
    setError('')
    setResult(null)
    setSource('')

    const trimmed = orderId.trim()
    if (!trimmed) {
      setError('الرجاء إدخال رقم الطلب')
      return
    }

    setLoading(true)
    try {
      // 1. Search Firebase (Delta Zone orders)
      const fbOrder = trackOrder(trimmed)
      if (fbOrder) {
        setResult(fbOrder)
        setSource('firebase')
        setLoading(false)
        return
      }

      // 2. Search RepairPro tickets synced to Firebase (tickets_public)
      try {
        const ticketDoc = await getDoc(doc(db, 'tickets_public', trimmed))
        if (ticketDoc.exists()) {
          const t = ticketDoc.data()
          setResult({
            id: t.ticket_code,
            device: t.device_summary || `${t.device_brand || ''} ${t.device_model || ''}`.trim() || '—',
            status: mapRPStatus(t.status),
            problem: t.issue_description || '',
            techNotes: cleanNotes(t.last_update_note || ''),
            techReport: t.tech_report || null,
            attachmentUrls: (t.tech_report && t.tech_report.images) || [],
            parts: t.parts || [],
            expectedDate: t.promised_at || '',
            _raw: t,
          })
          setSource('repairpro')
          setLoading(false)
          return
        }
      } catch (_) {
        // Firebase lookup failed - fall through to local API
      }

      // 3. Search RepairPro local API (fallback when not synced to Firebase yet)
      try {
        const res = await fetch(`${REPAIRPRO_API}/public/tickets/lookup?code=${encodeURIComponent(trimmed)}`)
        if (res.ok) {
          const data = await res.json()
          if (data.ok && data.ticket) {
            const t = data.ticket
            setResult({
              id: t.code || t.displayNumber,
              device: t.deviceModel || '—',
              status: mapRPStatus(t.status),
              problem: t.publicNotes || '',
              techNotes: cleanNotes(t.techNotes || ''),
              techReport: t.techReport || null,
              attachmentUrls: t.attachmentUrls || [],
              parts: t.parts || [],
              expectedDate: t.expectedDate || '',
              _raw: t,
            })
            setSource('repairpro')
            setLoading(false)
            return
          }
        }
      } catch (_) {
        // RepairPro not running or not reachable — silent fail
      }

      setError('لم يتم العثور على الطلب. تأكد من رقم الطلب.')
    } finally {
      setLoading(false)
    }
  }

  const StatusIcon = result ? statusConfig[result.status]?.icon : null

  return (
    <div className="glass-card p-6 lg:p-8 space-y-6">
      <h2 className="text-xl font-bold text-white">تتبع طلبك</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">رقم الطلب</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            placeholder="مثال: DZ-2024-001"
            className="flex-1 px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand/50 transition-all"
          />
          <Button variant="gradient" onClick={handleTrack} disabled={loading}>
            <HiSearch className="w-4 h-4" />
            {loading ? 'بحث...' : 'تتبع'}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            <HiExclamation className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${statusConfig[result.status].bg} ${statusConfig[result.status].border} border flex items-center justify-center`}>
                <StatusIcon className={`w-7 h-7 ${statusConfig[result.status].color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">طلب {result.id}</p>
                  {source === 'repairpro' && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-semibold">
                      <HiWrenchScrewdriver className="w-3 h-3" />
                      RepairPro
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-white">{result.device}</p>
                {result.expectedDate && (
                  <p className="text-xs text-gray-500 mt-0.5">موعد التسليم: {new Date(result.expectedDate).toLocaleDateString('ar-SA')}</p>
                )}
              </div>
              <div className="mr-auto">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${statusConfig[result.status].border} ${statusConfig[result.status].bg} ${statusConfig[result.status].color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {result.status}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">التقدم</span>
                <span className="text-xs text-gray-400">{statusConfig[result.status].progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-glass-strong overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${statusConfig[result.status].progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    result.status === 'جاهز للتسليم' || result.status === 'مكتمل'
                      ? 'bg-gradient-to-r from-orange-500 to-green-400'
                      : result.status === 'قيد الصيانة'
                      ? 'bg-gradient-to-r from-brand to-blue-400'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {['تم الاستلام', 'قيد الصيانة', 'جاهز للتسليم'].map((status, i) => {
                const config = statusConfig[status]
                const Icon = config.icon
                const isActive = result.status === status
                const order = ['تم الاستلام', 'قيد الصيانة', 'جاهز للتسليم', 'مكتمل']
                const isPast = order.indexOf(result.status) > order.indexOf(status)

                return (
                  <div key={status} className="text-center">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all ${
                        isActive
                          ? `${config.bg} ${config.border} border`
                          : isPast
                          ? 'bg-brand/10 border border-brand/20'
                          : 'bg-glass-strong'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? config.color : isPast ? 'text-brand' : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${isActive || isPast ? 'text-white' : 'text-gray-600'}`}>
                      {status}
                    </span>
                  </div>
                )
              })}
            </div>

                {(result.problem || result.techNotes !== undefined || (result.parts && result.parts.length > 0)) && (
                  <div className="mt-6 space-y-3">
                    {result.problem && (
                      <div className="rounded-xl bg-glass p-4 border border-glass-border">
                        <p className="text-xs font-semibold text-gray-400 mb-1">⚠️ المشكلة / العطل</p>
                        <p className="text-sm text-white">{result.problem}</p>
                      </div>
                    )}

                    {result.parts && result.parts.length > 0 && (
                      <div className="rounded-xl bg-glass p-4 border border-glass-border">
                        <p className="text-xs font-semibold text-gray-400 mb-2">🔧 القطع والخدمات</p>
                        <div className="space-y-1.5">
                          {result.parts.map((p, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-white">{p.name}</span>
                              <span className="text-gray-400 text-xs">x{p.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="rounded-xl bg-glass p-4 border border-glass-border">
                      <p className="text-xs font-semibold text-gray-400 mb-3">📋 تقرير الفني المتخصص</p>
                      {result.techReport ? (
                        <div className="space-y-3">
                          {result.techReport.diagnosis && (
                            <div>
                              <p className="text-[11px] text-gray-500 mb-0.5">التشخيص الفني</p>
                              <p className="text-sm text-white">{result.techReport.diagnosis}</p>
                            </div>
                          )}
                          {result.techReport.report_text && (
                            <div>
                              <p className="text-[11px] text-gray-500 mb-0.5">ملاحظات التقرير</p>
                              <p className="text-sm text-white">{result.techReport.report_text}</p>
                            </div>
                          )}
                          {result.techReport.actions_taken && (
                            <div>
                              <p className="text-[11px] text-gray-500 mb-0.5">الإجراءات المتخذة</p>
                              <p className="text-sm text-white">{result.techReport.actions_taken}</p>
                            </div>
                          )}
                          {result.techReport.recommendations && (
                            <div>
                              <p className="text-[11px] text-gray-500 mb-0.5">التوصيات</p>
                              <p className="text-sm text-white">{result.techReport.recommendations}</p>
                            </div>
                          )}
                          {result.attachmentUrls && result.attachmentUrls.length > 0 && (
                            <div>
                              <p className="text-[11px] text-gray-500 mb-2">صور التقرير</p>
                              <div className="grid grid-cols-2 gap-2">
                                {result.attachmentUrls.map((url, i) => (
                                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={url}
                                      alt={`صورة ${i + 1}`}
                                      className="w-full rounded-lg object-cover aspect-video bg-glass-strong border border-glass-border hover:opacity-80 transition-opacity"
                                    />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">لم يتم إضافة تقرير بعد</p>
                      )}
                    </div>
                  </div>
                )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-4 border-t border-glass-border">
        <p className="text-xs text-gray-500">
          يمكنك تتبع طلبات الصيانة المقدمة من هذا الموقع، أو تذاكر RepairPro باستخدام رمز التذكرة (مثال: RP-XXXX).
        </p>
      </div>
    </div>
  )
}
