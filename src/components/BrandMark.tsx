import { siteConfig } from '../config/siteConfig'

interface BrandMarkProps {
  inverted?: boolean
}

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <img className="h-10 w-10 rounded-md object-cover" src={siteConfig.logoUrl} alt="TECC Logo" />
      <div className={inverted ? 'text-white' : 'text-[#1d2416]'}>
        <div className="text-[17px] font-black leading-none">拓客TI</div>
        <div className={`mt-1 text-[10px] font-bold ${inverted ? 'text-white/75' : 'text-[#59614f]'}`}>
          TECC TYPE INDICATOR
        </div>
      </div>
    </div>
  )
}
