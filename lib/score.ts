import { PERSONALITY_ORDER, PersonalityKey } from "./personalities";
import { Allocation } from "./questions";

export interface Answer {
  questionId: number;
  letter: string; // the option letter chosen, e.g. "B"
  allocations: Allocation[]; // the chosen option's allocations, weights sum to 1
}

export interface ScoreResult {
  points: Record<PersonalityKey, number>; // e.g. 2.5 out of 10
  percentages: Record<PersonalityKey, number>; // rounded, sums to ~100
  ranked: PersonalityKey[];
  primary: PersonalityKey;
  secondary: PersonalityKey;
}

export function scoreAnswers(answers: Answer[]): ScoreResult {
  const points = Object.fromEntries(PERSONALITY_ORDER.map((k) => [k, 0])) as Record<
    PersonalityKey,
    number
  >;

  // Count how many 100% (non-split) answers each personality received.
  // Used only to break ties in total points.
  const pureAnswers = Object.fromEntries(PERSONALITY_ORDER.map((k) => [k, 0])) as Record<
    PersonalityKey,
    number
  >;

  for (const answer of answers) {
    for (const alloc of answer.allocations) {
      points[alloc.type] += alloc.weight;
    }
    if (answer.allocations.length === 1) {
      pureAnswers[answer.allocations[0].type] += 1;
    }
  }

  // Every question contributes exactly 1 point, so this is normally 10 for
  // the full quiz, but we derive it rather than hard-code it in case the
  // question count ever changes.
  const totalPoints = answers.length || 1;

  const percentages = Object.fromEntries(
    PERSONALITY_ORDER.map((k) => [k, Math.round((points[k] / totalPoints) * 100)])
  ) as Record<PersonalityKey, number>;

  // Highest points first; if tied, the personality with more pure (100%)
  // answers ranks higher. Anything still tied keeps the fixed order in
  // PERSONALITY_ORDER (see README for the suggested next tiebreaker).
  const ranked = [...PERSONALITY_ORDER].sort(
    (a, b) => points[b] - points[a] || pureAnswers[b] - pureAnswers[a]
  );

  return {
    points,
    percentages,
    ranked,
    primary: ranked[0],
    secondary: ranked[1],
  };
}
