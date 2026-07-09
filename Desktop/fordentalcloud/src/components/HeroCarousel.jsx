import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 5500

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [next, paused])

  return (
    <div
      className="group relative w-full overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[280px] w-full sm:h-[360px] lg:h-[440px] xl:h-[500px]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={`bg-${index}`}
            src={slides[index].src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/30" />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={index}
            src={slides[index].src}
            alt={slides[index].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 opacity-100 shadow-md backdrop-blur-sm transition hover:bg-white sm:left-5 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 opacity-100 shadow-md backdrop-blur-sm transition hover:bg-white sm:right-5 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 sm:bottom-6">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-white shadow' : 'w-2 bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
