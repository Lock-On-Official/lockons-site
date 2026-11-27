import { normalizeEmail, normalizeWhatsapp } from "./contact";

const DEFAULT_SITE_URL = "https://lockons.com.br";

function readSiteUrl(): string {
  const raw = (process.env.LOCKON_SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
  // Falha no build se o endereço estiver malformado, em vez de publicar canonical quebrado.
  return new URL(raw).origin;
}

export const site = {
  name: "LOCKONS",
  slogan: "Seu CRM, sempre no foco.",
  defaultTitle: "LOCKONS | CRM para equipes de vendas",
  description:
    "CRM para equipes de vendas: contatos, funil de vendas e atividades num só lugar, com indicadores por loja e por vendedor.",
  locale: "pt_BR",
  url: readSiteUrl(),
  appUrl: process.env.LOCKON_APP_URL?.trim() || null,
  /**
   * Canais de contato humano. Lidos no build (só no servidor): vazios ou inválidos, não aparecem.
   * Use só em componentes de servidor; no cliente as variáveis não existem.
   */
  contact: {
    whatsapp: normalizeWhatsapp(process.env.LOCKON_WHATSAPP),
    email: normalizeEmail(process.env.LOCKON_CONTACT_EMAIL),
  },
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).toString();
}
