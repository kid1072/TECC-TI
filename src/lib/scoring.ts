import { questions } from '../data/questions'
import { personalityCodes, type Answers, type PersonalityCode, type Scores } from '../types/test'

const emptyScores = (): Scores => ({ ME: 0, HF: 0, CH: 0 })

export function getOptionType(questionId: number, optionId: string): PersonalityCode | undefined {
  return questions
    .find((question) => question.id === questionId)
    ?.options.find((option) => option.id === optionId)?.score
}

export function calculateScores(answers: Answers): Scores {
  return questions.slice(0, 11).reduce((scores, question) => {
    const answer = answers[question.id]
    const type = answer ? getOptionType(question.id, answer) : undefined
    if (type) scores[type] += 1
    return scores
  }, emptyScores())
}

export function determinePersonality(answers: Answers): PersonalityCode {
  const scores = calculateScores(answers)
  const highest = Math.max(...Object.values(scores))
  const leaders = personalityCodes.filter((code) => scores[code] === highest)

  if (leaders.length === 1) return leaders[0]

  const tieBreakerAnswer = answers[12]
  const tieBreakerType = tieBreakerAnswer ? getOptionType(12, tieBreakerAnswer) : undefined
  if (tieBreakerType) return tieBreakerType

  return leaders[0]
}

export function normalizeScores(scores: Scores): Scores {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  if (total === 0) return emptyScores()

  const raw = personalityCodes.map((code) => ({
    code,
    floor: Math.floor((scores[code] / total) * 100),
    remainder: ((scores[code] / total) * 100) % 1,
  }))
  let pointsLeft = 100 - raw.reduce((sum, item) => sum + item.floor, 0)
  const byRemainder = [...raw].sort((a, b) => b.remainder - a.remainder || personalityCodes.indexOf(a.code) - personalityCodes.indexOf(b.code))

  for (let index = 0; index < pointsLeft; index += 1) {
    byRemainder[index].floor += 1
  }
  pointsLeft = 0

  return raw.reduce((percentages, item) => {
    percentages[item.code] = item.floor
    return percentages
  }, emptyScores())
}
