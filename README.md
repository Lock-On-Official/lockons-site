# LOCKONS: site público

Site institucional do LOCKONS (CRM), feito em Next.js para ser encontrado no Google. O sistema em si fica no repositório `crm-lockon` e no frontend React; este repositório tem só as páginas públicas.

## Requisitos

- Node.js 20.9 ou mais novo.

## Comandos

```bash
npm install          # instala as dependências (versões fixas, ver .npmrc)
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção; também confere os tipos
npm run start        # serve o build
npm run typecheck    # só a checagem de tipos
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Seguem o prefixo `LOCKON_` do projeto.

| Variável | Para quê | Padrão |
|---|---|---|
| `LOCKON_SITE_URL` | Endereço público. Entra no canonical, no `sitemap.xml` e no `robots.txt`. | `https://lockons.com.br` |
| `LOCKON_APP_URL` | Destino do link "Entrar". Vazio: o link não aparece. | vazio |

As duas são lidas no build: mudar o valor exige um build novo.

## Estrutura

```text
src/
├── app/                  rotas do Next (App Router), robots.ts, sitemap.ts, ícone
├── components/
│   ├── brand/            logo e a mira em SVG
│   ├── site-header/      header fixo e menu do celular
│   ├── site-footer/      rodapé com links para todas as páginas
│   ├── ui/               botão (ButtonLink), selo do hero (Eyebrow), etiqueta (Chip), ícones e lista com visto
│   ├── cards/            cartão de oportunidade e cartão de indicador
│   ├── scene-3d/         cena 3D em CSS: palco (Scene3D), itens (SceneItem), mira (Reticle3D) e a cena do hero
│   ├── section/          cabeçalho de seção e bloco texto + ilustração (FeatureSplit)
│   ├── mockups/          ilustrações das telas (contatos, funil, atividades), com dados fictícios
│   ├── chaos-board/      quadro "do caos ao foco", que se organiza com a rolagem
│   ├── audience-tabs/    abas "Para quem" e o painel de cada papel
│   ├── faq/              perguntas em acordeão
│   ├── cta-band/         faixa azul-marinho de fechamento
│   ├── breadcrumbs/      trilha de navegação com BreadcrumbList
│   └── seo/              JsonLd, para dados estruturados
├── content/              textos das páginas (home, papéis, perguntas) e o mapa único das páginas (routes.ts)
├── lib/                  configuração (site.ts), metadados (seo.ts), dados estruturados e formatação
└── styles/tokens.css     cores, fontes e medidas do protótipo aprovado
```

## Convenções

- **Endereços das páginas em português** (`/produto/funil-de-vendas`): é o que as pessoas buscam no Google. Código, nomes de arquivo e componentes ficam em inglês; textos, comentários e documentação, em português.
- **Página nova:**
  1. crie a rota em `src/app`;
  2. exporte `metadata` com `pageMetadata({ title, description, path })`, que define o canonical da própria página;
  3. marque `published: true` em `src/content/routes.ts`, para ela entrar no sitemap.
- **Visual:** use os tokens de `src/styles/tokens.css`. O azul-royal (`--royal`) é só para o que é clicável.
- **Seções:** use `<Section tone>`. As páginas alternam `plain` (fundo pontilhado) e `tint` (azul-claro), com `navy` para o momento de destaque e a `CtaBand` azul-marinho no fim.
- **Fontes:** Sora (títulos) e Inter (texto), servidas pelo `next/font` do próprio domínio.
- **Cena 3D:** é só CSS, sem biblioteca. Os itens são posicionados num palco de 440 × 440 px (`x`, `y`) e em profundidade (`z`). A cena se ajusta à largura disponível e inclina com o mouse dentro do elemento marcado com `data-scene-tilt`. Com "reduzir movimento" ligado no sistema, fica parada.
- **Dados de exemplo** nos cartões e nas ilustrações (empresas, pessoas, valores) são fictícios.
- **Textos:** ficam em `src/content/` e só descrevem o que o produto entrega (ver `docs/escopo-mvp.md` do `crm-lockon`). Ao mudar o escopo, revise principalmente `faq.ts`.
- **Dados estruturados:** Organization e WebSite em todas as páginas (layout); SoftwareApplication na home. Sem preço nem avaliação enquanto não existirem.
