import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { HiWrench } from 'react-icons/hi2'
import Button from '../ui/Button'

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/20 rounded-full blur-[80px]" />

          <div className="glass-strong rounded-3xl p-8 lg:p-16 relative z-10 card-sweep">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                هل أنت مستعد{' '}
                <span className="text-gradient">للارتقاء</span> بتجربتك التقنية؟
              </h2>
              <p className="text-gray-400 text-sm lg:text-base mb-8 max-w-md mx-auto">
                انضم إلى آلاف العملاء السعداء. تسوق أحدث التقنيات أو احصل على صيانة احترافية لجهازك.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/shop">
                  <Button variant="gradient" size="lg">
                    تصفح المتجر
                    <HiArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/repair">
                  <Button variant="outline" size="lg">
                    <HiWrench className="w-4 h-4" />
                    طلب صيانة
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
