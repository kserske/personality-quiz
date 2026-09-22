"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, Option } from "@/lib/questions";
import { PERSONALITIES, PERSONALITY_ORDER, PersonalityKey } from "@/lib/personalities";
import { Answer, scoreAnswers } from "@/lib/score";

type Stage = "landing" | "quiz" | "result";

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing");
  const [displayName, setDisplayName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const result = useMemo(() => (answers.length === QUESTIONS.length ? scoreAnswers(answers) : null), [answers]);

  function startQuiz() {
    setAnswers([]);
    setQuestionIndex(0);
    setSaveStatus("idle");
    setStage("quiz");
  }

  function chooseOption(option: Option) {
    const question = QUESTIONS[questionIndex];
    const nextAnswers = [...answers, { questionId: question.id, allocations: option.allocations }];
    setAnswers(nextAnswers);

    if (questionIndex + 1 < QUESTIONS.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStage("result");
      submitResult(nextAnswers);
    }
  }

  async function submitResult(finalAnswers: Answer[]) {
    const scored = scoreAnswers(finalAnswers);
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim() || null,
          primaryType: scored.primary,
          secondaryType: scored.secondary,
          scores: scored.points,
          answers: finalAnswers,
        }),
      });
      setSaveStatus(res.ok ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <main className="stage">
      {stage === "landing" && (
        <Landing displayName={displayName} onNameChange={setDisplayName} onStart={startQuiz} />
      )}

      {stage === "quiz" && (
        <QuizStep
          index={questionIndex}
          total={QUESTIONS.length}
          onChoose={chooseOption}
        />
      )}

      {stage === "result" && result && (
        <ResultReveal
          result={result}
          displayName={displayName}
          saveStatus={saveStatus}
          onRetake={startQuiz}
        />
      )}

      <footer className="credit">
        <Link href="/stats" prefetch={false}>
          See the live results from everyone else &rarr;
        </Link>
        <p className="credit-line">Created by Gilson from HRSC BES SI Team</p>
      </footer>
    </main>
  );
}

function Landing({
  displayName,
  onNameChange,
  onStart,
}: {
  displayName: string;
  onNameChange: (value: string) => void;
  onStart: () => void;
}) {
  const [openBadge, setOpenBadge] = useState<PersonalityKey | null>(null);

  function onToggleBadge(key: PersonalityKey) {
    setOpenBadge((current) => (current === key ? null : key));
  }

  return (
    <div className="field-note">
      <p className="landing-kicker">A field guide, 10 questions</p>
      <h1 className="landing-title">
        Which workplace <em>personality</em> are you?
      </h1>
      <p className="landing-sub">
        From your first awkward morning to the day someone announces there&rsquo;s food in the
        pantry &mdash; ten small moments, one honest answer to each, and a read on how you
        actually operate.
      </p>

      <div className="badge-ring">
        {PERSONALITY_ORDER.map((key) => {
          const p = PERSONALITIES[key];
          const isOpen = openBadge === key;
          return (
            <button
              type="button"
              className={`badge${isOpen ? " badge-open" : ""}`}
              key={key}
              onClick={() => onToggleBadge(key)}
              aria-expanded={isOpen}
            >
              <span className="badge-icon">{p.icon}</span>
              <span className="badge-name">{p.name.replace("The ", "")}</span>
            </button>
          );
        })}
      </div>

      {openBadge && (
        <div
          className="badge-detail"
          style={{ "--secondary-accent": PERSONALITIES[openBadge].accent } as React.CSSProperties}
        >
          <p className="badge-detail-tagline">&ldquo;{PERSONALITIES[openBadge].tagline}&rdquo;</p>
          <p className="badge-detail-trait">{PERSONALITIES[openBadge].coreTrait}</p>
          <p className="badge-detail-description">{PERSONALITIES[openBadge].description}</p>
        </div>
      )}

      <div className="name-field">
        <label htmlFor="displayName">Name (optional)</label>
        <input
          id="displayName"
          value={displayName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="So your result has your name on it"
          maxLength={80}
        />
        <span className="hint">Only used to label your result &mdash; skip it and stay anonymous.</span>
      </div>

      <button className="btn-primary" onClick={onStart}>
        Start the quiz &rarr;
      </button>
    </div>
  );
}

function QuizStep({
  index,
  total,
  onChoose,
}: {
  index: number;
  total: number;
  onChoose: (option: Option) => void;
}) {
  const question = QUESTIONS[index];
  const progress = ((index) / total) * 100;

  return (
    <div className="field-note">
      <div className="quiz-header">
        <span className="quiz-tag">
          Question {index + 1} of {total}
        </span>
      </div>
      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-card" key={question.id}>
        <span className="question-emoji">{question.emoji}</span>
        <h2 className="question-title">{question.title}</h2>
        <p className="question-prompt">{question.prompt}</p>

        <div className="option-list">
          {question.options.map((opt) => (
            <button
              key={opt.letter}
              className="option-row"
              onClick={() => onChoose(opt)}
            >
              <span className="option-letter">{opt.letter}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultReveal({
  result,
  displayName,
  saveStatus,
  onRetake,
}: {
  result: ReturnType<typeof scoreAnswers>;
  displayName: string;
  saveStatus: "idle" | "saving" | "saved" | "error";
  onRetake: () => void;
}) {
  const primary = PERSONALITIES[result.primary];
  const secondary = PERSONALITIES[result.secondary];

  return (
    <div className="field-note">
      <div
        className="result-card"
        style={{ "--result-accent": primary.accent } as React.CSSProperties}
      >
        <p className="result-eyebrow">
          {displayName.trim() ? `${displayName.trim()}, your result is in` : "Your result is in"}
        </p>
        <span className="result-icon">{primary.icon}</span>
        <h2 className="result-name">
          {primary.name} <span className="result-percent">{result.percentages[result.primary]}%</span>
        </h2>
        <p className="result-tagline">&ldquo;{primary.tagline}&rdquo;</p>

        <p className="result-secret">
          Secret thought, revealed: &ldquo;{primary.secretThought}&rdquo;
        </p>

        <p className="result-description">{primary.description}</p>

        <div className="trait-chips">
          {primary.traits.map((t) => (
            <span className="trait-chip" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="result-blocks">
          <div className="result-block">
            <p className="result-block-label">Special ability</p>
            <p className="result-block-value">
              {primary.ability.icon} {primary.ability.name}
            </p>
          </div>
          <div className="result-block">
            <p className="result-block-label">Watch out for</p>
            <p className="result-block-value">{primary.watchOut}</p>
          </div>
        </div>

        <div
          className="secondary-card"
          style={{ "--secondary-accent": secondary.accent } as React.CSSProperties}
        >
          <p className="secondary-kicker">Your secondary style</p>
          <div className="secondary-heading">
            <span className="secondary-icon">{secondary.icon}</span>
            <div>
              <p className="secondary-name">
                {secondary.name} <span className="result-percent">{result.percentages[result.secondary]}%</span>
              </p>
              <p className="secondary-tagline">&ldquo;{secondary.tagline}&rdquo;</p>
            </div>
          </div>
          <p className="secondary-description">{secondary.description}</p>
          <div className="trait-chips">
            {secondary.traits.map((t) => (
              <span className="trait-chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="result-blocks">
            <div className="result-block">
              <p className="result-block-label">Special ability</p>
              <p className="result-block-value">
                {secondary.ability.icon} {secondary.ability.name}
              </p>
            </div>
            <div className="result-block">
              <p className="result-block-label">Watch out for</p>
              <p className="result-block-value">{secondary.watchOut}</p>
            </div>
          </div>
          <p className="secondary-note">
            You lead with <strong>{primary.name}</strong>, and this is the style that shows up
            right after it &mdash; not your whole personality, but the instinct that kicks in
            once your first one is covered.
          </p>
        </div>

        <p className="breakdown-title">Full breakdown</p>
        {result.ranked.map((key) => {
          const p = PERSONALITIES[key];
          return (
            <div className="breakdown-row" key={key}>
              <span>{p.icon}</span>
              <span>{p.name.replace("The ", "")}</span>
              <span className="breakdown-track">
                <span
                  className="breakdown-fill"
                  style={{ width: `${result.percentages[key]}%`, background: p.accent }}
                />
              </span>
              <span>{result.percentages[key]}%</span>
            </div>
          );
        })}

        <div className="result-actions">
          <button className="btn-primary" onClick={onRetake}>
            Take it again
          </button>
        </div>

        <p className="save-status">
          {saveStatus === "saving" && "Saving your result\u2026"}
          {saveStatus === "saved" && "Saved \u2014 thanks for taking part."}
          {saveStatus === "error" && "Couldn't save your result, but here it is anyway."}
        </p>
      </div>
    </div>
  );
}
