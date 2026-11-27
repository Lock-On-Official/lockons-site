/**
 * Regras do blog (src/lib/blog.ts). Roda com `npm test` (node --test, sem dependência):
 * o Node 22.18+ executa TypeScript apagando os tipos.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { BlogBlock, BlogPost } from "../src/content/blog.ts";
import {
  blogPostPath,
  findPost,
  formatPostDate,
  headingId,
  readingMinutes,
  relatedPosts,
  sortByNewest,
  tableOfContents,
  WORDS_PER_MINUTE,
} from "../src/lib/blog.ts";

function makePost(slug: string, category: string, publishedAt: string): BlogPost {
  return {
    slug,
    title: `Artigo ${slug}`,
    description: "Resumo.",
    category,
    icon: "book",
    publishedAt,
    body: [{ type: "p", text: "Texto." }],
    product: { label: "Produto", href: "/produto" },
  };
}

function words(count: number): string {
  return Array.from({ length: count }, () => "palavra").join(" ");
}

describe("readingMinutes", () => {
  it("arredonda para cima a partir das palavras de todos os tipos de bloco", () => {
    const body: BlogBlock[] = [
      { type: "h2", text: words(10) },
      { type: "p", text: words(WORDS_PER_MINUTE) },
      { type: "list", items: [words(5), words(5)] },
      { type: "tip", title: "Na prática", text: words(3) },
    ];
    // 10 + 200 + 10 + 2 + 3 = 225 palavras → 2 minutos
    assert.equal(readingMinutes(body), 2);
  });

  it("nunca dá zero, nem com o corpo vazio ou só espaços", () => {
    assert.equal(readingMinutes([]), 1);
    assert.equal(readingMinutes([{ type: "p", text: "   " }]), 1);
  });

  it("dá exatamente 1 minuto no limite de palavras por minuto", () => {
    assert.equal(readingMinutes([{ type: "p", text: words(WORDS_PER_MINUTE) }]), 1);
  });
});

describe("sortByNewest", () => {
  it("põe o mais recente primeiro e mantém a ordem original na mesma data", () => {
    const list = [makePost("a", "x", "2026-01-10"), makePost("b", "x", "2026-03-01"), makePost("c", "x", "2026-01-10")];
    assert.deepEqual(
      sortByNewest(list).map((post) => post.slug),
      ["b", "a", "c"],
    );
  });

  it("não altera a lista recebida", () => {
    const list = [makePost("a", "x", "2026-01-10"), makePost("b", "x", "2026-03-01")];
    sortByNewest(list);
    assert.deepEqual(
      list.map((post) => post.slug),
      ["a", "b"],
    );
  });
});

describe("relatedPosts", () => {
  const list = [
    makePost("atual", "Gestão", "2026-05-01"),
    makePost("outra-antiga", "Funil", "2026-01-01"),
    makePost("mesma-antiga", "Gestão", "2026-02-01"),
    makePost("outra-nova", "Funil", "2026-06-01"),
    makePost("mesma-nova", "Gestão", "2026-04-01"),
  ];

  it("traz primeiro a mesma categoria e depois as outras, cada grupo do mais novo ao mais antigo", () => {
    assert.deepEqual(
      relatedPosts(list, "atual", 4).map((post) => post.slug),
      ["mesma-nova", "mesma-antiga", "outra-nova", "outra-antiga"],
    );
  });

  it("nunca inclui o próprio artigo e respeita o limite", () => {
    const related = relatedPosts(list, "atual");
    assert.equal(related.length, 3);
    assert.ok(related.every((post) => post.slug !== "atual"));
  });

  it("com um endereço desconhecido, devolve os mais recentes", () => {
    assert.deepEqual(
      relatedPosts(list, "nao-existe", 2).map((post) => post.slug),
      ["outra-nova", "atual"],
    );
  });
});

describe("findPost e blogPostPath", () => {
  it("acha pelo endereço e devolve undefined quando não existe", () => {
    const list = [makePost("um", "x", "2026-01-01")];
    assert.equal(findPost(list, "um")?.slug, "um");
    assert.equal(findPost(list, "dois"), undefined);
  });

  it("monta o caminho do artigo", () => {
    assert.equal(blogPostPath("follow-up-de-vendas"), "/blog/follow-up-de-vendas");
  });
});

describe("formatPostDate", () => {
  it("escreve a data por extenso em português, sem voltar um dia por causa do fuso", () => {
    assert.equal(formatPostDate("2026-11-22"), "22 de novembro de 2026");
    assert.equal(formatPostDate("2026-01-01"), "1 de janeiro de 2026");
  });
});

describe("headingId e tableOfContents", () => {
  it("tira acentos e pontuação e usa hífen", () => {
    assert.equal(headingId("Funil por etapa: onde está o dinheiro?"), "funil-por-etapa-onde-esta-o-dinheiro");
    assert.equal(headingId("1. Ninguém sabe qual é a versão certa"), "1-ninguem-sabe-qual-e-a-versao-certa");
  });

  it("lista só os subtítulos, na ordem do texto", () => {
    const body: BlogBlock[] = [
      { type: "p", text: "Abertura." },
      { type: "h2", text: "Primeiro passo" },
      { type: "list", items: ["um"] },
      { type: "h2", text: "Segundo passo" },
    ];
    assert.deepEqual(tableOfContents(body), [
      { id: "primeiro-passo", text: "Primeiro passo" },
      { id: "segundo-passo", text: "Segundo passo" },
    ]);
  });
});

describe("artigos publicados", () => {
  it("têm data AAAA-MM-DD válida e endereço único", async () => {
    const { posts } = await import("../src/content/blog.ts");
    const slugs = new Set<string>();
    for (const post of posts) {
      assert.match(post.publishedAt, /^\d{4}-\d{2}-\d{2}$/, post.slug);
      assert.doesNotThrow(() => formatPostDate(post.publishedAt), post.slug);
      assert.ok(!slugs.has(post.slug), `endereço repetido: ${post.slug}`);
      slugs.add(post.slug);
    }
  });
});
