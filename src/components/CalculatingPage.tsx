import { useEffect, useState } from 'react'
import { BrandMark } from './BrandMark'

const messages = ['正在分析你的公益雷达……', '正在寻找最适合你的拓客宇宙坐标……']

export function CalculatingPage({ onComplete }: { onComplete: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const messageTimer = window.setInterval(() => setMessageIndex((value) => (value + 1) % messages.length), 550)
    const finishTimer = window.setTimeout(onComplete, 1350)
    return () => {
      window.clearInterval(messageTimer)
      window.clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <main className="app-shell flex min-h-[100svh] flex-col bg-[#f6f8f4] px-6 pb-[calc(32px+env(safe-area-inset-bottom))] pt-[calc(22px+env(safe-area-inset-top))]">
      <BrandMark />
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="radar" aria-hidden="true"><span /><i /><b /></div>
        <p className="mt-8 min-h-14 max-w-[280px] text-xl font-black leading-8 text-[#2c3427]" aria-live="polite">{messages[messageIndex]}</p>
        <div className="mt-4 flex gap-2" aria-hidden="true">
          {[0, 1, 2].map((item) => <span className="loading-dot" key={item} style={{ animationDelay: `${item * 140}ms` }} />)}
        </div>
      </section>
    </main>
  )
}
