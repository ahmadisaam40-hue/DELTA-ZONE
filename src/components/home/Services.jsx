import { motion } from 'framer-motion'
import { HiCode } from 'react-icons/hi'
import { HiCpuChip, HiMusicalNote, HiTv, HiDevicePhoneMobile } from 'react-icons/hi2'
import Card from '../ui/Card'

const services = [
  {
    icon: HiCode,
    title: 'برامج',
    description: 'حلول برمجية متطورة من أنظمة تشغيل إلى حزم مكتبية وبرامج حماية.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: HiCpuChip,
    title: 'هاردوير',
    description: 'أجهزة كمبيوتر عالية الأداء، لابتوبات، شاشات، وقطع للمحترفين واللاعبين.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: HiMusicalNote,
    title: 'إكسسوارات',
    description: 'كيبوردات، ماوس، سماعات، وكل ما تحتاجه للإعداد المثالي.',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: HiTv,
    title: 'أجهزة ألعاب',
    description: 'أحدث أجهزة الألعاب بما فيها بلايستيشن، إكس بوكس، ونينتندو سويتش.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: HiDevicePhoneMobile,
    title: 'هواتف',
    description: 'أحدث الهواتف الرائدة من آبل، سامسونج، جوجل، وأفضل العلامات التجارية.',
    gradient: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-400',
  },
]

export default function Services() {
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
            خدماتنا
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            كل ما تحتاجه،{' '}
            <span className="text-gradient">في مكان واحد</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm lg:text-base">
            من الأجهزة المتطورة إلى البرامج الأساسية، نغطي كل جوانب حياتك الرقمية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center p-6 h-full" hover>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-4`}
                >
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
