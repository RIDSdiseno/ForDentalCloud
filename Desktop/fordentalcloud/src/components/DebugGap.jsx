import { useEffect, useState } from 'react'

export default function DebugGap() {
  const [info, setInfo] = useState('midiendo…')

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById('top')
      const platforms = document.getElementById('plataformas')
      if (!hero || !platforms) return setInfo('no encontré las secciones')
      const heroRect = hero.getBoundingClientRect()
      const platRect = platforms.getBoundingClientRect()
      const gap = platRect.top - heroRect.bottom
      setInfo(
        `heroBottom=${Math.round(heroRect.bottom)} platTop=${Math.round(platRect.top)} gap=${Math.round(gap)}px | innerWidth=${window.innerWidth} innerHeight=${window.innerHeight} dpr=${window.devicePixelRatio} zoom=${Math.round((window.outerWidth / window.innerWidth) * 100) || 'n/a'}`,
      )
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure)
    const t = setInterval(measure, 500)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      clearInterval(t)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 99999,
        background: 'red',
        color: 'white',
        fontSize: 12,
        padding: 6,
        maxWidth: '100vw',
        wordBreak: 'break-all',
      }}
    >
      {info}
    </div>
  )
}
