import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import agendaReal from '../assets/brand/demo_agenda.jpg'

// Portada (10-11-2026): texto real en la página (no dentro de una imagen) y
// una captura VERDADERA de DentalCloud con datos de ejemplo, en vez de las
// ilustraciones generadas del carrusel anterior.
const PUNTOS = [
  'Agenda por sillón y profesional, con confirmación de citas por correo',
  'Ficha clínica, odontograma y presupuestos con abonos',
  'Portal para que tus pacientes reserven y vean su tratamiento',
  'Datos de pacientes tratados según la Ley 21.719',
]

// Animación de entrada original de la jefa (se mantiene igual).
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
    <section id="top" className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="text-sm font-medium text-cyan-700">Software para clínicas dentales · Hecho en Chile</motion.p>
          <motion.h1 variants={item} className="mt-4 text-4xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-[2.75rem]">
            La agenda, las fichas y los pagos de tu clínica, en un solo lugar.
          </motion.h1>
          <motion.p variants={item} className="mt-5 text-lg leading-relaxed text-slate-600">
            forDentalCloud ordena el día a día de la clínica: recepción agenda y cobra, el odontólogo registra la
            atención y la administración ve cómo va el mes.
          </motion.p>

          <motion.ul variants={item} className="mt-7 space-y-2.5">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
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
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              Ver las plataformas
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <img
              src={agendaReal}
              alt="Agenda general de DentalCloud con las citas del día por sillón"
              className="block w-full"
              width="1440"
              height="900"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-slate-400">
            Agenda de DentalCloud, tal como la ve la clínica. Pacientes y profesionales de ejemplo.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
