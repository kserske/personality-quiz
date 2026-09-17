import Link from "next/link";
import { getAggregateStats } from "@/lib/db";
import { PERSONALITIES, PERSONALITY_ORDER } from "@/lib/personalities";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  let stats;
  let loadError = false;

  try {
    stats = await getAggregateStats();
  } catch {
    loadError = true;
    stats = { total: 0, counts: Object.fromEntries(PERSONALITY_ORDER.map((k) => [k, 0])) } as any;
  }

  const ranked = [...PERSONALITY_ORDER].sort((a, b) => stats.counts[b] - stats.counts[a]);

  return (
    <main className="stage">
      <div className="field-note">
        <p className="landing-kicker">Live from everyone who has taken it</p>
        <h1 className="landing-title">The room, so far.</h1>
        <p className="landing-sub">
          {stats.total > 0
            ? `${stats.total} ${stats.total === 1 ? "person has" : "people have"} taken the quiz.`
            : "No results yet \u2014 be the first."}
        </p>

        <div className="result-card">
          {loadError && (
            <p className="secondary-note">
              Couldn&rsquo;t load live results right now. If you just deployed this project, make
              sure a Postgres database is connected in the Vercel Storage tab.
            </p>
          )}

          {!loadError &&
            ranked.map((key) => {
              const p = PERSONALITIES[key];
              const pct = stats.total > 0 ? Math.round((stats.counts[key] / stats.total) * 100) : 0;
              return (
                <div className="breakdown-row" key={key}>
                  <span>{p.icon}</span>
                  <span>{p.name.replace("The ", "")}</span>
                  <span className="breakdown-track">
                    <span
                      className="breakdown-fill"
                      style={{ width: `${pct}%`, background: p.accent }}
                    />
                  </span>
                  <span>{pct}%</span>
                </div>
              );
            })}

          <div className="result-actions">
            <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
              Take the quiz
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
