import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { ogEntries } from "@/content/og";
import { OG_SIZE, ogKey } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * Imagem de compartilhamento de cada página (1200 × 630), gerada no build: fundo azul-marinho,
 * logo, selo, o título da página e a mira ao fundo. As fontes vão em TTF porque o gerador não lê WOFF2.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogEntries.map((entry) => ({ key: ogKey(entry.path) }));
}

const FONTS_DIR = path.join(process.cwd(), "src/assets/fonts");

// A mira do logo em traço branco, para o fundo.
const reticleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" stroke="white">
<circle cx="100" cy="100" r="97" stroke-width="0.8"/>
<circle cx="100" cy="100" r="89" stroke-width="4" stroke-dasharray="1.2 8.12"/>
<circle cx="100" cy="100" r="76" stroke-width="12" stroke-dasharray="107.4 12" stroke-dashoffset="113.4"/>
<g stroke-width="6" stroke-linecap="round"><line x1="100" y1="6" x2="100" y2="34"/><line x1="166" y1="100" x2="194" y2="100"/><line x1="100" y1="166" x2="100" y2="194"/><line x1="6" y1="100" x2="34" y2="100"/></g>
<circle cx="100" cy="100" r="46" stroke-width="0.8" stroke-dasharray="3 5"/></svg>`;

function dataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const entry = ogEntries.find((item) => ogKey(item.path) === key);
  if (!entry) return new Response("Imagem não encontrada", { status: 404 });

  const [sora, inter, logo] = await Promise.all([
    readFile(path.join(FONTS_DIR, "Sora-SemiBold.ttf")),
    readFile(path.join(FONTS_DIR, "Inter-Medium.ttf")),
    readFile(path.join(process.cwd(), "src/app/icon.svg"), "utf8"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundImage: "linear-gradient(135deg, #123C9D 0%, #163B8C 60%, #0E2E73 100%)",
          fontFamily: "Inter",
          color: "#F1F5FD",
        }}
      >
        <img
          src={dataUri(reticleSvg)}
          width={620}
          height={620}
          style={{ position: "absolute", right: -150, top: 5, opacity: 0.14 }}
          alt=""
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "#FFFFFF",
            }}
          >
            <img src={dataUri(logo)} width={52} height={52} alt="" />
          </div>
          <div style={{ display: "flex", fontFamily: "Sora", fontSize: 34, letterSpacing: 1.5 }}>
            <span style={{ color: "#FFFFFF" }}>LOCK</span>
            <span style={{ color: "#48A9F4" }}>ONS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.12)",
              color: "#A9CDFB",
              fontSize: 26,
            }}
          >
            {entry.eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily: "Sora", fontSize: 66, lineHeight: 1.08, color: "#FFFFFF", textWrap: "balance" }}>
            {entry.title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#BCD0F7" }}>
          <span>{site.slogan}</span>
          <span>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Sora", data: sora, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
