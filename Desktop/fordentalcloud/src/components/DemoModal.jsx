import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || ''

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DIAS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
// Se puede agendar desde mañana y hasta 60 días adelante, solo de lunes a viernes.
const DIAS_MAXIMOS = 60

function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatLargo(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CL', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date(y, m - 1, d))
}

function Calendario({ value, onChange }) {
  const { min, max } = useMemo(() => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const min = new Date(hoy)
    min.setDate(min.getDate() + 1)
    // Si mañana cae sábado o domingo, el primer día disponible es el lunes
    // (así el calendario abre en el mes correcto, p. ej. un viernes 27 de noviembre).
    while (min.getDay() === 0 || min.getDay() === 6) min.setDate(min.getDate() + 1)
    const max = new Date(hoy)
    max.setDate(max.getDate() + DIAS_MAXIMOS)
    return { min, max }
  }, [])

  const [mes, setMes] = useState(() => new Date(min.getFullYear(), min.getMonth(), 1))

  const celdas = useMemo(() => {
    const primero = new Date(mes.getFullYear(), mes.getMonth(), 1)
    const vacias = (primero.getDay() + 6) % 7 // semana parte el lunes
    const diasMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate()
    const lista = Array.from({ length: vacias }, () => null)
    for (let d = 1; d <= diasMes; d++) lista.push(new Date(mes.getFullYear(), mes.getMonth(), d))
    return lista
  }, [mes])

  const puedeAtras = mes > new Date(min.getFullYear(), min.getMonth(), 1)
  const puedeAdelante = mes < new Date(max.getFullYear(), max.getMonth(), 1)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}
          disabled={!puedeAtras}
          aria-label="Mes anterior"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-white">
          {MESES[mes.getMonth()]} {mes.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}
          disabled={!puedeAdelante}
          aria-label="Mes siguiente"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-500">
        {DIAS.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {celdas.map((fecha, i) => {
          if (!fecha) return <span key={`v${i}`} />
          const key = toKey(fecha)
          const finDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6
          const deshabilitado = finDeSemana || fecha < min || fecha > max
          const seleccionado = value === key
          return (
            <button
              key={key}
              type="button"
              disabled={deshabilitado}
              onClick={() => onChange(key)}
              aria-pressed={seleccionado}
              aria-label={formatLargo(key)}
              className={`h-9 rounded-lg text-sm transition-colors ${
                seleccionado
                  ? 'bg-cyan-500 font-semibold text-slate-950'
                  : deshabilitado
                    ? 'cursor-not-allowed text-slate-600'
                    : 'text-slate-200 hover:bg-slate-700'
              }`}
            >
              {fecha.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DemoModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState('')
  // Consentimiento explícito (Ley 21.719, arts. 12 y 14 ter): casilla sin marcar.
  const [acepta, setAcepta] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [faltaFecha, setFaltaFecha] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  function cerrar() {
    onClose()
    if (status === 'sent') {
      setStatus('idle')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    if (!fecha) {
      setFaltaFecha(true)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`${API_URL}/api/demo-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: telefono.trim(), preferredDate: fecha }),
      })
      if (!response.ok) throw new Error('request failed')

      setStatus('sent')
      setEmail('')
      setTelefono('')
      setAcepta(false)
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={cerrar}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-titulo"
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-slate-900 p-6 text-left shadow-2xl ring-1 ring-white/10"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-500 text-white">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <h3 id="demo-modal-titulo" className="text-lg font-semibold text-white">Agenda tu demo</h3>
                <p className="text-sm text-slate-400">Elige el día y te contactamos para confirmar la hora.</p>
              </div>
            </div>

            {status === 'sent' ? (
              <div className="py-6 text-center">
                <p className="text-base font-semibold text-cyan-300">¡Listo! Recibimos tu solicitud.</p>
                <p className="mt-2 text-sm text-slate-300">
                  Te contactaremos para confirmar la hora de la reunión
                  {fecha ? ` del ${formatLargo(fecha)}` : ''}.
                </p>
                <button
                  type="button"
                  onClick={cerrar}
                  className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-300">Correo</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@clinica.cl"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-300">Teléfono</span>
                  <input
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    pattern="\+?[0-9\s()\-]{8,20}"
                    title="Ingresa un teléfono válido, por ejemplo +56 9 1234 5678"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </label>
                <div>
                  <span className="mb-1 block text-xs font-medium text-slate-300">Día de la reunión</span>
                  <Calendario value={fecha} onChange={(k) => { setFecha(k); setFaltaFecha(false) }} />
                  <p className={`mt-1.5 text-xs ${faltaFecha ? 'text-red-400' : 'text-slate-400'}`}>
                    {fecha
                      ? <>Día elegido: <span className="font-medium text-cyan-300">{formatLargo(fecha)}</span></>
                      : faltaFecha ? 'Elige un día en el calendario.' : 'Lunes a viernes.'}
                  </p>
                </div>
                <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
                  <input
                    type="checkbox"
                    required
                    checked={acepta}
                    onChange={(e) => setAcepta(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-500"
                  />
                  <span>
                    Acepto que RIDS use mi correo y teléfono solo para contactarme y coordinar la demo, según la{' '}
                    <a href="/privacidad.html" className="text-cyan-300 underline-offset-2 hover:underline">
                      Política de Privacidad
                    </a>
                    .
                  </span>
                </label>
                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando…' : 'Agendar demo'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
