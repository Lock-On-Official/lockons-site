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
├── assets/photos/        fotos (ver "Fotos" no fim)
├── components/
│   ├── brand/            logo e a mira em SVG
│   ├── site-header/      header fixo e menu do celular
│   ├── site-footer/      rodapé com links para todas as páginas
│   ├── ui/               botão (ButtonLink), selo do hero (Eyebrow), etiqueta (Chip), ícones e lista com visto
│   ├── cards/            cartão de oportunidade e cartão de indicador
│   ├── scene-3d/         cena 3D em CSS: palco (Scene3D), itens (SceneItem), mira (Reticle3D) e a cena do hero
│   ├── hero-visuals/     ilustrações animadas dos heros internos e o ScaleBox que as escala
│   ├── photo-card/       foto com o tratamento da marca e um cartão do sistema por cima
│   ├── section/          Section (tom do fundo), SectionHeader, SplitGrid (duas colunas) e FeatureSplit (texto + ilustração)
│   ├── page-hero/        hero das páginas internas, com a trilha de navegação e a cena 3D
│   ├── info-cards/       grade de cartões com ícone, título, texto e link
│   ├── mockups/          ilustrações das telas (contatos, funil, atividades, indicadores, lojas), com dados fictícios
│   ├── chaos-board/      quadro "do caos ao foco", que se organiza com a rolagem
│   ├── audience-tabs/    abas "Para quem" e o painel de cada papel
│   ├── faq/              perguntas em acordeão
│   ├── cta-band/         faixa azul-marinho de fechamento
│   ├── breadcrumbs/      trilha de navegação com BreadcrumbList
│   └── seo/              JsonLd, para dados estruturados
├── content/              textos das páginas (home, produto e funcionalidades, papéis, segurança, implantação, perguntas, fotos) e o mapa único das páginas (routes.ts)
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
- **Funcionalidade nova:** acrescente em `src/content/features.ts` (o tipo `FeatureSlug` obriga a dar a ilustração do hero e a da seção "como funciona" em `src/app/produto/[slug]/page.tsx`) e a rota em `routes.ts`. Endereços fora da lista dão 404.
- **Seções:** use `<Section tone decor>`. As páginas alternam `plain` (fundo pontilhado) e `tint` (azul-claro), com `navy` para o momento de destaque e a `CtaBand` azul-marinho no fim.
- **Fundos (`decor`):** a mira grande (`reticle`) só na primeira seção depois do hero; nas outras, varie entre `network` (rede de contatos), `lanes` (raias do funil), `chart` (gráfico) e `route` (trilha de follow-up), alternando o lado com `decorSide`.
- **Largura:** o conteúdo ocupa 90% da tela (5% de margem de cada lado, `--gutter`).
- **Fontes:** Sora (títulos) e Inter (texto), servidas pelo `next/font` do próprio domínio.
- **Mira 3D:** exclusiva do hero da home. É só CSS, sem biblioteca: itens num palco de 440 × 440 px (`x`, `y`) e em profundidade (`z`); a cena se ajusta à largura e inclina com o mouse dentro do elemento com `data-scene-tilt`.
- **Heros das páginas internas:** cada página tem ilustração e animação próprias em `src/components/hero-visuals/` (painel modular, rede de contatos, funil, agenda, painel de indicadores, mapa de lojas, foto com cartões, camadas de acesso, importação da planilha, conversa de perguntas). São desenhadas em 560 × 500 px e escaladas pelo `ScaleBox`.
- **Movimento:** toda animação tem estado final legível e para com "reduzir movimento" ligado no sistema.
- **Dados de exemplo** nos cartões e nas ilustrações (empresas, pessoas, valores) são fictícios.
- **Textos:** ficam em `src/content/` e só descrevem o que o produto entrega (ver `docs/escopo-mvp.md` do `crm-lockon`). Ao mudar o escopo, revise principalmente `faq.ts`.
- **Dados estruturados:** Organization e WebSite em todas as páginas (layout); SoftwareApplication na home e em /produto; BreadcrumbList nas internas; FAQPage só em /perguntas-frequentes, que reúne todas as perguntas do site sem repetir (`src/content/resources.ts`). Sem preço nem avaliação enquanto não existirem.

## Fotos

As fotos de `src/assets/photos/` vêm do [Unsplash](https://unsplash.com) e seguem a [licença Unsplash](https://unsplash.com/license): uso comercial livre, sem pedir permissão e sem atribuição obrigatória; não é permitido vender as fotos sem alteração. São usadas com o tratamento da marca (moldura, véu azul e cartões do sistema por cima). Origem de cada uma:

| Arquivo | Foto original |
|---|---|
| `vendedor-no-balcao.jpg` | `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d` |
| `reuniao-de-vendas.jpg` | `https://images.unsplash.com/photo-1552664730-d307ca884978` |
| `diretora-comercial.jpg` | `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e` |
| `equipe-na-implantacao.jpg` | `https://images.unsplash.com/photo-1531545514256-b1400bc00f31` |
