import { useEffect, useMemo, useState } from 'react'
import { CalculatingPage } from './components/CalculatingPage'
import { HomePage } from './components/HomePage'
import { QuizPage } from './components/QuizPage'
import { ResultPage } from './components/ResultPage'
import { calculateScores, determinePersonality, normalizeScores } from './lib/scoring'
import { clearTestState, loadTestState, saveTestState } from './lib/storage'
import type { Answers } from './types/test'

type Screen = 'home' | 'quiz' | 'calculating' | 'result'

export default function App() {
  const stored = useMemo(loadTestState, [])
  const [answers, setAnswers] = useState<Answers>(stored.answers)
  const [currentIndex, setCurrentIndex] = useState(stored.currentIndex)
  const [screen, setScreen] = useState<Screen>(stored.completed ? 'result' : Object.keys(stored.answers).length > 0 ? 'quiz' : 'home')

  useEffect(() => {
    if (screen === 'quiz' || screen === 'calculating' || screen === 'result') {
      saveTestState({ answers, currentIndex, completed: screen === 'result' })
    }
  }, [answers, currentIndex, screen])

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

  if (screen === 'home') return <HomePage onStart={begin} hasProgress={Object.keys(answers).length > 0} />

  if (screen === 'quiz') {
    return (
      <QuizPage
        answers={answers}
        currentIndex={currentIndex}
        onAnswer={(questionId, optionId) => setAnswers((current) => ({ ...current, [questionId]: optionId }))}
        onIndexChange={setCurrentIndex}
        onComplete={complete}
      />
    )
  }

  if (screen === 'calculating') return <CalculatingPage onComplete={() => setScreen('result')} />

  const code = determinePersonality(answers)
  const scores = calculateScores(answers)
  const percentages = normalizeScores(scores)
  return <ResultPage code={code} percentages={percentages} onRestart={restart} />
}
