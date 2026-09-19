import { toBlob } from 'html-to-image'
import { Download, ExternalLink, Images, RotateCcw, Share2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { resultsByLocale } from '../data/results'
import { uiTextByLocale } from '../data/siteContent'
import { personalityCodes, type Locale, type PersonalityCode, type Scores } from '../types/test'
import { BrandMark } from './BrandMark'
import { LanguageToggle } from './LanguageToggle'
import { PosterCard } from './PosterCard'

interface ResultPageProps {
  code: PersonalityCode
  percentages: Scores
  onRestart: () => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function ResultPage({ code, percentages, onRestart, locale, onLocaleChange }: ResultPageProps) {
  const localizedResults = resultsByLocale[locale]
  const result = localizedResults[code]
  const text = uiTextByLocale[locale]
  const recruitmentUrl = siteConfig.recruitmentUrls[code]
  const posterRef = useRef<HTMLDivElement>(null)
  const [posterUrl, setPosterUrl] = useState('')
  const [showOthers, setShowOthers] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const generatePoster = async () => {
    if (!posterRef.current || generating) return
    setGenerating(true)
    setError('')
    try {
      await document.fonts.ready
      const images = Array.from(posterRef.current.querySelectorAll('img'))
      await Promise.all(images.map(async (image) => {
        if (!image.complete) await image.decode()
      }))
      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        width: 360,
        height: 480,
        backgroundColor: result.tint,
      })
      if (!blob) throw new Error('Poster blob is empty')
      if (posterUrl) URL.revokeObjectURL(posterUrl)
      setPosterUrl(URL.createObjectURL(blob))
    } catch {
      setError(text.generationError)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <main className="app-shell min-h-[100svh] bg-[#f6f8f4] pb-[calc(32px+env(safe-area-inset-bottom))]">
      <section className="result-hero px-5 pb-7 pt-[calc(20px+env(safe-area-inset-top))]" style={{ backgroundColor: result.tint }}>
        <div className="flex items-start justify-between gap-4">
          <BrandMark locale={locale} />
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
        </div>
        <div className="relative mt-9 min-h-[300px] overflow-hidden">
          <p className="text-sm font-bold text-[#555f4f]">{text.yourType}</p>
          <div className="mt-3 text-sm font-black" style={{ color: result.accent }}>{result.code} TYPE</div>
          <h1 className="mt-1 max-w-[270px] text-[42px] font-black leading-[1.12]" style={{ color: result.accent }}>{result.name}</h1>
          <p className="mt-3 max-w-[255px] text-[15px] font-bold leading-6 text-[#343b2e]">{result.tag}</p>
          <img className="result-art" src={result.artwork} alt={`${result.name}人物插画`} />
          <p className="absolute bottom-0 left-0 max-w-[280px] border-l-4 bg-white/85 py-2 pl-3 pr-4 text-[13px] font-bold leading-5 text-[#3d4538]" style={{ borderColor: result.accent }}>
            {result.slogan}
          </p>
        </div>
      </section>

      <section className="border-b border-[#dbe1d8] bg-white px-5 py-7">
        <div className="flex items-end justify-between gap-5">
          <h2 className="text-lg font-black text-[#222a1d]">{text.tendency}</h2>
          <p className="max-w-[190px] text-right text-[11px] leading-4 text-[#747b70]">{text.tendencyNote}</p>
        </div>
        <div className="mt-6 space-y-4">
          {personalityCodes.map((type) => (
            <ScoreBar key={type} type={type} percentage={percentages[type]} active={type === code} locale={locale} />
          ))}
        </div>
      </section>

      <section className="px-5 py-8">
        <p className="section-label">{text.personalityIntro}</p>
        <p className="mt-3 text-[16px] leading-8 text-[#394034]">{result.description}</p>

        <div className="mt-8 border-y border-[#d9dfd6] py-5">
          <p className="section-label">{text.department}</p>
          <p className="mt-2 text-xl font-black" style={{ color: result.accent }}>{result.department}</p>
        </div>

        <div className="mt-8">
          <p className="section-label">{text.projects}</p>
          <div className="mt-3 divide-y divide-[#dfe4dc] border-y border-[#dfe4dc]">
            {result.projects.map((project, index) => (
              <div className="py-4" key={project.name}>
                <div className="flex gap-3">
                  <span className="mt-0.5 text-xs font-black tabular-nums" style={{ color: result.accent }}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[15px] font-black leading-6 text-[#242b20]">
                      {project.name}{project.code ? `（${project.code}）` : ''}
                    </h3>
                    <p className="mt-1 text-[13px] leading-6 text-[#626a5d]">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky bottom-0 z-10 border-t border-[#d9dfd6] bg-[#f6f8f4] px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-3">
        <button className="primary-button primary-button--dark" onClick={generatePoster} disabled={generating} type="button">
          <Share2 size={19} />
          {generating ? text.generating : text.generate}
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="secondary-button" onClick={onRestart} type="button"><RotateCcw size={17} />{text.restart}</button>
          <button className="secondary-button" onClick={() => setShowOthers(true)} type="button"><Images size={17} />{text.viewOthers}</button>
        </div>
        {recruitmentUrl && (
          <a className="secondary-button mt-3 w-full" href={recruitmentUrl} rel="noreferrer" target="_blank">
            <ExternalLink size={17} />{text.recruitmentPost(code)}
          </a>
        )}
        {error && <p className="mt-2 text-center text-xs font-bold text-[#a33124]" role="alert">{error}</p>}
      </section>

      <div className="poster-stage" aria-hidden="true"><PosterCard ref={posterRef} result={result} locale={locale} /></div>

      {posterUrl && <PosterPreview locale={locale} url={posterUrl} name={result.name} onClose={() => {
        URL.revokeObjectURL(posterUrl)
        setPosterUrl('')
      }} />}
      {showOthers && <OtherResults active={code} locale={locale} onClose={() => setShowOthers(false)} />}
    </main>
  )
}

function ScoreBar({ type, percentage, active, locale }: { type: PersonalityCode; percentage: number; active: boolean; locale: Locale }) {
  const item = resultsByLocale[locale][type]
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-black" style={{ color: active ? item.accent : '#596154' }}>{type}</span>
        <span className="font-black tabular-nums text-[#343b2e]">{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#e7ebe5]">
        <div className="h-full rounded-full transition-[width] duration-700" style={{ backgroundColor: item.accent, width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function PosterPreview({ url, name, onClose, locale }: { url: string; name: string; onClose: () => void; locale: Locale }) {
  const text = uiTextByLocale[locale]
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={text.posterPreview}>
      <div className="poster-preview">
        <button className="icon-button absolute right-3 top-3" onClick={onClose} type="button" aria-label={text.closePreview}><X size={20} /></button>
        <img src={url} alt={`${name} ${text.posterPreview}`} />
        <a className="primary-button primary-button--dark mt-4" download={`${locale === 'zh' ? '拓客TI' : 'TECC-TI'}-${name}.png`} href={url}>
          <Download size={19} />{text.saveImage}
        </a>
      </div>
    </div>
  )
}

function OtherResults({ active, onClose, locale }: { active: PersonalityCode; onClose: () => void; locale: Locale }) {
  const text = uiTextByLocale[locale]
  return (
    <div className="modal-backdrop items-end" role="dialog" aria-modal="true" aria-label={text.otherTitle}>
      <div className="other-results-sheet">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#222a1d]">{text.otherTitle}</h2>
          <button className="icon-button" onClick={onClose} type="button" aria-label={text.close}><X size={20} /></button>
        </div>
        <div className="mt-5 divide-y divide-[#dde2da] border-y border-[#dde2da]">
          {personalityCodes.filter((type) => type !== active).map((type) => {
            const item = resultsByLocale[locale][type]
            return (
              <section className="relative overflow-hidden py-5" key={type}>
                <div className="text-xs font-black" style={{ color: item.accent }}>{type} TYPE</div>
                <h3 className="mt-1 text-2xl font-black" style={{ color: item.accent }}>{item.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#4e5649]">{item.tag}</p>
                <p className="mt-3 pr-20 text-[13px] leading-6 text-[#666e61]">{item.description}</p>
                <img className="absolute -right-4 bottom-0 h-28 w-28 object-contain opacity-80" src={item.artwork} alt="" />
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
