import { motion } from 'framer-motion'
import { HiCode } from 'react-icons/hi'
import {
  HiShieldCheck,
  HiTruck,
  HiUserGroup,
  HiSparkles,
  HiGlobeAlt,
  HiArrowTrendingUp,
  HiCpuChip,
  HiWrench,
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const stats = [
  { value: '+50K', label: 'عميل سعيد' },
  { value: '+200', label: 'شريك تجاري' },
  { value: '+15K', label: 'منتج مباع' },
  { value: '99.9%', label: 'نسبة الرضا' },
]

const values = [
  {
    icon: HiShieldCheck,
    title: 'الجودة أولاً',
    description: 'كل منتج يخضع للاختبار والتحقق قبل أن يصلك. نتعامل فقط مع العلامات التجارية العالمية الموثوقة.',
  },
  {
    icon: HiArrowTrendingUp,
    title: 'الابتكار',
    description: 'نبقى في الطليعة، نقدم لك أحدث التقنيات فور وصولها إلى السوق.',
  },
  {
    icon: HiUserGroup,
    title: 'العميل أولاً',
    description: 'رضاك هو أولويتنا. فريق الدعم متاح على مدار الساعة لمساعدتك في أي شيء تحتاجه.',
  },
  {
    icon: HiGlobeAlt,
    title: 'انتشار عالمي',
    description: 'نشحن إلى جميع أنحاء العالم بسرعة فائقة. أينما كنت، دلتا زون معك.',
  },
]

const services = [
  {
    icon: HiCpuChip,
    title: 'هاردوير',
    desc: 'أجهزة كمبيوتر ولابتوبات وقطع وشاشات عالية الأداء من أفضل المصنعين.',
  },
  {
    icon: HiCode,
    title: 'برامج',
    desc: 'تراخيص برامج متميزة واشتراكات وحلول مؤسسية.',
  },
  {
    icon: HiWrench,
    title: 'صيانة',
    desc: 'صيانة أجهزة احترافية مع فنيين معتمدين وقطع غيار أصلية.',
  },
  {
    icon: HiSparkles,
    title: 'إكسسوارات',
    desc: 'كيبوردات وماوس وسماعات وكل ما تحتاجه للإعداد المثالي.',
  },
]

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest">
            من نحن
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 mb-6">
            مستقبل{' '}
            <span className="text-gradient">التكنولوجيا</span>
          </h1>
          <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            دلتا زون ليست مجرد متجر تقني. نحن مجتمع من المبتكرين والمبدعين
            وعشاق التكنولوجيا المكرسين لتقديم أفضل ما توصل إليه العالم من تقنية.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <span className="text-3xl lg:text-4xl font-bold text-gradient-blue">
                {stat.value}
              </span>
              <p className="text-xs text-gray-500 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold">
              <span className="text-gradient">قيمنا</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{value.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold">
              <span className="text-gradient">خدماتنا</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-glow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-brand/10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="/Screenshot_2026-04-12_184310-removebg-preview.png" alt="دلتا زون" className="w-10 h-10 object-contain" />
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">دلتا</span>
                  <span className="text-gradient">زون</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                هل أنت مستعد لتجربة التقنية الفاخرة؟ تصفح متجرنا أو تواصل مع فريقنا.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/shop">
                  <Button variant="gradient">تسوق الآن</Button>
                </Link>
                <Link to="/repair">
                  <Button variant="outline">صيانة جهاز</Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
