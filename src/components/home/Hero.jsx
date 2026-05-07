import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiPlay } from 'react-icons/hi'
import gsap from 'gsap'
import Button from '../ui/Button'
import CircuitBackground from '../effects/CircuitBackground'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const logoRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(logoRef.current,
        { opacity: 0, scale: 0.7, rotate: -10 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.4)' },
        '-=1.2'
      )

      // floating animation
      gsap.to(logoRef.current, {
        y: -18,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.15,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <CircuitBackground className="opacity-50" />

      <div className="absolute inset-0 bg-gradient-to-b from-brand/[0.02] via-transparent to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-brand/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* ── Text content ── */}
          <div>
            <div ref={titleRef}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand/20 mb-8">
                <span className="w-2 h-2 rounded-sm bg-brand animate-dot-pulse shadow-[0_0_10px_rgba(0,234,255,0.8)]" />
                <span className="text-xs font-medium text-brand tracking-wider uppercase font-mono">
                  مرحباً بك في مستقبل التكنولوجيا
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="text-white">DELTA</span>{' '}
              <span className="text-gradient">ZONE</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-gray-300 mb-6">
              اختبر روعة التكنولوجيا
            </h2>

            <p ref={subtitleRef} className="text-base lg:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
              وجهتك الأولى لأحدث الأجهزة والبرامج وأجهزة الألعاب والإكسسوارات.
              نقدم لك الابتكار والجودة وخدمة لا تضاهى.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button variant="gradient" size="lg">
                  تسوق الآن
                  <HiArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/repair">
                <Button variant="outline" size="lg">
                  <HiPlay className="w-4 h-4" />
                  صيانة فورية
                </Button>
              </Link>
            </div>

            <div ref={statsRef} className="mt-16 flex items-center gap-8">
              {[
                { value: '+50K', label: 'عميل سعيد' },
                { value: '+200', label: 'شريك تجاري' },
                { value: '24/7', label: 'دعم فني' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold font-mono text-gradient-static">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Logo ── */}
          <div className="flex items-center justify-center lg:justify-end -mt-32">
            <div className="relative flex items-center justify-center">
              {/* outer glow ring */}
              <div
                ref={glowRef}
                className="absolute w-[420px] h-[420px] rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(0,234,255,0.18) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              {/* rotating border ring */}
              <div
                className="absolute w-[360px] h-[360px] rounded-full border border-brand/10"
                style={{ animation: 'spin 18s linear infinite' }}
              />
              <div
                className="absolute w-[300px] h-[300px] rounded-full border border-brand/[0.06]"
                style={{ animation: 'spin 12s linear infinite reverse' }}
              />
              {/* logo image */}
              <img
                ref={logoRef}
                src="/Screenshot_2026-04-12_184310-removebg-preview.png"
                alt="Delta Zone Logo"
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_40px_rgba(0,234,255,0.5)]"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
