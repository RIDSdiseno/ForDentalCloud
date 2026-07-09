export default function ShowcaseImage({ src, alt, tint = 'from-cyan-200 via-cyan-100' }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr ${tint} to-transparent blur-2xl`} />
      <img src={src} alt={alt} className="w-full rounded-2xl border border-slate-200 shadow-2xl shadow-slate-300/40" />
    </div>
  )
}
