import { forwardRef } from 'react'
import { siteConfig } from '../config/siteConfig'
import { uiTextByLocale } from '../data/siteContent'
import type { Locale, PersonalityResult } from '../types/test'

interface PosterCardProps {
  result: PersonalityResult
  locale: Locale
}

export const PosterCard = forwardRef<HTMLDivElement, PosterCardProps>(function PosterCard({ result, locale }, ref) {
  const text = uiTextByLocale[locale]
  return (
    <div className={`poster-card ${locale === 'en' ? 'poster-card--en' : ''}`} ref={ref} style={{ backgroundColor: result.tint }}>
      <div className="poster-topline" style={{ backgroundColor: result.accent }} />
      <div className="poster-header">
        <img src={siteConfig.logoUrl} alt="" />
        <div>
          <strong>{locale === 'zh' ? '拓客TI' : 'TECC TI'}</strong>
          <span>TECC Type Indicator</span>
        </div>
      </div>

      <div className="poster-code" style={{ color: result.accent }}>{result.code}</div>
      <p className="poster-kicker">{text.posterKicker}</p>
      <h2 style={{ color: result.accent }}>{result.name}</h2>
      <p className="poster-tag">{result.tag}</p>

      <img className="poster-art" src={result.artwork} alt="" />

      <div className="poster-copy">
        <p>{result.description}</p>
      </div>

      <div className="poster-motto" style={{ borderColor: result.accent }}>
        <span>{text.posterSloganLabel}</span>
        <strong style={{ color: result.accent }}>{result.slogan}</strong>
      </div>

      {siteConfig.recruitmentQrUrl && (
        <div className="poster-qr">
          <img src={siteConfig.recruitmentQrUrl} alt="" />
          <span>{text.posterQr}</span>
        </div>
      )}

      <div className="poster-info">
        <div>
          <span>{text.department}</span>
          <strong>{result.department}</strong>
        </div>
        <div>
          <span>{text.projects}</span>
          <strong>{result.projects.slice(0, 3).map((project) => project.name).join(' · ')}</strong>
        </div>
      </div>

      <div className="poster-footer" style={{ backgroundColor: result.accent }}>
        <span>{text.posterFooter}</span>
        <strong>{text.posterBrand}</strong>
      </div>
    </div>
  )
})
