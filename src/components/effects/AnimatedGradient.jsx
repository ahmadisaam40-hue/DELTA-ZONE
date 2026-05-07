export default function AnimatedGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,234,255,0.06) 0%, transparent 70%)',
          top: '-10%',
          left: '-15%',
          animation: 'orbFloat 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,234,255,0.04) 0%, transparent 70%)',
          bottom: '10%',
          right: '-10%',
          animation: 'orbFloat 8s ease-in-out infinite',
          animationDelay: '-4s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,234,255,0.05) 0%, transparent 70%)',
          top: '45%',
          left: '35%',
          animation: 'orbFloat 8s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />
    </div>
  )
}
