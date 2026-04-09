export default function ErrorBox({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="error-box flex items-center justify-between gap-4 mb-8 fade-in" role="alert">
      <div className="flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-[10px] tracking-widest uppercase font-inter text-[#c9a84c] border border-[#c9a84c33]
            px-3 py-1 hover:border-[#c9a84c] transition-colors duration-300 flex-shrink-0"
        >
          Retry
        </button>
      )}
    </div>
  )
}
