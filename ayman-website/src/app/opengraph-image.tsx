import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { person } from "@content/site";

export const dynamic = "force-static";
export const alt = `${person.fullName} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(join(process.cwd(), "src/app/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#071426",
          color: "#f5f1e8",
          padding: 64,
          gap: 56,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#d5b579", textTransform: "uppercase" }}>
            Verkoopadviseur · Webdesigner
          </div>
          <div style={{ fontSize: 84, lineHeight: 1, marginTop: 28, fontFamily: "serif" }}>Mensen.</div>
          <div style={{ fontSize: 84, lineHeight: 1, fontFamily: "serif" }}>Vertrouwen.</div>
          <div style={{ fontSize: 84, lineHeight: 1, fontFamily: "serif", color: "#d5b579", fontStyle: "italic" }}>
            Vooruitgang.
          </div>
          <div style={{ fontSize: 34, marginTop: 40 }}>{person.fullName}</div>
          <div style={{ fontSize: 22, color: "#a9b5c3", marginTop: 6 }}>{`${person.region} · aymanzakelijk.nl`}</div>
        </div>
        <img
          src={src}
          width={384}
          height={480}
          alt=""
          style={{ borderRadius: 28, border: "2px solid rgba(213,181,121,.5)", objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
