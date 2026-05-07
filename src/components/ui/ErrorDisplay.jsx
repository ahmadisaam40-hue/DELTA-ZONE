import { HiExclamationTriangle } from 'react-icons/hi2'
import Button from './Button'

export default function ErrorDisplay({ message = 'حدث خطأ ما. يرجى المحاولة مرة أخرى.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <HiExclamationTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">عذراً!</h3>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          حاول مرة أخرى
        </Button>
      )}
    </div>
  )
}
