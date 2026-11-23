# Imagem do site para o servidor próprio (ver docs/hospedagem-servidor-proprio.md).
# Três etapas: instala as dependências, gera o build e monta uma imagem final
# só com o servidor standalone do Next, rodando sem root.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS build
WORKDIR /app
# As duas variáveis são lidas no build (canonical, sitemap, robots, link "Entrar").
ARG LOCKON_SITE_URL=https://lockons.com.br
ARG LOCKON_APP_URL=
ENV LOCKON_SITE_URL=$LOCKON_SITE_URL \
    LOCKON_APP_URL=$LOCKON_APP_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
CMD ["node", "server.js"]
