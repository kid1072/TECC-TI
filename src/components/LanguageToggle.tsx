import { Languages } from 'lucide-react'
import type { Locale } from '../types/test'

interface LanguageToggleProps {
  locale: Locale
  onChange: (locale: Locale) => void
  inverted?: boolean
}

export function LanguageToggle({ locale, onChange, inverted = false }: LanguageToggleProps) {
  return (
    <div className={`language-toggle ${inverted ? 'language-toggle--inverted' : ''}`} role="group" aria-label="Language / 语言">
      <Languages size={14} aria-hidden="true" />
      <button aria-pressed={locale === 'zh'} onClick={() => onChange('zh')} type="button">中</button>
      <span aria-hidden="true" />
      <button aria-pressed={locale === 'en'} onClick={() => onChange('en')} type="button">EN</button>
    </div>
  )
}
