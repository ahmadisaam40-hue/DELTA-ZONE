import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiOutlineGlobe } from 'react-icons/hi'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'

const footerLinks = {
  'المتجر': [
    { label: 'جميع المنتجات', to: '/shop' },
    { label: 'برامج', to: '/shop?category=software' },
    { label: 'هاردوير', to: '/shop?category=hardware' },
    { label: 'إكسسوارات', to: '/shop?category=accessories' },
    { label: 'أجهزة ألعاب', to: '/shop?category=consoles' },
    { label: 'هواتف', to: '/shop?category=phones' },
  ],
  'خدماتنا': [
    { label: 'صيانة الأجهزة', to: '/repair' },
    { label: 'تتبع الطلب', to: '/repair' },
    { label: 'دعم فني', to: '/about' },
    { label: 'الضمان', to: '/about' },
  ],
  'الشركة': [
    { label: 'من نحن', to: '/about' },
    { label: 'اتصل بنا', to: '/about' },
    { label: 'وظائف', to: '/about' },
    { label: 'المركز الإعلامي', to: '/about' },
  ],
}

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-brand/10 bg-black/95">
      <div className="absolute inset-0 bg-gradient-to-t from-brand/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src="/Screenshot_2026-04-12_184310-removebg-preview.png" alt="دلتا زون" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">دلتا</span>
                <span className="text-gradient">زون</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              وجهتك الأولى للتكنولوجيا المتطورة. من الأجهزة إلى البرامج، نقدم لك التميز في كل منتج.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <HiLocationMarker className="w-4 h-4 text-brand" />
                <span>بغداد - الدورة - شارع ابو طيارة - مجاور ماكسي مول</span>
              </div>
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-brand" />
                <span>07733573755</span>
              </div>
              <div className="flex items-center gap-2">
                <HiMail className="w-4 h-4 text-brand" />
                <span>support@deltazone.com</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-500 hover:text-brand text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-brand/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <HiOutlineGlobe className="w-4 h-4" />
            <span>العربية</span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 border border-brand/10 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand/40 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} دلتا زون. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
