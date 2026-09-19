import { describe, expect, it } from 'vitest'
import { questionsByLocale } from './questions'
import { resultsByLocale } from './results'

describe('localized test content', () => {
  it('keeps question and scoring structures identical in both languages', () => {
    const chinese = questionsByLocale.zh
    const english = questionsByLocale.en

    expect(chinese).toHaveLength(12)
    expect(english).toHaveLength(12)
    expect(english.map((question) => ({
      id: question.id,
      tieBreaker: Boolean(question.tieBreaker),
      options: question.options.map((option) => ({ id: option.id, score: option.score })),
    }))).toEqual(chinese.map((question) => ({
      id: question.id,
      tieBreaker: Boolean(question.tieBreaker),
      options: question.options.map((option) => ({ id: option.id, score: option.score })),
    })))
  })

  it('provides complete localized result content for every personality', () => {
    for (const locale of ['zh', 'en'] as const) {
      for (const code of ['ME', 'HF', 'CH'] as const) {
        const result = resultsByLocale[locale][code]
        expect(result.code).toBe(code)
        expect(result.name.length).toBeGreaterThan(0)
        expect(result.description.length).toBeGreaterThan(0)
        expect(result.projects.length).toBeGreaterThanOrEqual(3)
      }
    }
  })
})
