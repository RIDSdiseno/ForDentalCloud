import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Stethoscope, RefreshCw } from 'lucide-react'
import Reveal from './Reveal.jsx'

const PLATFORMS = [
  {
    id: 'administrativo',
    icon: Building2,
    tag: 'DentalOS',
    title: 'Gestión administrativa',
    description:
      'La vista de la clínica hacia su propio equipo: finanzas, operaciones y agenda general de todas las sedes.',
    features: [
      'Ingresos, gastos y liquidaciones',
      'Ocupación y rendimiento por sede',
      'Agenda consolidada de todos los profesionales',
      'Reportes para dueños y administradores',
    ],
    to: '/dashboard',
    accent: 'from-slate-900 to-slate-700',
    chip: 'bg-slate-900 text-white',
  },
  {
    id: 'operacional',
    icon: Stethoscope,
    tag: 'DentalGOP',
    title: 'Gestión operacional',
    description:
      'La vista de la clínica hacia sus pacientes: agenda por odontólogo, fichas clínicas y tratamientos.',
    features: [
      'Agenda y horas por profesional',
      'Fichas de pacientes y evoluciones',
      'Presupuestos y planes de tratamiento',
      'Cartola de pagos, abonos y saldos',
    ],
    to: '/pacientes',
    accent: 'from-cyan-600 to-cyan-500',
    chip: 'bg-cyan-600 text-white',
  },
]

export default function PlatformsOverview() {
  return (
    <section id="plataformas" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Dos plataformas, una sola clínica
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Separamos lo administrativo de lo operacional para que cada equipo trabaje en su
            propio espacio, con la misma información sincronizada.
          </p>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-center lg:flex">
            <div className="h-px w-[calc(50%-4.5rem)] bg-gradient-to-r from-transparent to-slate-200" />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="mx-3 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white shadow-md shadow-slate-200/70"
            >
              <RefreshCw className="h-4 w-4 text-slate-400" />
            </motion.div>
            <div className="h-px w-[calc(50%-4.5rem)] bg-gradient-to-l from-transparent to-slate-200" />
          </div>

          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.id} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 p-8 transition-shadow hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.08 }}
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${platform.accent} text-white`}
                >
                  <platform.icon className="h-6 w-6" />
                </motion.div>

                <span className={`mt-5 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${platform.chip}`}>
                  {platform.tag}
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-slate-900">{platform.title}</h3>
                <p className="mt-2 text-slate-600">{platform.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={platform.to}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:gap-3"
                >
                  Ver plataforma
                  <ArrowRight className="h-4 w-4 transition" />
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
