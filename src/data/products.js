import useProductStore from '../store/useProductStore'

export const getProducts = () => useProductStore.getState().products

export const categories = [
  { id: 'all', name: 'جميع المنتجات', icon: 'Grid' },
  { id: 'software', name: 'برامج', icon: 'Code' },
  { id: 'hardware', name: 'هاردوير', icon: 'Cpu' },
  { id: 'accessories', name: 'إكسسوارات', icon: 'Headphones' },
  { id: 'consoles', name: 'أجهزة ألعاب', icon: 'Gamepad' },
  { id: 'phones', name: 'هواتف', icon: 'Smartphone' },
]
