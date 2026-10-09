import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PERSONALITIES, PERSONALITY_ORDER, PersonalityKey } from "@/lib/personalities";

export function generateStaticParams() {
  return PERSONALITY_ORDER.map((key) => ({ key }));
}

export function generateMetadata({ params }: { params: { key: string } }): Metadata {
  const p = PERSONALITIES[params.key as PersonalityKey];
  if (!p) return {};

  const title = `I got ${p.name} ${p.icon}`;
  const description = "Take the quiz and find out which workplace personality you are.";

  return {
    title: `${p.name} \u2014 Which workplace personality are you?`,
    description: `${p.tagline} ${p.description}`,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PersonalityPage({ params }: { params: { key: string } }) {
  const p = PERSONALITIES[params.key as PersonalityKey];
  if (!p) notFound();

  return (
    <main className="stage">
      <div className="field-note">
        <div className="result-card" style={{ "--result-accent": p.accent } as CSSProperties}>
          <p className="result-eyebrow">A friend sent you this one</p>
          <span className="result-icon">{p.icon}</span>
          <h1 className="result-name">{p.name}</h1>
          <p className="result-tagline">&ldquo;{p.tagline}&rdquo;</p>

          <p className="result-secret">Secret thought: &ldquo;{p.secretThought}&rdquo;</p>

          <p className="result-description">{p.description}</p>

          <div className="trait-chips">
            {p.traits.map((t) => (
              <span className="trait-chip" key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className="result-blocks">
            <div className="result-block">
              <p className="result-block-label">Special ability</p>
              <p className="result-block-value">
                {p.ability.icon} {p.ability.name}
              </p>
            </div>
            <div className="result-block">
              <p className="result-block-label">Watch out for</p>
              <p className="result-block-value">{p.watchOut}</p>
            </div>
          </div>

          <div className="result-actions">
            <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
              Find out which one you are &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
