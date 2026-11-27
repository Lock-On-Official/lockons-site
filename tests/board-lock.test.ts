import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { moveAnnouncement, nextLockedCard, showsHighPriority } from "../src/lib/board-lock.ts";

describe("nextLockedCard", () => {
  it("a mira passa para o cartão que caiu em Ganho", () => {
    assert.equal(nextLockedCard("Construtora Horizonte", "Padaria Trigo Bom", "success"), "Padaria Trigo Bom");
  });

  it("mover para outras etapas não tira a mira de onde está", () => {
    assert.equal(nextLockedCard("Construtora Horizonte", "Padaria Trigo Bom", "warning"), "Construtora Horizonte");
    assert.equal(nextLockedCard("Construtora Horizonte", "Construtora Horizonte", "default"), "Construtora Horizonte");
    assert.equal(nextLockedCard(null, "Padaria Trigo Bom", "default"), null);
  });
});

describe("showsHighPriority", () => {
  it("o cartão quente mostra 'Alta prioridade' até chegar ao Ganho", () => {
    assert.equal(showsHighPriority(true, "warning"), true);
    assert.equal(showsHighPriority(true, "success"), false);
    assert.equal(showsHighPriority(undefined, "warning"), false);
  });
});

describe("moveAnnouncement", () => {
  it("anuncia a venda ganha e o movimento comum", () => {
    assert.equal(moveAnnouncement("Escola Nova Era", "Ganho", "success"), "Escola Nova Era ganha! A mira travou nesta venda.");
    assert.equal(moveAnnouncement("Escola Nova Era", "Proposta", "default"), "Escola Nova Era movida para Proposta.");
  });
});
