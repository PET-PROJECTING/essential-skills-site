import { ImageResponse } from "next/og";

export const alt = "Essential Skills — skill protocols for AI coding agents";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#ccff00",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "#ccff00",
            }}
          />
          Essential Skills
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Better habits for your AI coding agent
          </div>
          <div
            style={{
              color: "#a3a3ac",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            Curated skill protocols for TDD, SOLID, clean commits, and more.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#66666e",
            fontSize: 22,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          npx essential-skills
        </div>
      </div>
    ),
    { ...size },
  );
}
