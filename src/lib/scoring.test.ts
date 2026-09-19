import { describe, expect, it } from 'vitest'
import { questions } from '../data/questions'
import type { Answers, PersonalityCode } from '../types/test'
import { calculateScores, determinePersonality, normalizeScores } from './scoring'

function answersFor(type: PersonalityCode): Answers {
  return Object.fromEntries(
    questions.map((question) => {
      const option = question.options.find((candidate) => candidate.score === type)
      return [question.id, (option ?? question.options[0]).id]
    }),
  )
}

describe('TECC TI scoring', () => {
  it.each(['ME', 'HF', 'CH'] as const)('returns %s for clearly leaning answers', (type) => {
    expect(determinePersonality(answersFor(type))).toBe(type)
  })

  it('uses question 12 to resolve a tie', () => {
    const tiedAnswers: Answers = {
      1: 'B', 2: 'A', 3: 'C', 4: 'A', 5: 'B', 6: 'C',
      7: 'B', 8: 'A', 9: 'D', 10: 'B', 11: 'C', 12: 'B',
    }
    expect(calculateScores(tiedAnswers)).toEqual({ ME: 4, HF: 4, CH: 3 })
    expect(determinePersonality(tiedAnswers)).toBe('HF')
  })

  it('always produces the same result for identical answers', () => {
    const answers = answersFor('CH')
    const runs = Array.from({ length: 20 }, () => determinePersonality(answers))
    expect(new Set(runs)).toEqual(new Set(['CH']))
  })

  it('normalizes scores to exactly 100 percent', () => {
    const percentages = normalizeScores({ ME: 6, HF: 3, CH: 2 })
    expect(percentages).toEqual({ ME: 55, HF: 27, CH: 18 })
    expect(Object.values(percentages).reduce((sum, value) => sum + value, 0)).toBe(100)
  })
})
