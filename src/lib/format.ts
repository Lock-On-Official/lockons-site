const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** Valor em reais sem centavos, como nos cartões do funil: "R$ 18.400". */
export function formatBRL(value: number): string {
  return brl.format(value);
}
