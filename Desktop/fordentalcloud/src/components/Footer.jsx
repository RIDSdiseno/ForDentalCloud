import { LogoOnDark } from './Logo.jsx'

const COLUMNS = [
  {
    title: 'Producto',
    links: [
      { label: 'DentalOS (administración)', href: '#administrativo' },
      { label: 'DentalCloud (operación)', href: '#operacional' },
      { label: 'Plataformas', href: '#plataformas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Contacto', href: '#contacto' },
      { label: 'Solicitar demo', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '#' },
      { label: 'Política de privacidad', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <LogoOnDark />
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              Software de gestión para clínicas dentales: administración, finanzas y operación
              en una misma plataforma.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} forDentalCloud. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
