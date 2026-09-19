import { ArrowRight, Clock3, ListChecks, Shapes } from 'lucide-react'
import { siteContent } from '../data/siteContent'
import { BrandMark } from './BrandMark'

interface HomePageProps {
  onStart: () => void
  hasProgress: boolean
}

export function HomePage({ onStart, hasProgress }: HomePageProps) {
  return (
    <main className="app-shell bg-[#f6f8f4]">
      <section className="relative flex min-h-[calc(100svh-138px)] flex-col overflow-hidden bg-[#89a707] px-6 pb-8 pt-[calc(24px+env(safe-area-inset-top))] text-white">
        <div className="pointer-events-none absolute -right-8 top-24 rotate-12 border-[16px] border-[#ffca00] px-6 py-1 text-[96px] font-black leading-none text-transparent opacity-90" aria-hidden="true">
          TI
        </div>
        <BrandMark inverted />

        <div className="relative mt-auto max-w-[350px] pt-28">
          <p className="mb-3 text-sm font-bold text-[#ffdf58]">{siteContent.slogan}</p>
          <h1 className="text-[56px] font-black leading-[0.95]">{siteContent.name}</h1>
          <p className="mt-3 text-base font-semibold text-white/80">{siteContent.englishName}</p>
          <h2 className="mt-7 text-[24px] font-black leading-[1.35]">12 道真实公益情境题，<br />测测你的拓客公益人格</h2>
          <p className="mt-4 text-[15px] leading-7 text-white/85">{siteContent.introduction}</p>
        </div>

        <button className="primary-button mt-8" onClick={onStart} type="button">
          <span>{hasProgress ? '继续测试' : '开始测试'}</span>
          <ArrowRight size={21} strokeWidth={2.5} />
        </button>
      </section>

      <section className="grid grid-cols-3 border-b border-[#d9dfd7] bg-white px-3 py-5 text-center">
        <Stat icon={<ListChecks size={19} />} value="12 道题" />
        <Stat icon={<Clock3 size={19} />} value="约 2 分钟" />
        <Stat icon={<Shapes size={19} />} value="3 种公益人格" />
      </section>

      <p className="px-7 pb-[calc(24px+env(safe-area-inset-bottom))] pt-5 text-center text-xs leading-5 text-[#737a6d]">
        {siteContent.disclaimer}
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
