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
npm test             # testes (node --test, precisa do Node 22.18 ou mais novo)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Seguem o prefixo `LOCKON_` do projeto.

| Variável | Para quê | Padrão |
|---|---|---|
| `LOCKON_SITE_URL` | Endereço público. Entra no canonical, no `sitemap.xml` e no `robots.txt`. | `https://lockons.com.br` |
| `LOCKON_APP_URL` | Destino do link "Entrar". Vazio: o link não aparece. | vazio |
| `LOCKON_WHATSAPP` | Número do WhatsApp da equipe, com DDD (ex.: `(11) 99999-0000`). Liga o botão flutuante e o link de WhatsApp no rodapé, no painel final e no aviso do formulário. Vazio: o botão aparece como prévia ("WhatsApp em breve") e os links somem. | vazio |
| `LOCKON_CONTACT_EMAIL` | E-mail de contato da equipe, mostrado no rodapé, no painel final e no aviso do formulário. Vazio: não aparece. | vazio |

Todas são lidas no build: mudar o valor exige um build novo. Valor inválido conta como vazio (regras em `src/lib/contact.ts`).

## Estrutura

```text
src/
├── app/                  rotas do Next (App Router), robots.ts, sitemap.ts, ícones e as imagens de compartilhamento (og/)
├── assets/photos/        fotos (ver "Fotos" no fim)
├── assets/fonts/         Sora e Inter em TTF, só para gerar as imagens de compartilhamento
├── components/
│   ├── brand/            logo e a mira em SVG
│   ├── site-header/      header fixo com mega menu (Produto, Para quem, Recursos) e menu do celular em sanfona
│   ├── site-footer/      rodapé com links para todas as páginas
│   ├── ui/               botão (ButtonLink), selo do hero (Eyebrow), etiqueta (Chip), ícones e lista com visto
│   ├── cards/            cartão de oportunidade, de indicador e as cantoneiras da trava (LockBrackets)
│   ├── contact/          links de WhatsApp e e-mail (quando configurados) e o botão fixo do WhatsApp
│   ├── segments/         faixa de fotos da seção Segmentos (movimento contínuo, pausa e setas)
│   ├── blog/             cartão de artigo, capa ilustrada e corpo do artigo
│   ├── demo-form/        formulário de demonstração (desligado) e as condições da demonstração
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
│   ├── cta-band/         painel azul-marinho de fechamento, dentro da largura do conteúdo
│   ├── breadcrumbs/      trilha de navegação com BreadcrumbList
│   └── seo/              JsonLd, para dados estruturados
├── content/              textos das páginas (home, produto e funcionalidades, papéis, segurança, implantação, perguntas, blog, segmentos, demonstração, fotos, imagens de compartilhamento), o menu (navigation.ts) e o mapa único das páginas (routes.ts)
├── lib/                  configuração (site.ts), metadados (seo.ts), dados estruturados, formatação e regras testadas (contato, blog, trava do quadro, item atual do menu)
└── styles/tokens.css     cores, fontes e medidas do protótipo aprovado
public/logo.png           logo quadrado (512 × 512) dos dados estruturados
tests/                    testes das regras de src/lib (npm test)
```

## Convenções

- **Endereços das páginas em português** (`/produto/funil-de-vendas`): é o que as pessoas buscam no Google. Código, nomes de arquivo e componentes ficam em inglês; textos, comentários e documentação, em português.
- **Página nova:**
  1. crie a rota em `src/app`;
  2. exporte `metadata` com `pageMetadata({ title, description, path })`, que define o canonical da própria página;
  3. marque `published: true` em `src/content/routes.ts`, para ela entrar no sitemap;
  4. acrescente o selo e o título dela em `src/content/og.ts`, para gerar a imagem de compartilhamento (sem isso, o link da imagem dá 404).
- **Visual:** use os tokens de `src/styles/tokens.css`; não escreva cor nem tamanho de título solto num componente. A base é a paleta azul da marca; o azul-royal (`--royal`) é só para o que é clicável.
- **Laranja (`--accent`, `#FB8A3C`):** acento só no botão principal, no "na mira." do topo da home, na trava da mira (cantoneiras `LockBrackets` e cartão travado), no botão de volta da 404 e no anel do botão do WhatsApp. O texto sobre ele é azul-marinho escuro (`--on-accent`, 6,5:1): branco no laranja claro reprova no contraste (2,4:1), e laranjas escuros o bastante para o branco puxam para o marrom.
- **Cores com significado** (`--success-*`, `--warning-*`, `--danger-*`): só nas telas do produto e nos avisos. Verde para ganho, âmbar para negociação, alta prioridade e avisos, vermelho para vencida e perdida. A etiqueta comum (`Chip` padrão) é azul.
- **Títulos:** um tamanho por papel (`--text-display` na home, `--text-h1` a `--text-h4`, `--overline-size` nos selos). Controles usam os tempos `--dur-*` e as curvas `--ease-*`.
- **Componentes:** botão principal (laranja), secundário (contorno; versão `onDark` sobre o azul-marinho) e link de texto com seta; lista com visto em círculo (`CheckList`, com `onDark`); selo da seção com traço à esquerda; pré-mira cinza (classe global `lock-frame`) nos cartões clicáveis; cantoneiras da trava aceitam `--bracket-delay`, `--bracket-timeline` e `--bracket-range`.
- **Funcionalidade nova:** acrescente em `src/content/features.ts` (o tipo `FeatureSlug` obriga a dar a ilustração do hero e a da seção "como funciona" em `src/app/produto/[slug]/page.tsx`) e a rota em `routes.ts`. Endereços fora da lista dão 404.
- **Seções:** use `<Section tone decor>`. As páginas alternam `plain` (fundo pontilhado) e `tint` (azul-claro), com `navy` para o momento de destaque e a `CtaBand` azul-marinho no fim.
- **Fundos (`decor`):** por decisão do time, poucas seções têm fundo animado: a mira grande (`reticle`) na primeira seção depois do hero, `lanes` (raias do funil) nas seções azul-marinho de destaque ("Do caos ao foco" na home, permissões em Para quem, Segurança e Implantação) e `route` (trilha de follow-up) em "Para quem" da home e no fluxo de Produto. Perguntas, "Conheça também", benefícios, funcionalidades e as categorias de Perguntas frequentes depois da primeira ficam sem fundo. Seção nova nasce sem `decor`; acrescente só com aprovação do time. `network` (rede de contatos) e `chart` (gráfico) continuam disponíveis no `SectionDecor`, sem uso no momento.
- **Largura:** o conteúdo ocupa 85% da tela em qualquer tamanho, sem teto em px (7,5% de margem de cada lado, `--gutter`).
- **Fontes:** Sora (títulos) e Inter (texto), servidas pelo `next/font` do próprio domínio.
- **Mira 3D:** exclusiva do hero da home. É só CSS, sem biblioteca: itens num palco de 440 × 440 px (`x`, `y`) e em profundidade (`z`); a cena se ajusta à largura e inclina com o mouse dentro do elemento com `data-scene-tilt`. O topo da home tem fundo azul-marinho escuro com grade fina e anéis de mira; ao fundo da cena, a janela do funil (`HeroDashboard`, parada) e, na frente, a mira do logo (`Reticle3D`, que aceita `cx`, `cy`, `scale` e `z`) e o indicador do mês. O "na mira." do título é o único texto em laranja do site.
- **Heros das páginas internas:** cada página tem ilustração e animação próprias em `src/components/hero-visuals/` (painel modular, rede de contatos, funil, agenda, painel de indicadores, mapa de lojas, foto com cartões, camadas de acesso, importação da planilha, conversa de perguntas). São desenhadas em 560 × 500 px e escaladas pelo `ScaleBox`.
- **Movimento:** toda animação tem estado final legível e para com "reduzir movimento" ligado no sistema. As ilustrações em loop (busca de contatos, lista de atividades, faixa de segmentos) são decisão do time; o que se move sem parar e ocupa espaço grande tem como pausar (a faixa de segmentos tem botão).
- **404:** a mira faz uma varredura só pelo painel, passa perto do "?" e para; então as cantoneiras laranja travam no botão "Voltar ao início". O Lighthouse não avalia páginas com status 404: confira a acessibilidade dela com o axe.
- **Dados de exemplo** nos cartões e nas ilustrações (empresas, pessoas, valores) são fictícios.
- **Textos:** ficam em `src/content/` e só descrevem o que o produto entrega (ver `docs/escopo-mvp.md` do `crm-lockon`). Ao mudar o escopo, revise principalmente `faq.ts`.
- **Formulário de demonstração:** fica desativado, com aviso (`available: false` em `src/content/demo.ts`), por decisão do time. Para ligar: criar o envio no servidor para o e-mail da LOCKONS, trocar `available` para `true` e tratar o envio no formulário (`src/components/demo-form/`).
- **Páginas legais:** Privacidade e Termos mostram só a estrutura e ficam com `noindex` e fora do sitemap enquanto `draft: true` em `src/content/legal.ts`. Quando o jurídico entregar o texto: preencher as seções, trocar `draft` para `false` e marcar a rota como publicada em `routes.ts`.
- **Menu do topo:** os itens e os destaques dos painéis ficam em `src/content/navigation.ts` (o menu do celular usa a mesma lista). O botão "Agendar demonstração" do topo fica azul-marinho enquanto o botão laranja do hero está na tela (marcado com `data-hero-cta`) e passa a laranja com a rolagem; em página sem esse botão, já começa laranja.
- **Segmentos (home):** faixa de fotos em movimento contínuo (`src/components/segments/`), com os cartões duplicados para o laço não ter emenda. Para com o mouse sobre um cartão e só volta quando o mouse sai da seção; o botão "Pausar" atende teclado e toque. Parada, mostra setas nas pontas que passam um cartão por clique (avançando o tempo da animação, então o laço continua sem fim); com "reduzir movimento" fica parada, rola à mão e as setas ficam sempre à mostra. Segmentos e fotos em `src/content/segments.ts`.
- **Blog:** artigo novo entra só em `src/content/blog.ts`; a rota `/blog/<slug>`, o sitemap e a imagem de compartilhamento saem dessa lista. Quando o artigo citar o LOCKONS (bloco "Na prática"), descreva só o que o produto entrega. Os testes de `tests/blog.test.ts` conferem slugs, datas e campos obrigatórios.
- **Dados estruturados:** Organization e WebSite em todas as páginas (layout); SoftwareApplication na home e em /produto; BreadcrumbList nas internas; FAQPage só em /perguntas-frequentes, que reúne todas as perguntas do site sem repetir (`src/content/resources.ts`). Sem preço nem avaliação enquanto não existirem. O logo vai como PNG (`public/logo.png`), o formato mais aceito pelo Google.
- **Imagens de compartilhamento** (WhatsApp, LinkedIn etc.): cada página tem a sua em `/og/<chave>` (1200 × 630, ex.: `/og/produto-funil-de-vendas`), gerada no build por `src/app/og/[key]/route.tsx` com o selo e o título de `src/content/og.ts`. O gerador só lê fontes TTF, por isso as cópias em `src/assets/fonts/` (licença SIL Open Font License, como as do `next/font`). Para ver como fica: `npm run build && npm start` e abrir `http://localhost:3000/og/inicio`.
- **Ícones:** `src/app/icon.svg` (navegador) e `src/app/apple-icon.png` (180 × 180, tela inicial do iPhone). O `public/logo.png` e o `apple-icon.png` saem do `icon.svg`: ao trocar o logo, gere os dois de novo.

## Verificação

Antes de publicar uma mudança grande, rode `npm run build` e confira com o Lighthouse (Chrome, aba Lighthouse, modo celular) e com o [teste de pesquisa aprimorada](https://search.google.com/test/rich-results) do Google, que valida os dados estruturados.

Última medição (27/11/2026, depois da integração do redesign; `npm start` local, Lighthouse 13 no modo celular, mediana de até três rodadas por página; uma rodada isolada pode variar alguns pontos conforme a carga da máquina, e no servidor real o tempo de rede soma):

| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 1,2 s | 0 |
| `/produto` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/produto/funil-de-vendas` | 100 | 100 | 100 | 100 | 1,4 s | 0 |
| `/para-quem/vendedores` | 100 | 100 | 100 | 100 | 1,4 s | 0 |
| `/seguranca` | 99 | 100 | 100 | 100 | 1,1 s | 0 |
| `/implantacao` | 100 | 100 | 100 | 100 | 1,2 s | 0 |
| `/perguntas-frequentes` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/agendar-demonstracao` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/blog` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/blog/follow-up-de-vendas` | 100 | 100 | 100 | 100 | 1,1 s | 0 |

Na mesma data: 21 páginas ligadas pelo menu e pelo rodapé respondem, todas com canonical, imagem de compartilhamento e dados estruturados completos; o sitemap tem 19 endereços (as páginas legais ficam fora enquanto são rascunho); nenhuma página rola para o lado de 320 a 1920 px; a 404 passa no axe sem violações.

Animação de texto nas ilustrações não usa transparência (`opacity`) no próprio texto: o Lighthouse captura a página no meio do efeito e acusa contraste baixo. Para fazer aparecer ou sumir, use recorte (`clip-path`) ou movimento, como em `ImportVisual`.

## Integração do redesign (novembro de 2026)

Um redesign feito em paralelo (12 commits, fora deste repositório) foi filtrado pelo time e trazido por partes, um commit por parte, com crédito aos autores. Entrou: laranja claro como acento, cores com significado, escala de títulos, botão secundário, pré-mira, moldura das telas, painel de fechamento, blog, mega menu, contatos configuráveis e botão do WhatsApp, abas com indicador, coluna Ganho no "Do caos ao foco", fundo escuro e janela do funil no topo da home, seção Segmentos e a 404. Ficou como era: a paleta azul (sem as seções escuras em cinza-chumbo), o logo, as animações em loop pedidas pelo time e o ritmo das seções das páginas internas. No topo da home, a mira do logo ficou no lugar do cartão travado do redesign.

## Fotos

As fotos de `src/assets/photos/` vêm do [Unsplash](https://unsplash.com) e seguem a [licença Unsplash](https://unsplash.com/license): uso comercial livre, sem pedir permissão e sem atribuição obrigatória; não é permitido vender as fotos sem alteração. São usadas com o tratamento da marca (moldura, véu azul e cartões do sistema por cima). Origem de cada uma:

| Arquivo | Foto original |
|---|---|
| `vendedor-no-balcao.jpg` | `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d` |
| `reuniao-de-vendas.jpg` | `https://images.unsplash.com/photo-1552664730-d307ca884978` |
| `diretora-comercial.jpg` | `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e` |
| `equipe-na-implantacao.jpg` | `https://images.unsplash.com/photo-1531545514256-b1400bc00f31` |
| `materiais-de-construcao.jpg` | `https://unsplash.com/photos/loDPKt_srQ0` (`photo-1631856954655-966f97d809de`) |
| `concessionaria.jpg` | `https://unsplash.com/photos/3WAMh1omVAY` (`photo-1574023240744-64c47c8c0676`) |
| `clinica.jpg` | `https://unsplash.com/photos/e7MJLM5VGjY` (`photo-1629909613654-28e377c37b09`) |
| `escola.jpg` | `https://unsplash.com/photos/N_aihp118p8` (`photo-1577896851231-70ef18881754`) |
| `imobiliaria.jpg` | `https://unsplash.com/photos/_TPTXZd9mOo` (`photo-1580587771525-78b9dba3b914`) |
