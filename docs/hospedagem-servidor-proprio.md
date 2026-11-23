# Hospedagem temporária no servidor próprio

Como publicar o site em `https://lockons.com.br` a partir do servidor da equipe (o mesmo da homologação), até a contratação de uma VPS. Os arquivos usados estão em `Dockerfile`, `.dockerignore` e `deploy/`.

## O que vamos montar

```text
Visitante / Google
      │  https://lockons.com.br
      ▼
Cloudflare  (DNS do domínio, certificado HTTPS, proteção contra ataques, cache)
      │  túnel criptografado, aberto DE DENTRO do servidor para fora
      ▼
Servidor em casa
  └─ Docker
       ├─ tunnel  (cloudflared: mantém o túnel aberto)
       └─ site    (Next.js na porta 3000, visível só para o tunnel)
```

Nenhuma porta é aberta no roteador e o IP de casa não aparece para ninguém: quem responde pelo domínio é a Cloudflare.

## Por que não usar o Tailscale Funnel que já está lá

O Funnel só publica endereços do próprio Tailscale (`algo.ts.net`). Ele não aceita domínio próprio: o certificado HTTPS que ele emite vale só para o `ts.net`, então apontar `lockons.com.br` para ele dá erro de certificado no navegador. O Funnel continua servindo a homologação normalmente; os dois convivem no mesmo servidor sem conflito.

## Por que Cloudflare Tunnel, e não as outras opções

| Opção | Por que não (agora) |
|---|---|
| Abrir porta no roteador e apontar o domínio para o IP de casa | Muitas operadoras usam CGNAT (o IP não é só seu e a porta não abre); o IP residencial muda; expõe a rede de casa e um ataque derruba a sua internet. |
| Apontar o domínio para a Vercel | Tecnicamente é o mais simples, mas o plano gratuito (Hobby) é só para uso pessoal e não comercial. Site de empresa exige o plano Pro (pago por membro). Pode ser o caminho se o time preferir pagar em vez de manter o servidor. |
| Cloudflare Tunnel (escolhida) | Gratuito para este uso, funciona atrás de CGNAT, HTTPS automático, esconde o IP, e a mesma configuração vai para a VPS depois sem mudar nada no DNS. |

## Antes de começar

- Acesso ao painel do registro.br como titular ou contato técnico do domínio.
- Docker e o plugin `docker compose` no servidor (`docker compose version` para conferir).
- Anote os registros DNS que já existem no registro.br (principalmente `MX` e `TXT`, se já houver e-mail no domínio). Eles precisam ser recriados na Cloudflare, senão o e-mail para.

## Passo 1: colocar o domínio na Cloudflare

1. Crie uma conta em `dash.cloudflare.com` (de preferência com um e-mail da empresa ou compartilhado pelo time, não pessoal, para o acesso não depender de uma pessoa só) e ative a verificação em duas etapas.
2. **Add a domain** → `lockons.com.br` → plano **Free**.
3. A Cloudflare tenta importar os registros existentes. Confira com a lista que você anotou e remova registros `A`/`AAAA`/`CNAME` antigos de `lockons.com.br` e `www` (o túnel cria os novos).
4. Ela mostra **dois nameservers** (algo como `ana.ns.cloudflare.com` e `bob.ns.cloudflare.com`). Guarde os dois.

## Passo 2: trocar os servidores DNS no registro.br

O registro.br é onde o domínio está **registrado** (quem é o dono). Os **servidores DNS** (nameservers) são quem responde "para onde vai `lockons.com.br`". Vamos manter o registro no registro.br e passar só a resposta do DNS para a Cloudflare.

1. Se o **DNSSEC** estiver ativo no registro.br, desative antes de trocar (com ele ligado apontando para o DNS antigo, o domínio deixa de resolver).
2. No painel do registro.br, abra o domínio → **DNS** → **Alterar servidores DNS** e coloque os dois nameservers da Cloudflare.
3. Aguarde. O registro.br publica as mudanças periodicamente; normalmente leva de minutos a algumas horas, e caches pelo mundo podem levar até 24–48 h. A Cloudflare manda e-mail quando o domínio fica **Active**.
4. Para conferir no terminal:

   ```bash
   dig NS lockons.com.br +short
   ```

5. Depois de ativo, ligue o DNSSEC na Cloudflare (**DNS → Settings → DNSSEC**) e cadastre no registro.br os dados (DS) que ela mostrar.

## Passo 3: criar o túnel

1. No painel da Cloudflare: **Zero Trust → Networks → Tunnels → Create a tunnel** (os nomes de menu mudam de vez em quando; procure por "Tunnels").
2. Tipo **Cloudflared**, nome `lockons-site` (ou o nome do servidor).
3. Na tela de instalação, escolha **Docker** e copie só o token (o texto longo depois de `--token`). **Trate como senha**: quem tem o token consegue responder pelo site.
4. Em **Public hostnames** (ou **Routes**), adicione:

   | Subdomínio | Domínio | Tipo | URL |
   |---|---|---|---|
   | (vazio) | `lockons.com.br` | HTTP | `site:3000` |
   | `www` | `lockons.com.br` | HTTP | `site:3000` |

   `site` é o nome do serviço no `deploy/compose.yaml`: dentro da rede do Docker, o cloudflared encontra o site por esse nome. É HTTP mesmo: o trecho criptografado vai do visitante até a Cloudflare e da Cloudflare até o cloudflared, pelo túnel; o HTTP só existe dentro do servidor.

## Passo 4: subir o site no servidor

```bash
git clone https://github.com/Lock-On-Official/lockons-site.git
```

```bash
cd lockons-site/deploy
```

```bash
cp .env.example .env
```

Edite `deploy/.env` e cole o token em `CLOUDFLARE_TUNNEL_TOKEN`. Depois:

```bash
docker compose up -d --build
```

```bash
docker compose ps
```

```bash
docker compose logs -f tunnel
```

O `site` deve aparecer como `healthy` e o log do túnel deve mostrar conexões registradas (`Registered tunnel connection`). No painel da Cloudflare o túnel fica **Healthy**. Abra `https://lockons.com.br`.

O que o `compose.yaml` já faz por segurança, já que o servidor também roda a homologação:

- o site não publica porta nenhuma (nem na rede de casa);
- roda sem root, com o sistema de arquivos só leitura (só o cache de imagens é gravável), sem privilégios extras e com limite de memória;
- `restart: unless-stopped`: volta sozinho quando o servidor reinicia (desde que o Docker inicie com o sistema: `sudo systemctl enable docker`).

## Passo 5: ajustes na Cloudflare

- **SSL/TLS → Edge Certificates**: ligue **Always Use HTTPS**.
- **Rules → Redirect Rules**: crie a regra pronta **Redirect from WWW to root** (301). Assim existe um endereço oficial só (`lockons.com.br`), que é o que o canonical e o sitemap do site já usam. Endereços duplicados dividem a relevância no Google.
- Opcional: **Rules → Cache Rules** marcando o site como elegível para cache. As páginas são estáticas e o Next já manda `Cache-Control: s-maxage=31536000`, então a Cloudflare passa a servir as páginas mesmo com o servidor fora do ar por um tempo. Contrapartida: depois de cada atualização, é preciso limpar o cache (**Caching → Purge Everything**), senão os visitantes veem a versão antiga.

## Passo 6: avisar o Google (e o Bing)

Hospedar não basta para aparecer na busca; o Google precisa descobrir e confiar no domínio.

1. **Google Search Console** (`search.google.com/search-console`) → adicionar propriedade do tipo **Domínio** → `lockons.com.br`. Ele pede um registro `TXT`: crie em **DNS → Records** na Cloudflare.
2. Em **Sitemaps**, envie `https://lockons.com.br/sitemap.xml`.
3. Em **Inspeção de URL**, peça a indexação da home e das páginas principais.
4. **Bing Webmaster Tools** permite importar a propriedade direto do Search Console (o Bing também alimenta outros buscadores).

Indexação leva de dias a semanas; posição na busca leva meses. Por isso faz sentido começar agora.

## E a Vercel?

Pode continuar como ambiente de testes. Não adicione `lockons.com.br` na Vercel. As páginas de lá já apontam o canonical para `https://lockons.com.br`, então o Google entende que o endereço oficial é o do domínio e não trata o `vercel.app` como concorrente.

## Atualizar o site

No servidor, a cada versão nova da `main`:

```bash
cd lockons-site && git pull && cd deploy && docker compose up -d --build
```

O site antigo segue no ar enquanto o build novo é feito; a troca leva segundos. Se usar cache na Cloudflare, limpe o cache depois. Quando quiserem automatizar, dá para repetir o que já existe no CI/CD da homologação (por exemplo, um runner no próprio servidor rodando esse comando a cada push na `main`).

## Cuidados enquanto o site estiver em casa

- **Energia e internet**: se caírem, o site cai (ou passa a mostrar só o que estiver no cache da Cloudflare). Um nobreak ajuda; quedas curtas não prejudicam o Google, quedas longas e frequentes sim.
- **Saber que caiu**: crie em **Notifications** da Cloudflare um alerta de túnel fora do ar, ou use um monitor gratuito (UptimeRobot, Better Stack) apontando para `https://lockons.com.br`.
- **Contas e segredos**: o token fica só em `deploy/.env` (fora do git). Se vazar, apague o túnel no painel e crie outro. Dê acesso à conta da Cloudflare a pelo menos mais uma pessoa de confiança do time.
- **Privacidade (LGPD)**: a Cloudflare passa a tratar dados de acesso dos visitantes (IP, navegador). Quando o jurídico escrever a política de privacidade, ela deve citar a Cloudflare como operadora.
- **E-mail no domínio**: com o DNS na Cloudflare, o **Email Routing** gratuito encaminha `contato@lockons.com.br` para uma caixa existente; para enviar e-mails pelo domínio, contratem um serviço de e-mail (Google Workspace, Zoho etc.) e criem os registros `MX`, SPF e DKIM que ele pedir.

## Quando vier a VPS

1. Instale Docker na VPS, clone o repositório e copie o mesmo `deploy/.env`.
2. `docker compose up -d --build` na VPS. Com o mesmo token, o túnel passa a ter dois conectores e a Cloudflare divide o tráfego entre eles.
3. Desligue no servidor de casa: `docker compose down`.

Nada muda no registro.br nem no DNS, e o site não sai do ar na troca.

## Glossário rápido

- **Domínio**: o nome (`lockons.com.br`), alugado por ano no registro.br.
- **DNS**: o "catálogo" que traduz o nome para o lugar que responde por ele.
- **Nameservers**: os servidores que mantêm esse catálogo para o domínio (passam a ser os da Cloudflare).
- **Registros `A`, `CNAME`, `MX`, `TXT`**: entradas do catálogo: para onde vai o site, apelidos, para onde vai o e-mail, textos de verificação.
- **TTL**: por quanto tempo os outros podem guardar uma resposta do DNS em cache; é por isso que mudanças demoram a "propagar".
- **HTTPS / certificado TLS**: o cadeado do navegador; prova que o site é mesmo `lockons.com.br` e criptografa a conexão. A Cloudflare emite e renova sozinha.
- **Túnel**: conexão que o servidor abre para fora; o tráfego dos visitantes volta por ela, sem precisar abrir porta em casa.
- **Canonical**: etiqueta em cada página dizendo ao Google qual é o endereço oficial dela.
- **Sitemap**: lista das páginas do site para os buscadores (`/sitemap.xml`).
