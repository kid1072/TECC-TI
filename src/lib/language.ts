import type { Locale } from '../types/test'

const LANGUAGE_KEY = 'tecc-ti-language-v1'

export function loadLocale(): Locale {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

export function saveLocale(locale: Locale): void {
  localStorage.setItem(LANGUAGE_KEY, locale)
}
