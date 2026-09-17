import { NextResponse } from "next/server";
import { getAggregateStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getAggregateStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Failed to load stats", err);
    return NextResponse.json({ error: "Could not load stats." }, { status: 500 });
  }
}
