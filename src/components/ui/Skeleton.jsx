export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="w-full aspect-square rounded-lg bg-glass-strong mb-4" />
      <div className="h-4 w-20 bg-glass-strong rounded mb-3" />
      <div className="h-5 w-3/4 bg-glass-strong rounded mb-2" />
      <div className="h-4 w-1/2 bg-glass-strong rounded mb-4" />
      <div className="flex items-center justify-between">
        <div className="h-6 w-20 bg-glass-strong rounded" />
        <div className="h-9 w-24 bg-glass-strong rounded-xl" />
      </div>
    </div>
  )
}

export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-glass-strong rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="animate-pulse space-y-4 mb-12">
        <div className="h-10 w-64 bg-glass-strong rounded" />
        <div className="h-5 w-96 bg-glass-strong rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
