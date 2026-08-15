
import { useState } from 'react'
import Hero from './components/Hero'
import Study from './components/Study'
import TogglePill from './components/TogglePill'

const App = () => {
  const [isStudy, setIsStudy] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <TogglePill isStudy={isStudy} onToggle={() => setIsStudy((prev) => !prev)} />

      <div className="relative h-screen w-full">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isStudy
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-4 scale-[1.02] opacity-0'
          }`}
        >
          <Study isActive={isStudy} />
        </div>

        <div
          className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            !isStudy
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-4 scale-[1.02] opacity-0'
          }`}
        >
          <Hero isActive={!isStudy} />
        </div>
      </div>
    </div>
  )
}

export default App