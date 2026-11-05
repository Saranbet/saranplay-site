# SaranPlay Site

Site em Next.js com catálogo, categorias, produtos, promoções, imagens e administração. Preparado para actualizar o projecto existente `saranplay-site` da Netlify. A versão anterior está preservada em `legacy/vite-site`.

## Ligações
- GitHub: https://github.com/Saranbet/saranplay-site
- Site público: https://saranplay-site.netlify.app
- Administração: https://saranplay-site.netlify.app/admin
- Supabase: projecto S’play-Site, referência `oujxrxhocasfrgynmzht`.

A configuração pública de conexão está em `lib/public-config.ts`. A chave é **publishable**, sem privilégios administrativos. Não é necessário service_role. As permissões de dados e uploads são verificadas por RLS no Supabase.

## Administração
O e-mail proprietário autorizado é o endereço da conta proprietária autorizada no Supabase. No primeiro acesso, use “Criar conta do proprietário”, escolha uma palavra-passe com pelo menos 12 caracteres e confirme o e-mail enviado pelo Supabase. Alternativamente, crie a conta com esse e-mail em Authentication → Users no painel Supabase e confirme o e-mail. Nenhuma palavra-passe é guardada no GitHub.

## Desenvolvimento
Use Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

As variáveis de `.env.example` são opcionais para este projecto já ligado. Para apontar a outro Supabase, configure as variáveis e a base de dados correspondente. Nunca publique `.env.local`.

## Verificação
```bash
npm test
npm run build
npm run test:integration
```
O teste de integração usa um Supabase simulado. O script `tests/live-supabase.mjs` verifica a leitura real e o bloqueio de acesso anónimo à tabela administrativa.

## Publicação
A Netlify deve usar `npm run build`, `.next`, Node 22 e o adaptador Next.js automático. O repositório utiliza `netlify.toml` para esses valores. Não adicione um fallback global para `index.html`.

## Base de dados
A migração `supabase/02_CONNECTED_CATALOG.sql` já foi aplicada ao projecto S’play-Site em 2026-11-05. Não a reexecute nem execute `01_INSTALAR.sql` sobre esta instalação. Catálogo administrativo e público estão separados; um trigger publica apenas produtos activos numa transacção. A tabela administrativa e uploads só aceitam a conta proprietária confirmada. O catálogo público só tem permissões de leitura.

O código histórico em `legacy` não participa no build. Não copie novamente `legacy/vite-site/src/pages` para `src/pages`, pois entra em conflito com o App Router.

## Estado verificado em 2026-11-05
- Supabase: migração aplicada, leitura pública e bloqueio de acesso administrativo anónimo testados, sem avisos de segurança.
- Sites do ChatGPT: nova versão publicada e ligada ao mesmo Supabase.
- GitHub: acesso de escrita confirmado em 2026-11-05; versão preparada para publicação na Netlify.
- Compilação Next.js e seis testes de validação passaram. O teste HTTP de sessão, escrita, filtros e concorrência também passou.
- A conta proprietária ainda precisa de definir uma palavra-passe pelo primeiro acesso. Não existe palavra-passe pré-definida.

Para substituir o repositório manualmente, utilize esta pasta como nova árvore de código. Se copiar os ficheiros para um checkout antigo, mova antes `src`, `index.html`, `vite.config.js` e `env.example` para uma pasta de cópia, como `legacy/anteriores`. Não mantenha `src/pages` activo juntamente com `app`.
