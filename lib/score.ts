import { PERSONALITY_ORDER, PersonalityKey } from "./personalities";

export interface Answer {
  questionId: number;
  type: PersonalityKey;
}

export interface ScoreResult {
  counts: Record<PersonalityKey, number>;
  percentages: Record<PersonalityKey, number>;
  ranked: PersonalityKey[];
  primary: PersonalityKey;
  secondary: PersonalityKey | null;
}

export function scoreAnswers(answers: Answer[]): ScoreResult {
  const counts = Object.fromEntries(PERSONALITY_ORDER.map((k) => [k, 0])) as Record<
    PersonalityKey,
    number
  >;

  for (const answer of answers) {
    counts[answer.type] += 1;
  }

  const total = answers.length || 1;
  const percentages = Object.fromEntries(
    PERSONALITY_ORDER.map((k) => [k, Math.round((counts[k] / total) * 100)])
  ) as Record<PersonalityKey, number>;

  const ranked = [...PERSONALITY_ORDER].sort((a, b) => counts[b] - counts[a]);

  const primary = ranked[0];
  const secondary = ranked[1] ?? null;

  return { counts, percentages, ranked, primary, secondary };
}
