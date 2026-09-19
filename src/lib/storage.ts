import type { Answers } from '../types/test'

const STORAGE_KEY = 'tecc-ti-state-v1'

export interface StoredTestState {
  answers: Answers
  currentIndex: number
  completed: boolean
}

const initialState: StoredTestState = {
  answers: {},
  currentIndex: 0,
  completed: false,
}

export function loadTestState(): StoredTestState {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value) return initialState
    const parsed = JSON.parse(value) as Partial<StoredTestState>
    return {
      answers: parsed.answers ?? {},
      currentIndex: Math.min(Math.max(parsed.currentIndex ?? 0, 0), 11),
      completed: Boolean(parsed.completed),
    }
  } catch {
    return initialState
  }
}

export function saveTestState(state: StoredTestState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearTestState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
