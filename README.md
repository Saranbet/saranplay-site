# SaranPlay — Site e Painel

Primeira versão do site público e painel administrativo da SaranPlay.

## Incluído
- Página inicial, produtos e contactos
- Login com Supabase e modo de demonstração
- Dashboard administrativo
- Gestão simples de produtos
- Stock por Tete, Chimoio e Nampula
- Script SQL inicial para Supabase
- Configuração para Netlify

## Executar no computador
```bash
npm install
npm run dev
```

## Ligar ao Supabase
1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute `supabase/schema.sql`.
3. Copie `.env.example` para `.env`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
5. No Supabase Authentication, crie o primeiro utilizador.

## Publicar no GitHub e Netlify
1. Crie um repositório no GitHub.
2. Envie todos os ficheiros deste projeto.
3. No Netlify, escolha **Add new site > Import an existing project**.
4. Selecione o repositório.
5. Build command: `npm run build`.
6. Publish directory: `dist`.
7. Adicione as duas variáveis do Supabase em **Site configuration > Environment variables**.
