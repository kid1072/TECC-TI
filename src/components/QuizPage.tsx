import { ArrowLeft, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { questionsByLocale } from '../data/questions'
import { uiTextByLocale } from '../data/siteContent'
import type { Answers, Locale } from '../types/test'
import { BrandMark } from './BrandMark'
import { LanguageToggle } from './LanguageToggle'

interface QuizPageProps {
  answers: Answers
  currentIndex: number
  onAnswer: (questionId: number, optionId: string) => void
  onIndexChange: (index: number) => void
  onComplete: () => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function QuizPage({ answers, currentIndex, onAnswer, onIndexChange, onComplete, locale, onLocaleChange }: QuizPageProps) {
  const [locked, setLocked] = useState(false)
  const lockRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const questions = questionsByLocale[locale]
  const text = uiTextByLocale[locale]
  const question = questions[currentIndex]
  const selected = answers[question.id]
  const progress = ((currentIndex + 1) / questions.length) * 100

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  const choose = (optionId: string) => {
    if (lockRef.current) return
    lockRef.current = true
    setLocked(true)
    onAnswer(question.id, optionId)

    timerRef.current = window.setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        onComplete()
      } else {
        onIndexChange(currentIndex + 1)
        lockRef.current = false
        setLocked(false)
        window.scrollTo({ top: 0 })
      }
    }, 280)
  }

  const goBack = () => {
    if (locked || currentIndex === 0) return
    onIndexChange(currentIndex - 1)
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="app-shell flex min-h-[100svh] flex-col bg-[#f6f8f4]">
      <header className="px-5 pt-[calc(20px+env(safe-area-inset-top))]">
        <div className="flex items-start justify-between gap-4">
          <BrandMark locale={locale} />
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
        </div>
        <div className="mt-7 flex items-end justify-between">
          <span className="text-xs font-black uppercase text-[#789600]">{text.quizLabel}</span>
          <span className="text-sm font-black tabular-nums text-[#343b2e]">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dfe5dc]" aria-label={`${text.progressLabel} ${Math.round(progress)}%`}>
          <div className="h-full rounded-full bg-[#89a707] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section key={question.id} className="question-enter flex flex-1 flex-col px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-9">
        <div className="mb-6">
          {question.tieBreaker && <p className="mb-2 text-xs font-bold text-[#9a7600]">{text.finalPreference}</p>}
          <h1 className="text-[25px] font-black leading-[1.42] text-[#1d2416]">{question.prompt}</h1>
        </div>

        <div className="space-y-3" aria-live="polite">
          {question.options.map((option) => {
            const isSelected = selected === option.id
            return (
              <button
                className={`option-card ${isSelected ? 'option-card--selected' : ''}`}
                disabled={locked}
                key={option.id}
                onClick={() => choose(option.id)}
                type="button"
              >
                <span className="option-letter">{option.id}</span>
                <span className="flex-1">{option.label}</span>
                <span className={`option-check ${isSelected ? 'opacity-100' : 'opacity-0'}`}><Check size={16} strokeWidth={3} /></span>
              </button>
            )
          })}
        </div>

        <div className="mt-auto pt-7">
          <button className="back-button" disabled={currentIndex === 0 || locked} onClick={goBack} type="button">
            <ArrowLeft size={18} />
            {text.previous}
          </button>
        </div>
      </section>
    </main>
  )
}
