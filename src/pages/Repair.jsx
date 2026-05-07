import { motion } from 'framer-motion'
import RepairForm from '../components/repair/RepairForm'
import OrderTracking from '../components/repair/OrderTracking'
import { HiWrench, HiShieldCheck, HiStar } from 'react-icons/hi2'
import { HiBadgeCheck } from 'react-icons/hi'

export default function Repair() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
              <HiWrench className="w-5 h-5 text-brand" />
            </div>
            <span className="text-xs font-semibold text-brand uppercase tracking-widest">
              الصيانة والخدمات
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">
            صيانة الأجهزة{' '}
            <span className="text-gradient">وتتبع الطلبات</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-lg">
            صيانة سريعة وموثوقة بواسطة فنيين معتمدين. تابع حالة طلبك مباشرة.
          </p>
        </motion.div>

        {/* Engineer Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mb-12 overflow-hidden rounded-2xl border border-brand/10 bg-gradient-to-br from-white/[0.02] to-transparent"
        >
          {/* background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] bg-brand/[0.04] rounded-full blur-[120px]" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-0">

            {/* Image side */}
            <div className="relative lg:w-2/5 w-full flex-shrink-0">
              <div className="relative overflow-hidden rounded-2xl lg:rounded-l-2xl lg:rounded-r-none">
                <img
                  src="/Gemini_Generated_Image_rkwkyprkwkyprkwk.png"
                  alt="المهندس برير الخفاجي"
                  className="w-full h-[380px] lg:h-[440px] object-cover object-top"
                />
                {/* overlay gradient on right edge to blend into card */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/80 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none lg:hidden" />
              </div>
              {/* experience badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-brand/30 rounded-full px-3 py-1.5">
                <HiStar className="w-3.5 h-3.5 text-brand" />
                <span className="text-xs font-semibold text-brand font-mono">9 سنوات خبرة</span>
              </div>
            </div>

            {/* Text side */}
            <div className="relative lg:w-3/5 w-full px-6 py-8 lg:px-10 lg:py-10">
              {/* certified badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand/20 bg-brand/5 rounded-full mb-5">
                <HiBadgeCheck className="w-4 h-4 text-brand" />
                <span className="text-xs text-brand font-medium tracking-wide">مهندس صيانة معتمد</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                المهندس برير الخفاجي
              </h2>
              <p className="text-brand text-sm font-mono mb-5 tracking-wide">
                متخصص iPhone &amp; Android
              </p>

              <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-8">
                مهندس صيانة هواتف محترف ذو خبرة 9 سنوات، متخصص في تشخيص وإصلاح أعطال أجهزة iPhone وAndroid بدقة عالية. يمتلك خبرة واسعة في التعامل مع أعقد المشاكل التقنية، ويحرص على إعادة جهاز الزبون بحالة ممتازة.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '+5K', label: 'جهاز مُصلح' },
                  { value: '9', label: 'سنوات خبرة' },
                  { value: '98%', label: 'رضا الزبائن' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] border border-brand/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold font-mono text-brand">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['iPhone', 'Android', 'شاشات', 'بطاريات', 'لوحات أم', 'برمجة'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1">
                    <HiShieldCheck className="w-3 h-3 text-brand" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RepairForm />
          <OrderTracking />
        </div>
      </div>
    </div>
  )
}
