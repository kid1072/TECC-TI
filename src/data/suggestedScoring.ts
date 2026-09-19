import type { PersonalityCode } from '../types/test'

// Review-only proposal. The running test intentionally uses the original mappings.
export const suggestedScoring: Record<number, Record<string, PersonalityCode>> = {
  1: { A: 'ME', B: 'CH', C: 'HF', D: 'CH' },
  2: { A: 'ME', B: 'HF', C: 'CH', D: 'ME' },
  3: { A: 'HF', B: 'CH', C: 'ME', D: 'CH' },
  4: { A: 'HF', B: 'CH', C: 'ME', D: 'ME' },
  5: { A: 'HF', B: 'ME', C: 'HF', D: 'CH' },
  6: { A: 'ME', B: 'HF', C: 'CH' },
  7: { A: 'ME', B: 'HF', C: 'CH', D: 'HF' },
  8: { A: 'ME', B: 'ME', C: 'CH', D: 'CH' },
  9: { A: 'HF', B: 'ME', C: 'CH', D: 'HF' },
  10: { A: 'ME', B: 'HF', C: 'CH', D: 'HF' },
  11: { A: 'ME', B: 'HF', C: 'CH' },
  12: { A: 'ME', B: 'HF', C: 'CH' },
}
