import { sql } from "@vercel/postgres";
import { PersonalityKey } from "./personalities";

let ensured = false;

/**
 * Creates the results table on first use. @vercel/postgres reuses a
 * connection pool under the hood, so this is cheap to call repeatedly,
 * but we still cache the "yes it exists" fact per warm serverless instance.
 */
export async function ensureSchema() {
  if (ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id SERIAL PRIMARY KEY,
      display_name TEXT,
      primary_type TEXT NOT NULL,
      secondary_type TEXT,
      scores JSONB NOT NULL,
      answers JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  ensured = true;
}

export interface StoredResult {
  displayName: string | null;
  primaryType: PersonalityKey;
  secondaryType: PersonalityKey | null;
  scores: Record<PersonalityKey, number>;
  answers: { questionId: number; type: PersonalityKey }[];
}

export async function saveResult(result: StoredResult) {
  await ensureSchema();
  await sql`
    INSERT INTO quiz_results (display_name, primary_type, secondary_type, scores, answers)
    VALUES (
      ${result.displayName},
      ${result.primaryType},
      ${result.secondaryType},
      ${JSON.stringify(result.scores)}::jsonb,
      ${JSON.stringify(result.answers)}::jsonb
    )
  `;
}

export interface AggregateStats {
  total: number;
  counts: Record<PersonalityKey, number>;
}

export async function getAggregateStats(): Promise<AggregateStats> {
  await ensureSchema();
  const { rows } = await sql<{ primary_type: PersonalityKey; count: string }>`
    SELECT primary_type, COUNT(*)::text AS count
    FROM quiz_results
    GROUP BY primary_type
  `;

  const counts: Record<string, number> = {
    navigator: 0,
    firefighter: 0,
    connector: 0,
    detective: 0,
    maverick: 0,
    chameleon: 0,
  };

  let total = 0;
  for (const row of rows) {
    const n = parseInt(row.count, 10);
    counts[row.primary_type] = n;
    total += n;
  }

  return { total, counts: counts as Record<PersonalityKey, number> };
}
