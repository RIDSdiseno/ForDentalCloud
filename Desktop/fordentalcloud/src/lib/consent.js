// Consentimiento de cookies (Ley 21.719, art. 12) — 10-11-2026.
//
// Hoy el sitio NO usa cookies de analítica ni de marketing. Este módulo deja
// lista la regla para el futuro: cualquier herramienta de ese tipo (Google
// Analytics, píxel de Meta, etc.) debe cargarse SOLO si hasConsent('analitica')
// o hasConsent('marketing') es true, y escuchar el evento CONSENT_CHANGED.
// La decisión se guarda en este navegador (almacenamiento necesario).

const KEY = 'fdc_cookie_consent_v1'
export const CONSENT_CHANGED = 'fdc:consent-changed'
export const OPEN_SETTINGS = 'fdc:open-cookie-settings'

export function readConsent() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveConsent({ analitica, marketing }) {
  const value = { necesarias: true, analitica: !!analitica, marketing: !!marketing, fecha: new Date().toISOString() }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Sin almacenamiento (modo privado estricto): se respeta la decisión solo en esta visita.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: value }))
  return value
}

export function hasConsent(category) {
  return readConsent()?.[category] === true
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS))
}
