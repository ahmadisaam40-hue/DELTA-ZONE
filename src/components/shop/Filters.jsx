import { motion } from 'framer-motion'
import { HiOutlineViewGrid, HiCode } from 'react-icons/hi'
import { HiCpuChip, HiMusicalNote, HiTv, HiDevicePhoneMobile } from 'react-icons/hi2'
import useCategoryStore from '../../store/useCategoryStore'

const iconMap = {
  Cpu: HiCpuChip,
  Code: HiCode,
  Headphones: HiMusicalNote,
  Gamepad: HiTv,
  Smartphone: HiDevicePhoneMobile,
  Grid: HiOutlineViewGrid,
}

function CatIcon({ name }) {
  const Icon = iconMap[name] || HiOutlineViewGrid
  return <Icon className="w-4 h-4" />
}

export default function Filters({ selected, onSelect, sortBy, onSortChange }) {
  const storeCategories = useCategoryStore((s) => s.categories)

  const categories = [
    { id: 'all', name: 'الكل', icon: 'Grid' },
    ...storeCategories.map((c) => ({ id: c.id, name: c.name, icon: c.icon || 'Grid' })),
  ]

  const sortOptions = [
    { value: 'default', label: 'الافتراضي' },
    { value: 'price-asc', label: 'السعر: من الأقل إلى الأعلى' },
    { value: 'price-desc', label: 'السعر: من الأعلى إلى الأقل' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'newest', label: 'الأحدث' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">الفئات</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                selected === cat.id
                  ? 'bg-brand/10 border border-brand/30 text-brand'
                  : 'text-gray-400 hover:text-white hover:bg-glass'
              }`}
            >
              <CatIcon name={cat.icon} />
              {cat.name}
              {selected === cat.id && (
                <motion.div
                  layoutId="active-cat"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <h3 className="text-sm font-semibold text-white mb-3">ترتيب حسب</h3>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSortChange(opt.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                sortBy === opt.value
                  ? 'bg-brand/10 border border-brand/30 text-brand'
                  : 'text-gray-400 hover:text-white hover:bg-glass'
              }`}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
