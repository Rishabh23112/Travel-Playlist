const TogglePill = ({ isStudy, onToggle }) => {
  return (
    <div className="absolute right-5 top-4 z-50">
      <button
        type="button"
        aria-label={isStudy ? 'Switch to hero view' : 'Switch to study view'}
        aria-pressed={isStudy}
        onClick={onToggle}
        className={`
            relative inline-flex h-8 w-20 items-center rounded-full border
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
            ${
                isStudy
                ? 'border-none bg-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] backdrop-blur-md'
                : 'border-white/10 bg-black/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] backdrop-blur-md'
            }
        `}
      >
        <span className="sr-only">Toggle</span>

        <span className={`absolute left-8 text-[9px] font-medium uppercase tracking-[0.2em] text-white/70 transition-opacity duration-300 ${!isStudy ? 'opacity-100' : 'opacity-0'}`}>
          Travel
        </span>
        <span className={`absolute right-8 text-[9px] font-medium uppercase tracking-[0.2em] text-white/70 transition-opacity duration-300 ${isStudy ? 'opacity-100' : 'opacity-0'}`}>
          Study
        </span>

        <span
          aria-hidden="true"
          className={`
            pointer-events-none absolute top-1 h-6 w-6 rounded-full bg-white/20
            shadow-[0_2px_10px_rgba(0,0,0,0.25)] ring-0 transition-all duration-500
            ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isStudy ? 'right-1.5' : 'left-1.5'}
          `}
        />
      </button>
    </div>
  )
}

export default TogglePill