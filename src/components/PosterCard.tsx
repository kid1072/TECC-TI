import { forwardRef } from 'react'
import { siteConfig } from '../config/siteConfig'
import type { PersonalityResult } from '../types/test'

interface PosterCardProps {
  result: PersonalityResult
}

export const PosterCard = forwardRef<HTMLDivElement, PosterCardProps>(function PosterCard({ result }, ref) {
  return (
    <div className="poster-card" ref={ref} style={{ backgroundColor: result.tint }}>
      <div className="poster-topline" style={{ backgroundColor: result.accent }} />
      <div className="poster-header">
        <img src={siteConfig.logoUrl} alt="" />
        <div>
          <strong>拓客TI</strong>
          <span>TECC Type Indicator</span>
        </div>
      </div>

      <div className="poster-code" style={{ color: result.accent }}>{result.code}</div>
      <p className="poster-kicker">我的拓客TI人格是</p>
      <h2 style={{ color: result.accent }}>{result.name}</h2>
      <p className="poster-tag">{result.tag}</p>

      <img className="poster-art" src={result.artwork} alt="" />

      <div className="poster-copy">
        <p>{result.description}</p>
      </div>

      <div className="poster-motto" style={{ borderColor: result.accent }}>
        <span>招新口号</span>
        <strong style={{ color: result.accent }}>{result.slogan}</strong>
      </div>

      {siteConfig.recruitmentQrUrl && (
        <div className="poster-qr">
          <img src={siteConfig.recruitmentQrUrl} alt="" />
          <span>扫码填写招新问卷</span>
        </div>
      )}

      <div className="poster-info">
        <div>
          <span>匹配部门</span>
          <strong>{result.department}</strong>
        </div>
        <div>
          <span>推荐项目</span>
          <strong>{result.projects.slice(0, 3).map((project) => project.name).join(' · ')}</strong>
        </div>
      </div>

      <div className="poster-footer" style={{ backgroundColor: result.accent }}>
        <span>测测你的拓客公益人格</span>
        <strong>TECC · 让善意发生</strong>
      </div>
    </div>
  )
})
