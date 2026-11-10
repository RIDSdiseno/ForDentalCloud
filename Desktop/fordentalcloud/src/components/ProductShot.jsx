import { motion } from 'framer-motion'

// Composición para capturas REALES del sistema (10-11-2026): en vez de pegar el
// pantallazo entero y plano, la pantalla va dentro de un panel de color suave y
// se sale por el borde (se ve solo la parte importante, más grande), y encima
// flotan recortes reales de la misma pantalla (tarjetas) para guiar la vista.
// Mantiene el brillo de fondo de ShowcaseImage (diseño de la jefa) y las
// animaciones con framer-motion: los recortes entran escalonados al bajar.
//
// callouts: [{ src, alt, className }] — className posiciona cada tarjeta.
export default function ProductShot({
  src,
  alt,
  tint = 'from-cyan-200 via-cyan-100',
  panel = 'from-cyan-50 to-white',
  callouts = [],
}) {
  return (
    <div className="relative pb-8 pl-2 sm:pb-10 sm:pl-6">
      <div className={`absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr ${tint} to-transparent blur-2xl`} />

      <div
        className={`relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${panel} shadow-xl shadow-slate-300/30`}
      >
        {/* trama de puntos muy suave, para que el panel no sea un bloque plano */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgb(148 163 184 / 0.35) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute left-[7%] top-[9%] w-[128%] max-w-none rounded-xl border border-slate-200/80 shadow-2xl shadow-slate-900/15"
        />
      </div>

      {callouts.map((c, i) => (
        <motion.div
          key={c.src}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.25 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`absolute overflow-hidden rounded-[14px] bg-white shadow-[0_18px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 ${c.className}`}
        >
          <img src={c.src} alt={c.alt} loading="lazy" className="block w-full" />
        </motion.div>
      ))}
    </div>
  )
}
