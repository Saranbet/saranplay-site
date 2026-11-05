import fs from 'node:fs';import assert from 'node:assert/strict';
const text=fs.readFileSync(new URL('../lib/public-config.ts',import.meta.url),'utf8');
const cfg=JSON.parse(text.slice(text.indexOf('= ')+2).trim().replace(/;$/,''));
const headers={apikey:cfg.publishableKey};
let r=await fetch(cfg.url+'/rest/v1/public_catalog?id=eq.catalog&select=data,revision',{headers});assert.equal(r.status,200);const [row]=await r.json();assert.ok(row&&row.data.name==='SaranPlay');assert.ok(row.data.products.every(p=>p.active));
r=await fetch(cfg.url+'/rest/v1/documents?select=data',{headers});assert.ok([401,403].includes(r.status),'Tabela administrativa bloqueada para visitantes');
r=await fetch(cfg.url+'/rest/v1/public_catalog?id=eq.catalog',{method:'PATCH',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({revision:99})});assert.ok([401,403].includes(r.status),'Catálogo público não permite escrita anónima');
console.log('Supabase real: leitura pública, produtos activos e bloqueio de leitura/gravação administrativa — OK.');
