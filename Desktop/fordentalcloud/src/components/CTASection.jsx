import { motion } from 'framer-motion'
import { Building2, Stethoscope, Plus } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function CTASection() {
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
          Agenda una demo y te mostramos cómo DentalOS y DentalCloud trabajan juntos para tu
          equipo administrativo y tus profesionales.
        </p>

        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="tu@clinica.cl"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Solicitar demo
          </motion.button>
        </form>
      </Reveal>
    </section>
  )
}
