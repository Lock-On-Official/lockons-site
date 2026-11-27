/**
 * Canais de contato humano (WhatsApp e e-mail), lidos das variáveis LOCKON_WHATSAPP e
 * LOCKON_CONTACT_EMAIL no build. Valor vazio ou inválido: o canal não aparece no site.
 * Sem dependência de framework (testado em tests/contact.test.ts).
 */

const BRAZIL_CODE = "55";

/**
 * Só os dígitos do número, com o código do país. Aceita "(11) 99999-0000", "+55 11 99999-0000"
 * ou "5511999990000". Número brasileiro sem o 55 (10 ou 11 dígitos) ganha o 55.
 * Fora de 12 a 15 dígitos depois disso: null.
 */
export function normalizeWhatsapp(raw: string | undefined | null): string | null {
  const digits = (raw ?? "").replace(/\D/g, "");
  const withCountry = digits.length === 10 || digits.length === 11 ? `${BRAZIL_CODE}${digits}` : digits;
  return withCountry.length >= 12 && withCountry.length <= 15 ? withCountry : null;
}

/** Link que abre a conversa no WhatsApp com uma mensagem pronta. */
export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** "5511999990000" → "(11) 99999-0000"; outros países ficam como "+<dígitos>". */
export function formatWhatsapp(number: string): string {
  const local = number.startsWith(BRAZIL_CODE) ? number.slice(BRAZIL_CODE.length) : null;
  if (!local || (local.length !== 10 && local.length !== 11)) return `+${number}`;
  const area = local.slice(0, 2);
  const rest = local.slice(2);
  const split = rest.length - 4;
  return `(${area}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

/** E-mail aparado e em minúsculas, ou null se não tiver o formato nome@dominio.tld. */
export function normalizeEmail(raw: string | undefined | null): string | null {
  const email = (raw ?? "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : null;
}

/** Mensagem que já chega escrita no WhatsApp da equipe. */
export const WHATSAPP_MESSAGE = "Olá! Vim pelo site e quero ver o LOCKONS com o processo de vendas da minha equipe.";
