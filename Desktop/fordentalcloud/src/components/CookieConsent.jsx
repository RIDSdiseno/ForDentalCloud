import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { OPEN_SETTINGS, readConsent, saveConsent } from '../lib/consent.js'

// Aviso de cookies (10-11-2026). Tarjeta compacta abajo a la izquierda, con el
// estilo de la landing (slate + cian). Rechazar y Aceptar tienen el mismo peso:
// la ley pide que rechazar sea igual de fácil que aceptar.
const CATEGORIAS = [
  { key: 'necesarias', titulo: 'Necesarias', texto: 'Hacen que el sitio funcione y recuerdan esta decisión. Siempre activas.', fija: true },
  { key: 'analitica', titulo: 'Analítica', texto: 'Nos ayudarían a entender cómo se usa el sitio. Hoy no usamos ninguna.' },
  { key: 'marketing', titulo: 'Marketing', texto: 'Servirían para medir campañas. Hoy no usamos ninguna.' },
]

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState(false)
  const [prefs, setPrefs] = useState({ analitica: false, marketing: false })

  useEffect(() => {
    const saved = readConsent()
    if (saved) setPrefs({ analitica: saved.analitica, marketing: saved.marketing })
    else {
      const t = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const open = () => {
      const saved = readConsent()
      if (saved) setPrefs({ analitica: saved.analitica, marketing: saved.marketing })
      setConfig(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_SETTINGS, open)
    return () => window.removeEventListener(OPEN_SETTINGS, open)
  }, [])

  function decide(p) {
    saveConsent(p)
    setPrefs({ analitica: !!p.analitica, marketing: !!p.marketing })
    setVisible(false)
    setConfig(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Preferencias de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)]">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                <Cookie className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">Cookies en este sitio</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  Solo usamos lo necesario para que el sitio funcione. Si algún día sumamos herramientas de analítica o
                  marketing, se activarán solo si las aceptas.{' '}
                  <a href="/privacidad.html#cookies" className="font-medium text-cyan-700 hover:underline">
                    Más información
                  </a>
                </p>
              </div>
              {config && (
                <button
                  type="button"
                  onClick={() => { setVisible(false); setConfig(false) }}
                  aria-label="Cerrar"
                  className="-mr-1 -mt-1 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {config && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-2 overflow-hidden"
                >
                  {CATEGORIAS.map((c) => {
                    const on = c.fija || prefs[c.key]
                    return (
                      <li key={c.key} className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">{c.titulo}</p>
                          <p className="text-xs text-slate-500">{c.texto}</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-label={c.titulo}
                          disabled={c.fija}
                          onClick={() => setPrefs((p) => ({ ...p, [c.key]: !p[c.key] }))}
                          className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-cyan-600' : 'bg-slate-300'} ${c.fija ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => decide({ analitica: false, marketing: false })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-semibold text-slate-700 hover:border-slate-400"
              >
                Rechazar
              </button>
              {config ? (
                <button
                  type="button"
                  onClick={() => decide(prefs)}
                  className="col-span-2 rounded-lg bg-slate-900 px-3 py-2 text-[13px] font-semibold text-white hover:bg-slate-700 sm:col-span-1"
                >
                  Guardar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfig(true)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-semibold text-slate-700 hover:border-slate-400"
                >
                  Configurar
                </button>
              )}
              <button
                type="button"
                onClick={() => decide({ analitica: true, marketing: true })}
                className={`rounded-lg bg-slate-900 px-3 py-2 text-[13px] font-semibold text-white hover:bg-slate-700 ${config ? '' : 'col-span-2 sm:col-span-1'}`}
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
