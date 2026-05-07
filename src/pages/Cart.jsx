import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiShoppingBag, HiArrowRight } from 'react-icons/hi'
import useCartStore from '../store/useCartStore'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/ui/Button'

export default function Cart() {
  const items = useCartStore((s) => s.items)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest">
            السلة
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            سلة{' '}
            <span className="text-gradient">التسوق</span>
          </h1>
          <p className="text-gray-400 text-sm">
            {items.length > 0
              ? `${items.reduce((s, i) => s + i.quantity, 0)} منتج في سلتك`
              : 'سلتك فارغة'}
          </p>
        </motion.div>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-4"
              >
                <HiArrowRight className="w-4 h-4" />
                متابعة التسوق
              </Link>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <CartSummary />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-glass flex items-center justify-center mx-auto mb-6">
              <HiShoppingBag className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">سلتك فارغة</h3>
            <p className="text-gray-500 text-sm mb-6">
              لم تقم بإضافة أي منتجات بعد.
            </p>
            <Link to="/shop">
              <Button variant="gradient" size="lg">
                ابدأ التسوق
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
