import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

export default function FeatureSection({
  id,
  index,
  eyebrow,
  eyebrowClass = 'text-slate-500',
  iconClass = 'text-slate-500',
  badgeClass = 'bg-slate-900',
  title,
  description,
  items,
  visual,
  reverse = false,
  tint = 'bg-slate-50',
}) {
  return (
    <section id={id} className={`border-t border-slate-100 py-20 ${tint}`}>
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-6 ${
          reverse ? 'lg:grid-cols-[1.15fr_0.85fr] lg:[&>*:first-child]:order-2' : 'lg:grid-cols-[0.85fr_1.15fr]'
        }`}
      >
        <Reveal direction={reverse ? 'right' : 'left'} className="min-w-0">
          <div className="flex items-center gap-3">
            {index && (
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${badgeClass}`}>
                {index}
              </span>
            )}
            <span className={`text-sm font-semibold uppercase tracking-wide ${eyebrowClass}`}>
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{description}</p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map(({ icon: Icon, title: itemTitle, text }, i) => (
              <motion.div
                key={itemTitle}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:border-slate-300 hover:shadow-md"
              >
                <Icon className={`h-5 w-5 ${iconClass}`} />
                <p className="mt-3 text-sm font-semibold text-slate-900">{itemTitle}</p>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal direction={reverse ? 'left' : 'right'} delay={0.1} className="min-w-0">
          <motion.div whileHover={{ scale: 1.015 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
            {visual}
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
