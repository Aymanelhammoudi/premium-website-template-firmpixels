import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PAGES, getSite, locales, type Locale, type PageKey } from "@content";

export const dynamic = "force-static";

const SIZE = { width: 1200, height: 630 };

/** Eén deelafbeelding (.png) per pagina en taal, plus één per ervaring: /og/about-nl.png, /og/exp-bol-en.png … */
export function generateStaticParams() {
  const pages = (Object.keys(PAGES) as PageKey[]).flatMap((k) => locales.map((l) => ({ file: `${k}-${l}.png` })));
  const exps = getSite("nl").experience.flatMap((e) => locales.map((l) => ({ file: `exp-${e.id}-${l}.png` })));
  return [...pages, ...exps];
}

function parse(file: string): { locale: Locale; key?: PageKey; exp?: string } {
  const m = file.match(/^(?:exp-(.+)|([a-z]+))-(nl|en)\.png$/);
  if (!m) return { locale: "nl", key: "home" };
  return { locale: m[3] as Locale, exp: m[1], key: m[2] as PageKey | undefined };
}

export async function GET(_req: Request, ctx: RouteContext<"/og/[file]">) {
  const { file } = await ctx.params;
  const { locale, key, exp } = parse(file);
  const site = getSite(locale);
  const { person, pages, hero, tracks } = site;

  let eyebrow = locale === "en" ? "Sales Adviser · Web Designer" : "Verkoopadviseur · Webdesigner";
  let lines: string[] = hero.tagline;
  let sub = "";
  if (exp) {
    const e = site.experienceBySlug(exp);
    if (e) {
      eyebrow = `${tracks[e.track].label.split("·").pop()?.trim()} · ${e.period}`;
      lines = [e.company];
      sub = e.role;
    }
  } else if (key && key !== "home") {
    const p = pages[key];
    eyebrow = p.eyebrow;
    lines = [p.title, p.accent];
  }

  const portrait = await readFile(join(process.cwd(), "src/app/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const big = lines.join(" ").length > 40 ? 64 : 80;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#071426", color: "#f5f1e8", padding: 64, gap: 56, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 52, height: 52, borderRadius: 14, background: "#f5f1e8", color: "#071426", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
              ae
            </div>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#d5b579", textTransform: "uppercase" }}>{eyebrow}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {lines.map((l, i) => (
              <div key={i} style={{ display: "flex", fontSize: big, lineHeight: 1.04, letterSpacing: -2, color: i === lines.length - 1 && lines.length > 1 ? "#a9b5c3" : "#f5f1e8" }}>
                {l}
              </div>
            ))}
            {sub && <div style={{ display: "flex", fontSize: 30, color: "#a9b5c3", marginTop: 18 }}>{sub}</div>}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 32 }}>{person.fullName}</div>
            <div style={{ display: "flex", fontSize: 20, color: "#a9b5c3", marginTop: 6 }}>{`${person.region} · aymanzakelijk.nl`}</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- satori (ImageResponse) ondersteunt alleen <img> */}
        <img src={src} width={352} height={440} alt="" style={{ borderRadius: 28, border: "2px solid rgba(213,181,121,.5)", objectFit: "cover" }} />
      </div>
    ),
    SIZE,
  );
}
