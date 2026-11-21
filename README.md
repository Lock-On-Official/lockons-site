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
├── components/           header, rodapé, logo e, nas próximas subtarefas, os blocos de página
├── content/routes.ts     mapa único das páginas: rodapé e sitemap saem daqui
├── lib/                  configuração do site (site.ts) e metadados por página (seo.ts)
└── styles/tokens.css     cores, fontes e medidas do protótipo aprovado
```

## Convenções

- **Endereços das páginas em português** (`/produto/funil-de-vendas`): é o que as pessoas buscam no Google. Código, nomes de arquivo e componentes ficam em inglês; textos, comentários e documentação, em português.
- **Página nova:**
  1. crie a rota em `src/app`;
  2. exporte `metadata` com `pageMetadata({ title, description, path })`, que define o canonical da própria página;
  3. marque `published: true` em `src/content/routes.ts`, para ela entrar no sitemap.
- **Visual:** use os tokens de `src/styles/tokens.css`. O azul-royal (`--royal`) é só para o que é clicável.
- **Fontes:** Sora (títulos) e Inter (texto), servidas pelo `next/font` do próprio domínio.
