import { ArrowRight, Clock3, ListChecks, Shapes } from 'lucide-react'
import { siteContentByLocale } from '../data/siteContent'
import type { Locale } from '../types/test'
import { BrandMark } from './BrandMark'
import { LanguageToggle } from './LanguageToggle'

interface HomePageProps {
  onStart: () => void
  hasProgress: boolean
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function HomePage({ onStart, hasProgress, locale, onLocaleChange }: HomePageProps) {
  const content = siteContentByLocale[locale]
  return (
    <main className="app-shell bg-[#f6f8f4]">
      <section className="relative flex min-h-[calc(100svh-138px)] flex-col overflow-hidden bg-[#89a707] px-6 pb-8 pt-[calc(24px+env(safe-area-inset-top))] text-white">
        <div className="pointer-events-none absolute -right-8 top-24 rotate-12 border-[16px] border-[#ffca00] px-6 py-1 text-[96px] font-black leading-none text-transparent opacity-90" aria-hidden="true">
          TI
        </div>
        <div className="relative flex items-start justify-between gap-4">
          <BrandMark inverted locale={locale} />
          <LanguageToggle inverted locale={locale} onChange={onLocaleChange} />
        </div>

        <div className="relative mt-auto max-w-[350px] pt-28">
          <p className="mb-3 text-sm font-bold text-[#ffdf58]">{content.slogan}</p>
          <h1 className={`${locale === 'en' ? 'text-[50px]' : 'text-[56px]'} font-black leading-[0.95]`}>{content.name}</h1>
          <p className="mt-3 text-base font-semibold text-white/80">{content.englishName}</p>
          <h2 className="mt-7 text-[24px] font-black leading-[1.35]">{content.headline}</h2>
          <p className="mt-4 text-[15px] leading-7 text-white/85">{content.introduction}</p>
        </div>

        <button className="primary-button mt-8" onClick={onStart} type="button">
          <span>{hasProgress ? content.continue : content.start}</span>
          <ArrowRight size={21} strokeWidth={2.5} />
        </button>
      </section>

      <section className="grid grid-cols-3 border-b border-[#d9dfd7] bg-white px-3 py-5 text-center">
        <Stat icon={<ListChecks size={19} />} value={content.stats[0]} />
        <Stat icon={<Clock3 size={19} />} value={content.stats[1]} />
        <Stat icon={<Shapes size={19} />} value={content.stats[2]} />
      </section>

      <p className="px-7 pb-[calc(24px+env(safe-area-inset-bottom))] pt-5 text-center text-xs leading-5 text-[#737a6d]">
        {content.disclaimer}
      </p>
    </main>
  )
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2 border-r border-[#e6eae4] last:border-r-0">
      <span className="text-[#789600]">{icon}</span>
      <span className="text-[13px] font-bold text-[#343b2e]">{value}</span>
    </div>
  )
}
