import { LogoOnDark } from './Logo.jsx'
import logoRids from '../assets/brand/logo-rids-blanco.png'
import { openCookieSettings } from '../lib/consent.js'

const COLUMNS = [
  {
    title: 'Producto',
    links: [
      { label: 'DentalOS (administración)', href: '#administrativo' },
      { label: 'DentalGOP (operación)', href: '#operacional' },
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
      { label: 'Términos y condiciones', href: '/terminos.html' },
      { label: 'Política de privacidad', href: '/privacidad.html' },
      { label: 'Política de cookies', href: '/privacidad.html#cookies' },
      { label: 'Configurar cookies', onClick: openCookieSettings },
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
                    {link.onClick ? (
                      <button type="button" onClick={link.onClick} className="text-sm text-slate-400 hover:text-white">
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-sm text-slate-400 hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} forDentalCloud. Todos los derechos reservados.</span>
          {/* Firma de la empresa que hace el producto (10-11-2026). */}
          <a
            href="https://rids.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-slate-500 transition-colors hover:text-slate-300"
          >
            Un producto de
            <img
              src={logoRids}
              alt="RIDS"
              className="h-6 w-auto opacity-70 transition-opacity group-hover:opacity-100"
              width="74"
              height="24"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
