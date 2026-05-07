export default function CircuitBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="cyanGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g stroke="rgba(0,234,255,0.5)" strokeWidth="1" fill="none" filter="url(#cyanGlow)" className="circuit-line">
          <path d="M80,180 L280,180 L280,340 L480,340 L480,520" />
          <path d="M120,280 L80,280 L80,420 L200,420" />
          <path d="M780,80 L780,240 L580,240 L580,420" />
          <path d="M1180,280 L980,280 L980,460 L880,460" />
          <path d="M180,580 L380,580 L380,760 L540,760" />
          <path d="M880,580 L880,720 L1080,720 L1080,580" />
          <path d="M40,80 L140,80 L140,60 L260,60" />
          <path d="M1320,140 L1180,140 L1180,90 L1080,90" />
          <path d="M340,830 L340,780 L500,780 L500,740" />
          <path d="M980,40 L980,100 L840,100 L840,200" />
        </g>

        <g stroke="rgba(0,234,255,0.3)" strokeWidth="0.8" fill="none" className="circuit-line" style={{ animationDelay: '-5s' }}>
          <path d="M380,80 L380,180 L580,180 L580,320" />
          <path d="M980,480 L840,480 L840,340 L680,340" />
          <path d="M140,680 L140,580 L340,580 L340,520" />
          <path d="M1120,780 L1120,740 L940,740 L940,640" />
          <path d="M240,280 L240,240 L400,240" />
          <path d="M540,640 L540,540 L700,540" />
          <path d="M740,140 L740,240 L640,240" />
        </g>

        {[
          { cx: 280, cy: 180, r: 3.5, delay: '0s' },
          { cx: 480, cy: 520, r: 3.5, delay: '0.8s' },
          { cx: 780, cy: 80, r: 3, delay: '0.3s' },
          { cx: 580, cy: 420, r: 3, delay: '1.2s' },
          { cx: 980, cy: 460, r: 3.5, delay: '1.8s' },
          { cx: 380, cy: 760, r: 3, delay: '2.4s' },
          { cx: 1080, cy: 580, r: 3, delay: '1.5s' },
          { cx: 260, cy: 60, r: 2.5, delay: '0.5s' },
          { cx: 880, cy: 460, r: 2.5, delay: '2.1s' },
          { cx: 340, cy: 520, r: 2.5, delay: '3s' },
          { cx: 940, cy: 740, r: 2.5, delay: '0.9s' },
          { cx: 700, cy: 320, r: 2.5, delay: '2.7s' },
          { cx: 500, cy: 780, r: 2.5, delay: '1.1s' },
          { cx: 840, cy: 100, r: 2.5, delay: '3.3s' },
        ].map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} className="circuit-dot" style={{ animationDelay: dot.delay }} />
        ))}

        <g opacity="0.4">
          {[
            { x1: 40, y1: 40, x2: 40, y2: 860 },
            { x1: 1400, y1: 200, x2: 1400, y2: 860 },
            { x1: 40, y1: 40, x2: 800, y2: 40 },
            { x1: 600, y1: 860, x2: 1400, y2: 860 },
          ].map((line, i) => (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="rgba(0,234,255,0.1)" strokeWidth="0.5" />
          ))}
        </g>
      </svg>
    </div>
  )
}
