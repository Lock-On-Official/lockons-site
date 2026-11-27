/**
 * Regras da mira no quadro "Do caos ao foco" (testadas em tests/board-lock.test.ts).
 * Só um cartão fica travado por vez: começa no de alta prioridade e passa para o último
 * cartão que caiu numa etapa de sucesso ("Ganho").
 */

/** Os mesmos tons da etiqueta (Chip): "default" é a etapa comum. */
export type StageTone = "default" | "warning" | "success" | "danger";

/** Cartão travado depois de mover `moved` para uma etapa de tom `targetTone`. */
export function nextLockedCard(current: string | null, moved: string, targetTone: StageTone): string | null {
  return targetTone === "success" ? moved : current;
}

/** O cartão de alta prioridade perde a etiqueta "Alta prioridade" quando chega a uma etapa de sucesso. */
export function showsHighPriority(hot: boolean | undefined, stageTone: StageTone): boolean {
  return Boolean(hot) && stageTone !== "success";
}

/** Frase anunciada ao leitor de tela depois do movimento. */
export function moveAnnouncement(name: string, stage: string, targetTone: StageTone): string {
  return targetTone === "success" ? `${name} ganha! A mira travou nesta venda.` : `${name} movida para ${stage}.`;
}
