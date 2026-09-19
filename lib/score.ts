import { PERSONALITY_ORDER, PersonalityKey } from "./personalities";
import { Allocation } from "./questions";

export interface Answer {
  questionId: number;
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

  for (const answer of answers) {
    for (const alloc of answer.allocations) {
      points[alloc.type] += alloc.weight;
    }
  }

  // Every question contributes exactly 1 point, so this is normally 10 for
  // the full quiz, but we derive it rather than hard-code it in case the
  // question count ever changes.
  const totalPoints = answers.length || 1;

  const percentages = Object.fromEntries(
    PERSONALITY_ORDER.map((k) => [k, Math.round((points[k] / totalPoints) * 100)])
  ) as Record<PersonalityKey, number>;

  const ranked = [...PERSONALITY_ORDER].sort((a, b) => points[b] - points[a]);

  return {
    points,
    percentages,
    ranked,
    primary: ranked[0],
    secondary: ranked[1],
  };
}
