import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiPlus, HiTrash, HiPencil, HiChevronDown, HiChevronRight, HiCode,
} from 'react-icons/hi'
import {
  HiExclamationTriangle, HiCpuChip, HiDevicePhoneMobile, HiTv, HiMusicalNote,
} from 'react-icons/hi2'
import { HiTag, HiPhotograph } from 'react-icons/hi'
import useCategoryStore from '../store/useCategoryStore'
import useProductStore from '../store/useProductStore'
import useRepairStore from '../store/useRepairStore'
import useOrderStore from '../store/useOrderStore'

const iconOptions = [
  { id: 'Cpu', icon: HiCpuChip, label: 'هاردوير' },
  { id: 'Code', icon: HiCode, label: 'برامج' },
  { id: 'Headphones', icon: HiMusicalNote, label: 'إكسسوارات' },
  { id: 'Gamepad', icon: HiTv, label: 'ألعاب' },
  { id: 'Smartphone', icon: HiDevicePhoneMobile, label: 'هواتف' },
  { id: 'Grid', icon: HiCpuChip, label: 'عام' },
]

export default function Admin() {
  const [tab, setTab] = useState('categories')
  const {
    categories, addCategory, deleteCategory, updateCategory,
    addSubcategory, deleteSubcategory, updateSubcategory, resetToDefault,
  } = useCategoryStore()
  const {
    products, addProduct, updateProduct, deleteProduct, resetToDefault: resetProducts,
  } = useProductStore()
  const { orders: repairOrders, updateOrderStatus: updateRepairStatus } = useRepairStore()
  const { orders: shopOrders, updateOrderStatus: updateShopStatus } = useOrderStore()

  const [expandedCat, setExpandedCat] = useState(null)
  const [newCatName, setNewCatName] = useState('')
  const [newCatIcon, setNewCatIcon] = useState('Grid')
  const [newSubName, setNewSubName] = useState({})
  const [editCatId, setEditCatId] = useState(null)
  const [editCatName, setEditCatName] = useState('')
  const [editSubId, setEditSubId] = useState(null)
  const [editSubName, setEditSubName] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [newProduct, setNewProduct] = useState({ name: '', category: 'hardware', price: '', originalPrice: '', image: '', description: '', badge: '', inStock: true, isFeatured: false })
  const [editProductId, setEditProductId] = useState(null)
  const [editProductData, setEditProductData] = useState({})

  const handleAddCat = () => {
    if (!newCatName.trim()) return
    addCategory(newCatName.trim(), newCatIcon)
    setNewCatName('')
    setNewCatIcon('Grid')
  }

  const handleAddSub = (catId) => {
    const name = newSubName[catId]?.trim()
    if (!name) return
    addSubcategory(catId, name)
    setNewSubName(prev => ({ ...prev, [catId]: '' }))
  }

  const handleEditCat = (catId) => {
    updateCategory(catId, { name: editCatName })
    setEditCatId(null)
  }

  const handleEditSub = (catId, subId) => {
    updateSubcategory(catId, subId, editSubName)
    setEditSubId(null)
  }

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price) return
    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price),
      features: [],
    })
    setNewProduct({ name: '', category: 'hardware', price: '', originalPrice: '', image: '', description: '', badge: '', inStock: true, isFeatured: false })
  }

  const handleEditProduct = (id) => {
    const p = products.find(p => p.id === id)
    if (!p) return
    setEditProductId(id)
    setEditProductData({ name: p.name, category: p.category, price: String(p.price), originalPrice: String(p.originalPrice || ''), image: p.image || '', description: p.description || '', badge: p.badge || '', inStock: p.inStock, isFeatured: p.isFeatured })
  }

  const handleSaveEdit = () => {
    updateProduct(editProductId, {
      ...editProductData,
      price: Number(editProductData.price),
      originalPrice: Number(editProductData.originalPrice) || Number(editProductData.price),
    })
    setEditProductId(null)
  }

  const handleExport = () => {
    const cats = useCategoryStore.getState().categories
    const prods = useProductStore.getState().products
    const data = { categories: cats, products: prods }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'delta_data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (data.categories) {
          await useCategoryStore.getState().save(data.categories)
        }
        if (data.products) {
          for (const p of data.products) {
            await useProductStore.getState().addProduct(p)
          }
        }
        alert('تم الاستيراد بنجاح')
      } catch (err) {
        alert('ملف JSON غير صالح')
      }
    }
    reader.readAsText(file)
  }

  const getIcon = (iconName) => {
    const found = iconOptions.find(o => o.id === iconName)
    if (found) return <found.icon className="w-5 h-5" />
    return <HiCpuChip className="w-5 h-5" />
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
            لوحة التحكم
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            إدارة <span className="text-gradient">الفئات</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            إضافة، حذف، وتعديل الفئات الرئيسية والفئات الفرعية والمنتجات.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <button onClick={() => setTab('categories')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'categories' ? 'bg-primary-500/10 border border-primary-500/30 text-primary-400' : 'glass text-gray-400 hover:text-white'}`}>الفئات</button>
            <button onClick={() => setTab('products')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'products' ? 'bg-primary-500/10 border border-primary-500/30 text-primary-400' : 'glass text-gray-400 hover:text-white'}`}>المنتجات</button>
            <button onClick={() => setTab('repairs')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'repairs' ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400' : 'glass text-gray-400 hover:text-white'}`}>
              طلبات الصيانة {repairOrders.length > 0 && <span className="mr-1 px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px]">{repairOrders.length}</span>}
            </button>
            <button onClick={() => setTab('orders')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'orders' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'glass text-gray-400 hover:text-white'}`}>
              طلبات المتجر {shopOrders.length > 0 && <span className="mr-1 px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px]">{shopOrders.length}</span>}
            </button>
            <button onClick={handleExport} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent-500/10 border border-accent-500/20 text-accent-400 hover:bg-accent-500/20 transition-all mr-auto">📤 تصدير</button>
            <label className="px-5 py-2.5 rounded-xl text-sm font-semibold glass text-gray-400 hover:text-white transition-all cursor-pointer">📥 استيراد
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </motion.div>

        {tab === 'categories' && (
        <>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <HiPlus className="w-5 h-5 text-primary-400" />
              إضافة فئة رئيسية جديدة
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCat()}
                placeholder="اسم الفئة الجديدة..."
                className="flex-1 px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
              />
              <select
                value={newCatIcon}
                onChange={(e) => setNewCatIcon(e.target.value)}
                className="px-3 py-3 rounded-xl bg-glass border border-glass-border text-white text-sm focus:outline-none"
              >
                {iconOptions.map(o => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={handleAddCat}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm flex items-center gap-2 hover:shadow-glow transition-all"
              >
                <HiPlus className="w-4 h-4" />
                إضافة
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setDeleteConfirm('reset')}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
            >
              إعادة ضبط الفئات للافتراضي
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div
                  className="p-4 flex items-center gap-3 cursor-pointer hover:bg-glass-strong transition-colors"
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                    {getIcon(cat.icon)}
                  </div>

                  {editCatId === cat.id ? (
                    <div className="flex-1 flex gap-2" onClick={e => e.stopPropagation()}>
                      <input
                        autoFocus
                        value={editCatName}
                        onChange={(e) => setEditCatName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditCat(cat.id)}
                        className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-white text-sm focus:outline-none focus:border-primary-500/50"
                      />
                      <button onClick={() => handleEditCat(cat.id)} className="px-3 py-2 rounded-lg bg-primary-500 text-white text-xs font-semibold">حفظ</button>
                      <button onClick={() => setEditCatId(null)} className="px-3 py-2 rounded-lg bg-glass text-gray-400 text-xs">إلغاء</button>
                    </div>
                  ) : (
                    <span className="flex-1 text-white font-semibold text-sm">{cat.name}</span>
                  )}

                  <span className="text-xs text-gray-500">{cat.subcategories.length} فئة فرعية</span>

                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => { setEditCatId(cat.id); setEditCatName(cat.name) }}
                      className="p-2 rounded-lg hover:bg-glass-strong text-gray-400 hover:text-white transition-colors"
                    >
                      <HiPencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(cat.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                    <motion.div
                      animate={{ rotate: expandedCat === cat.id ? 180 : 0 }}
                      className="p-2 text-gray-500"
                    >
                      <HiChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCat === cat.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-glass-border">
                        <div className="pt-4 space-y-2">
                          {cat.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-glass transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                              {editSubId === sub.id ? (
                                <div className="flex-1 flex gap-2">
                                  <input
                                    autoFocus
                                    value={editSubName}
                                    onChange={(e) => setEditSubName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleEditSub(cat.id, sub.id)}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-white text-sm focus:outline-none"
                                  />
                                  <button onClick={() => handleEditSub(cat.id, sub.id)} className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold">حفظ</button>
                                  <button onClick={() => setEditSubId(null)} className="px-3 py-1.5 rounded-lg bg-glass text-gray-400 text-xs">إلغاء</button>
                                </div>
                              ) : (
                                <>
                                  <span className="flex-1 text-gray-300 text-sm">{sub.name}</span>
                                  <button
                                    onClick={() => { setEditSubId(sub.id); setEditSubName(sub.name) }}
                                    className="p-1.5 rounded-lg hover:bg-glass-strong text-gray-500 hover:text-white transition-colors"
                                  >
                                    <HiPencil className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteSubcategory(cat.id, sub.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                                  >
                                    <HiTrash className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                          <input
                            type="text"
                            value={newSubName[cat.id] || ''}
                            onChange={(e) => setNewSubName(prev => ({ ...prev, [cat.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSub(cat.id)}
                            placeholder="فئة فرعية جديدة..."
                            className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-white placeholder-gray-500 text-xs focus:outline-none focus:border-primary-500/50"
                          />
                          <button
                            onClick={() => handleAddSub(cat.id)}
                            className="px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold flex items-center gap-1 hover:bg-primary-500/20 transition-all"
                          >
                            <HiPlus className="w-3 h-3" />
                            إضافة
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-16 glass-card">
              <p className="text-gray-500 text-sm">لا توجد فئات. أضف فئة جديدة.</p>
            </div>
          )}
        </div>
        </>
        )}

        {tab === 'products' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              {editProductId ? <HiPencil className="w-5 h-5" /> : <HiTag className="w-5 h-5" />}
              {editProductId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="اسم المنتج*" value={editProductId ? editProductData.name : newProduct.name} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, name: e.target.value })) : setNewProduct(p => ({ ...p, name: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50" />
              <select value={editProductId ? editProductData.category : newProduct.category} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, category: e.target.value })) : setNewProduct(p => ({ ...p, category: e.target.value }))} className="px-3 py-3 rounded-xl bg-glass border border-glass-border text-white text-sm focus:outline-none">
                <option value="hardware">هاردوير</option>
                <option value="software">برامج</option>
                <option value="accessories">إكسسوارات</option>
                <option value="consoles">أجهزة ألعاب</option>
                <option value="phones">هواتف</option>
              </select>
              <input type="number" placeholder="السعر*" value={editProductId ? editProductData.price : newProduct.price} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, price: e.target.value })) : setNewProduct(p => ({ ...p, price: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50" />
              <input type="number" placeholder="السعر الأصلي (اختياري)" value={editProductId ? editProductData.originalPrice : newProduct.originalPrice} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, originalPrice: e.target.value })) : setNewProduct(p => ({ ...p, originalPrice: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50" />
              <input type="text" placeholder="رابط الصورة" value={editProductId ? (editProductData.image || '') : newProduct.image} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, image: e.target.value })) : setNewProduct(p => ({ ...p, image: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50 sm:col-span-2" />
              <input type="text" placeholder="الوصف" value={editProductId ? (editProductData.description || '') : newProduct.description} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, description: e.target.value })) : setNewProduct(p => ({ ...p, description: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50 sm:col-span-2" />
              <input type="text" placeholder="شارة (مثل: جديد، عرض)" value={editProductId ? (editProductData.badge || '') : newProduct.badge} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, badge: e.target.value })) : setNewProduct(p => ({ ...p, badge: e.target.value }))} className="px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/50" />
            </div>
            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" checked={editProductId ? editProductData.inStock : newProduct.inStock} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, inStock: e.target.checked })) : setNewProduct(p => ({ ...p, inStock: e.target.checked }))} className="rounded" /> متوفر
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" checked={editProductId ? editProductData.isFeatured : newProduct.isFeatured} onChange={(e) => editProductId ? setEditProductData(p => ({ ...p, isFeatured: e.target.checked })) : setNewProduct(p => ({ ...p, isFeatured: e.target.checked }))} className="rounded" /> مميز
              </label>
            </div>
            <button onClick={editProductId ? handleSaveEdit : handleAddProduct} className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm flex items-center gap-2 hover:shadow-glow transition-all">
              {editProductId ? <HiPencil className="w-4 h-4" /> : <HiPlus className="w-4 h-4" />}
              {editProductId ? 'حفظ التعديل' : 'إضافة المنتج'}
            </button>
            {editProductId && (
              <button onClick={() => setEditProductId(null)} className="mt-2 px-4 py-2 rounded-xl glass text-gray-400 text-sm">إلغاء</button>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={() => resetProducts()} className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all">إعادة ضبط المنتجات للافتراضي</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{products.length} منتج</span>
            </div>
            {products.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 flex items-center gap-4">
                {p.image && <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm truncate">{p.name}</span>
                    {p.badge && <span className="px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 text-[10px] font-bold">{p.badge}</span>}
                    {p.isFeatured && <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-[10px] font-bold">مميز</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="capitalize">{p.category}</span>
                    <span>${p.price}</span>
                    <span className={p.inStock ? 'text-green-400' : 'text-red-400'}>{p.inStock ? 'متوفر' : 'غير متوفر'}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEditProduct(p.id)} className="p-2 rounded-lg hover:bg-glass-strong text-gray-400 hover:text-white"><HiPencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><HiTrash className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}

        {tab === 'repairs' && (
        <div className="space-y-4">
          {repairOrders.length === 0 ? (
            <div className="text-center py-16 glass-card">
              <p className="text-gray-500 text-sm">لا توجد طلبات صيانة بعد.</p>
            </div>
          ) : repairOrders.map((order) => (
            <motion.div key={order.docId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-mono text-brand">{order.id}</span>
                  <p className="text-white font-semibold mt-0.5">{order.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{order.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateRepairStatus(order.docId, e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-white text-xs focus:outline-none"
                  >
                    <option>قيد الانتظار</option>
                    <option>قيد التنفيذ</option>
                    <option>مكتمل</option>
                  </select>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    order.status === 'مكتمل' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'قيد التنفيذ' ? 'bg-brand/20 text-brand' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{order.status}</span>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
                <span>الجهاز: <span className="text-gray-300">{order.deviceType || order.device || '—'}</span></span>
                <span>التاريخ: <span className="text-gray-300">{order.date}</span></span>
              </div>
              <p className="text-gray-400 text-xs bg-glass rounded-lg px-3 py-2">{order.problem}</p>
            </motion.div>
          ))}
        </div>
        )}

        {tab === 'orders' && (
        <div className="space-y-4">
          {shopOrders.length === 0 ? (
            <div className="text-center py-16 glass-card">
              <p className="text-gray-500 text-sm">لا توجد طلبات متجر بعد.</p>
            </div>
          ) : shopOrders.map((order) => (
            <motion.div key={order.docId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 space-y-4">
              {/* Header: order id + status */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-mono text-green-400">{order.id}</span>
                  <p className="text-gray-400 text-xs mt-0.5">{new Date(order.date).toLocaleString('ar-SA')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateShopStatus(order.docId, e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-white text-xs focus:outline-none"
                  >
                    <option>جديد</option>
                    <option>قيد التجهيز</option>
                    <option>تم الشحن</option>
                    <option>مكتمل</option>
                    <option>ملغي</option>
                  </select>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    order.status === 'مكتمل' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'تم الشحن' ? 'bg-brand/20 text-brand' :
                    order.status === 'ملغي' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{order.status}</span>
                </div>
              </div>

              {/* Customer info */}
              {order.customer && (order.customer.name || order.customer.phone) && (
                <div className="bg-glass rounded-xl px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block mb-0.5">العميل</span>
                    <span className="text-white font-semibold">{order.customer.name || '—'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">الهاتف</span>
                    <span className="text-white">{order.customer.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">العنوان</span>
                    <span className="text-white">{order.customer.address || '—'}</span>
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">المنتجات</p>
                {(order.items || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs bg-glass rounded-lg px-3 py-2">
                    {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover border border-glass-border" />}
                    <span className="flex-1 text-gray-300 font-medium">{item.name}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                    <span className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-glass-border pt-3">
                <span className="text-xs text-gray-500">الإجمالي</span>
                <span className="text-white font-bold text-sm">${order.total?.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>

      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative glass-strong rounded-2xl p-6 max-w-md w-full z-10"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <HiExclamationTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {deleteConfirm === 'reset' ? 'إعادة ضبط الفئات؟' : 'حذف الفئة؟'}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {deleteConfirm === 'reset'
                    ? 'سيتم إعادة جميع الفئات إلى الإعدادات الافتراضية. هذا الإجراء لا يمكن التراجع عنه.'
                    : 'سيتم حذف الفئة وجميع الفئات الفرعية التابعة لها. هذا الإجراء لا يمكن التراجع عنه.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-6 py-2.5 rounded-xl glass border border-glass-border text-white text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => {
                      if (deleteConfirm === 'reset') resetToDefault()
                      else deleteCategory(deleteConfirm)
                      setDeleteConfirm(null)
                    }}
                    className="px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold"
                  >
                    {deleteConfirm === 'reset' ? 'إعادة ضبط' : 'حذف'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
