export const personalityCodes = ['ME', 'HF', 'CH'] as const

export type PersonalityCode = (typeof personalityCodes)[number]

export interface AnswerOption {
  id: string
  label: string
  score: PersonalityCode
}

export interface Question {
  id: number
  prompt: string
  options: AnswerOption[]
  tieBreaker?: boolean
}

export interface ProjectRecommendation {
  name: string
  code?: string
  description: string
}

export interface PersonalityResult {
  code: PersonalityCode
  name: string
  tag: string
  department: string
  description: string
  slogan: string
  projects: ProjectRecommendation[]
  accent: string
  tint: string
  artwork: string
}

export type Answers = Record<number, string>
export type Scores = Record<PersonalityCode, number>
