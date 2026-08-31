import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jason Te — Backend & Distributed Systems Engineer";

/**
 * next/og supports a small CSS subset: no Tailwind, and any element with more
 * than one child needs an explicit display:flex.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(125deg, #08080b 0%, #1a0b2e 45%, #4A00E0 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, color: "#c4b5fd", letterSpacing: 3 }}>
            SEATTLE, WA · GRADUATING MAY 2027
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 86,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.05,
            }}
          >
            Jason Te
          </div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 40, fontWeight: 600, color: "#d8b4fe" }}>
            Backend &amp; distributed systems engineer
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {[
            ["60×", "write throughput"],
            ["12M", "invariant checks"],
            ["130K", "msg/s on AWS"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 26px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: "#fafafa" }}>{value}</div>
              <div style={{ display: "flex", marginTop: 4, fontSize: 20, color: "#c4b5fd" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
