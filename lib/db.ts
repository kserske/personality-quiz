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
      device_id TEXT,
      primary_type TEXT NOT NULL,
      secondary_type TEXT,
      scores JSONB NOT NULL,
      answers JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  // Safe to re-run: adds the column for databases created before this feature existed.
  await sql`ALTER TABLE quiz_results ADD COLUMN IF NOT EXISTS device_id TEXT;`;
  // Partial index: only enforces uniqueness when a device_id is actually present,
  // so older rows (or submissions where localStorage wasn't available) aren't affected.
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS quiz_results_device_id_unique
    ON quiz_results (device_id)
    WHERE device_id IS NOT NULL;
  `;
  ensured = true;
}

export interface StoredResult {
  displayName: string | null;
  deviceId: string | null;
  primaryType: PersonalityKey;
  secondaryType: PersonalityKey | null;
  scores: Record<PersonalityKey, number>;
  answers: { questionId: number; allocations: { type: PersonalityKey; weight: number }[] }[];
}

/**
 * Inserts a result unless a row with the same device_id already exists, in
 * which case nothing is written. Returns whether this call actually saved a
 * new row, so the caller can tell a first-time submission from a repeat.
 */
export async function saveResult(result: StoredResult): Promise<{ saved: boolean }> {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO quiz_results (display_name, device_id, primary_type, secondary_type, scores, answers)
    VALUES (
      ${result.displayName},
      ${result.deviceId},
      ${result.primaryType},
      ${result.secondaryType},
      ${JSON.stringify(result.scores)}::jsonb,
      ${JSON.stringify(result.answers)}::jsonb
    )
    ON CONFLICT (device_id) WHERE device_id IS NOT NULL DO NOTHING
    RETURNING id
  `;
  return { saved: rows.length > 0 };
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
