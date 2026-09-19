import { useEffect, useMemo, useState } from 'react'
import { CalculatingPage } from './components/CalculatingPage'
import { HomePage } from './components/HomePage'
import { QuizPage } from './components/QuizPage'
import { ResultPage } from './components/ResultPage'
import { siteContentByLocale } from './data/siteContent'
import { calculateScores, determinePersonality, normalizeScores } from './lib/scoring'
import { loadLocale, saveLocale } from './lib/language'
import { clearTestState, loadTestState, saveTestState } from './lib/storage'
import type { Answers, Locale } from './types/test'

type Screen = 'home' | 'quiz' | 'calculating' | 'result'

export default function App() {
  const stored = useMemo(loadTestState, [])
  const [answers, setAnswers] = useState<Answers>(stored.answers)
  const [currentIndex, setCurrentIndex] = useState(stored.currentIndex)
  const [screen, setScreen] = useState<Screen>(stored.completed ? 'result' : Object.keys(stored.answers).length > 0 ? 'quiz' : 'home')
  const [locale, setLocale] = useState<Locale>(loadLocale)

  useEffect(() => {
    if (screen === 'quiz' || screen === 'calculating' || screen === 'result') {
      saveTestState({ answers, currentIndex, completed: screen === 'result' })
    }
  }, [answers, currentIndex, screen])

  useEffect(() => {
    saveLocale(locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = locale === 'zh' ? '拓客TI | TECC Type Indicator' : 'TECC TI | Service Personality Quiz'
    document.querySelector('meta[name="description"]')?.setAttribute('content', siteContentByLocale[locale].headline)
  }, [locale])

  const begin = () => {
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }

  const complete = () => {
    setScreen('calculating')
    window.scrollTo({ top: 0 })
  }

  const restart = () => {
    clearTestState()
    setAnswers({})
    setCurrentIndex(0)
    setScreen('home')
    window.scrollTo({ top: 0 })
  }

  if (screen === 'home') return <HomePage locale={locale} onLocaleChange={setLocale} onStart={begin} hasProgress={Object.keys(answers).length > 0} />

  if (screen === 'quiz') {
    return (
      <QuizPage
        answers={answers}
        currentIndex={currentIndex}
        locale={locale}
        onLocaleChange={setLocale}
        onAnswer={(questionId, optionId) => setAnswers((current) => ({ ...current, [questionId]: optionId }))}
        onIndexChange={setCurrentIndex}
        onComplete={complete}
      />
    )
  }

  if (screen === 'calculating') return <CalculatingPage locale={locale} onLocaleChange={setLocale} onComplete={() => setScreen('result')} />

  const code = determinePersonality(answers)
  const scores = calculateScores(answers)
  const percentages = normalizeScores(scores)
  return <ResultPage key={locale} code={code} locale={locale} percentages={percentages} onLocaleChange={setLocale} onRestart={restart} />
}
