import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { matchesPath } from "../src/lib/path-match.ts";

describe("matchesPath", () => {
  it("casa com o próprio caminho e com as páginas abaixo dele", () => {
    assert.equal(matchesPath("/produto", ["/produto"]), true);
    assert.equal(matchesPath("/produto/funil-de-vendas", ["/produto"]), true);
  });

  it("não casa com um caminho que só começa com as mesmas letras", () => {
    assert.equal(matchesPath("/produtos", ["/produto"]), false);
    assert.equal(matchesPath("/blogueiro", ["/blog"]), false);
  });

  it("aceita vários prefixos e falha com a lista vazia", () => {
    assert.equal(matchesPath("/implantacao", ["/seguranca", "/implantacao"]), true);
    assert.equal(matchesPath("/", []), false);
  });
});
