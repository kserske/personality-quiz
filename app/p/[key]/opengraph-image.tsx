import { ImageResponse } from "next/og";
import { PERSONALITIES, PersonalityKey } from "@/lib/personalities";

export const alt = "Workplace personality result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { key: string } }) {
  const p = PERSONALITIES[params.key as PersonalityKey] ?? PERSONALITIES.navigator;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c2333",
          color: "#f2efe6",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", height: 8, width: 160, background: p.accent, borderRadius: 4 }} />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 190, marginRight: 52 }}>{p.icon}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, color: "#9aa3bd" }}>
              My workplace personality is
            </div>
            <div style={{ display: "flex", fontSize: 84, marginTop: 8 }}>{p.name}</div>
            <div style={{ display: "flex", fontSize: 38, color: p.accent, marginTop: 12 }}>
              {`\u201c${p.tagline}\u201d`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            {p.traits.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: "2px solid #3a4462",
                  borderRadius: 999,
                  padding: "8px 22px",
                  fontSize: 26,
                  color: "#cfd4e4",
                  marginRight: 14,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9aa3bd", marginTop: 26 }}>
            Which workplace personality are you?
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
