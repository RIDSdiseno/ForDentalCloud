import logoLockup from '../assets/brand/logo-lockup.png'
import logoMark from '../assets/brand/logo-mark.png'

export function Logo({ className = '' }) {
  return <img src={logoLockup} alt="forDentalCloud" className={`h-10 w-auto ${className}`} />
}

export function LogoOnDark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logoMark} alt="" className="h-8 w-auto" />
      <span className="text-lg font-semibold text-white">forDentalCloud</span>
    </span>
  )
}

export default Logo
