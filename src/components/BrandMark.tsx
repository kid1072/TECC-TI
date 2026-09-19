import { siteConfig } from '../config/siteConfig'
import type { Locale } from '../types/test'

interface BrandMarkProps {
  inverted?: boolean
  locale?: Locale
}

export function BrandMark({ inverted = false, locale = 'zh' }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <img className="h-10 w-10 rounded-md object-cover" src={siteConfig.logoUrl} alt="TECC Logo" />
      <div className={inverted ? 'text-white' : 'text-[#1d2416]'}>
        <div className="text-[17px] font-black leading-none">{locale === 'zh' ? '拓客TI' : 'TECC TI'}</div>
        <div className={`mt-1 text-[10px] font-bold ${inverted ? 'text-white/75' : 'text-[#59614f]'}`}>
          TECC TYPE INDICATOR
        </div>
      </div>
    </div>
  )
}
