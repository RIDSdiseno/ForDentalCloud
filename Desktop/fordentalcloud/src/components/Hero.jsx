import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import fordentcloudBanner from '../assets/brand/fordentcloud-banner.jpg'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white">
      <motion.img
        src={fordentcloudBanner}
        alt="forDentalCloud: control total de tu clínica, pagos, presupuestos y reportes en la nube"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="block w-full"
      />

      <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 animate-float-slow rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 animate-float-slower rounded-full bg-violet-200/40 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-4xl px-6 py-16 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700"
        >
          Administración + Operación, en una sola plataforma
        </motion.span>

        <motion.h1 variants={item} className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Gestiona tu clínica dental de punta a punta
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          forDentalCloud une el back office de tu clínica con la atención diaria de tus
          pacientes: finanzas y operaciones para tu equipo, agenda y tratamientos para tus
          odontólogos.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Solicitar demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            href="#plataformas"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
          >
            Ver las plataformas
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
