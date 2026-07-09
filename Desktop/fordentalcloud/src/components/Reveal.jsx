import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const offset = { up: { y: 24 }, left: { x: -24 }, right: { x: 24 }, none: {} }[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
