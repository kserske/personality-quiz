import { NextRequest, NextResponse } from "next/server";
import { saveResult } from "@/lib/db";
import { PERSONALITY_ORDER, PersonalityKey } from "@/lib/personalities";

function isPersonalityKey(value: unknown): value is PersonalityKey {
  return typeof value === "string" && (PERSONALITY_ORDER as string[]).includes(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { displayName, primaryType, secondaryType, scores, answers } = body ?? {};

    if (!isPersonalityKey(primaryType)) {
      return NextResponse.json({ error: "Invalid or missing primaryType." }, { status: 400 });
    }
    if (secondaryType !== null && secondaryType !== undefined && !isPersonalityKey(secondaryType)) {
      return NextResponse.json({ error: "Invalid secondaryType." }, { status: 400 });
    }
    if (!scores || typeof scores !== "object") {
      return NextResponse.json({ error: "Missing scores." }, { status: 400 });
    }
    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing answers." }, { status: 400 });
    }

    await saveResult({
      displayName: typeof displayName === "string" && displayName.trim() ? displayName.trim().slice(0, 80) : null,
      primaryType,
      secondaryType: secondaryType ?? null,
      scores,
      answers,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save quiz result", err);
    return NextResponse.json({ error: "Something went wrong saving your result." }, { status: 500 });
  }
}
