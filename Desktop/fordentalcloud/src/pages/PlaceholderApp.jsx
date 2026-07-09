import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PlaceholderApp({ tag, tagClass, title, description }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tagClass}`}>
          {tag}
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la landing
        </Link>
      </div>
    </div>
  )
}
