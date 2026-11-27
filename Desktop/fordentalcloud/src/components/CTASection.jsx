import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Stethoscope, Plus, CalendarDays } from 'lucide-react'
import Reveal from './Reveal.jsx'
import DemoModal from './DemoModal.jsx'

export default function CTASection() {
  // 27-11-2026: el formulario de solo correo pasó a una ventanita "Agendar demo"
  // con correo, teléfono y calendario (DemoModal). Misma ruta /api/demo-requests.
  const [abierto, setAbierto] = useState(false)
  const cerrar = useCallback(() => setAbierto(false), [])

  return (
    <section id="contacto" className="relative overflow-hidden bg-slate-900 py-20">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-float-slow rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 animate-float-slower rounded-full bg-blue-500/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white ring-1 ring-white/10">
            <Building2 className="h-5 w-5" />
          </span>
          <Plus className="h-4 w-4 text-slate-500" />
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-500 text-white ring-1 ring-white/10">
            <Stethoscope className="h-5 w-5" />
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Lleva la administración y la atención de tu clínica a un solo lugar
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Agenda una demo y te mostramos cómo ForDentOS y DentalGOP trabajan juntos para tu
          equipo administrativo y tus profesionales.
        </p>

        <motion.button
          type="button"
          onClick={() => setAbierto(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
        >
          <CalendarDays className="h-4 w-4" />
          Agendar demo
        </motion.button>
        <p className="mt-3 text-xs text-slate-400">Elige el día y te contactamos para confirmar la hora.</p>
      </Reveal>

      <DemoModal open={abierto} onClose={cerrar} />
    </section>
  )
}
