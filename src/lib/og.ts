/** Endereço da imagem de compartilhamento (Open Graph) de cada página: /og/<chave>. */
export function ogKey(path: string): string {
  return path === "/" ? "inicio" : path.replace(/^\/+/, "").replaceAll("/", "-");
}

export function ogImagePath(path: string): string {
  return `/og/${ogKey(path)}`;
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
