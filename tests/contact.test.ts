import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatWhatsapp, normalizeEmail, normalizeWhatsapp, whatsappLink } from "../src/lib/contact.ts";

describe("normalizeWhatsapp", () => {
  it("aceita número brasileiro em vários formatos e põe o 55", () => {
    assert.equal(normalizeWhatsapp("(11) 99999-0000"), "5511999990000");
    assert.equal(normalizeWhatsapp("+55 11 99999-0000"), "5511999990000");
    assert.equal(normalizeWhatsapp("5511999990000"), "5511999990000");
    assert.equal(normalizeWhatsapp("(11) 3333-4444"), "551133334444");
  });

  it("recusa vazio, curto demais ou longo demais", () => {
    assert.equal(normalizeWhatsapp(undefined), null);
    assert.equal(normalizeWhatsapp(""), null);
    assert.equal(normalizeWhatsapp("99999-0000"), null);
    assert.equal(normalizeWhatsapp("1234567890123456"), null);
  });
});

describe("whatsappLink", () => {
  it("monta o link wa.me com a mensagem codificada", () => {
    assert.equal(
      whatsappLink("5511999990000", "Olá! Quero ver o LOCKONS"),
      "https://wa.me/5511999990000?text=Ol%C3%A1!%20Quero%20ver%20o%20LOCKONS",
    );
  });
});

describe("formatWhatsapp", () => {
  it("formata celular e fixo do Brasil", () => {
    assert.equal(formatWhatsapp("5511999990000"), "(11) 99999-0000");
    assert.equal(formatWhatsapp("551133334444"), "(11) 3333-4444");
  });

  it("deixa número de outro país com +", () => {
    assert.equal(formatWhatsapp("351912345678"), "+351912345678");
  });
});

describe("normalizeEmail", () => {
  it("apara e põe em minúsculas", () => {
    assert.equal(normalizeEmail("  Contato@Lockons.com.br "), "contato@lockons.com.br");
  });

  it("recusa o que não tem formato de e-mail", () => {
    assert.equal(normalizeEmail(""), null);
    assert.equal(normalizeEmail(undefined), null);
    assert.equal(normalizeEmail("contato@lockons"), null);
    assert.equal(normalizeEmail("contato lockons.com.br"), null);
  });
});
