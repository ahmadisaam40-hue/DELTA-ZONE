import { motion } from 'framer-motion'
import {
  HiShieldCheck,
  HiTruck,
  HiCurrencyDollar,
  HiUserGroup,
  HiSparkles,
  HiClock,
} from 'react-icons/hi2'

const reasons = [
  {
    icon: HiShieldCheck,
    title: 'جودة عالية',
    description: 'كل منتج يخضع لاختبارات جودة صارمة قبل أن يصل إليك.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: HiTruck,
    title: 'توصيل سريع',
    description: 'شحن سريع ومجاني للطلبات فوق 500$. توصيل في نفس اليوم.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: HiCurrencyDollar,
    title: 'أفضل الأسعار',
    description: 'ضمان مطابقة الأسعار — سنتغلب على أي منافس بنسبة 5%.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: HiUserGroup,
    title: 'دعم خبير',
    description: 'فريقنا التقني متاح على مدار الساعة لمساعدتك في أي مشكلة.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: HiSparkles,
    title: 'أحدث التقنيات',
    description: 'نوفر أحدث الإصدارات من جميع العلامات التجارية يوم الإطلاق.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: HiClock,
    title: 'ضمان شامل',
    description: 'ضمان ممتد لمدة سنتين على جميع المنتجات مع استرجاع سهل.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest">
            لماذا دلتا زون
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            ما الذي{' '}
            <span className="text-gradient">يميزنا</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm lg:text-base">
            نحن لا نبيع التكنولوجيا فحسب — بل نصنع تجارب تدوم.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 group card-sweep">
                <div className={`w-12 h-12 rounded-xl ${reason.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
