import {initial} from '../../config';
import {schema} from '../../../lib/catalog-schema';
import {db,adminSession,sameOrigin} from '../../../lib/supabase';
export const dynamic='force-dynamic';
export async function GET(){
 try{
  const session=await adminSession();const admin=!!session;const response=await db('/rest/v1/'+(admin?'documents':'public_catalog')+'?id=eq.catalog&select=data,revision',{},session?.token);
  if(!response.ok)throw Error('database');const [row]=await response.json();const data=row?.data||initial;
  return Response.json({data:admin?data:{...data,products:data.products.filter((p:any)=>p.active)},revision:row?.revision??0,admin},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Não foi possível carregar o catálogo. Verifique as variáveis e execute o SQL do Supabase.'},{status:503})}
}
export async function PUT(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
 try{
  const session=await adminSession();if(!session)return Response.json({error:'Entre como administrador.'},{status:403});
  let body;try{body=await req.json()}catch{return Response.json({error:'Dados inválidos.'},{status:400})}
  if(!Number.isInteger(body?.revision)||body.revision<0)return Response.json({error:'Revisão inválida.'},{status:400});
  const parsed=schema.safeParse(body.data);
  if(!parsed.success)return Response.json({error:parsed.error.issues.map(x=>x.message).join('; ')},{status:400});
  if(new Set(parsed.data.products.map(p=>p.id)).size!==parsed.data.products.length)return Response.json({error:'Produtos duplicados.'},{status:400});
  const categories=parsed.data.categories.map(c=>c.trim().toLocaleLowerCase('pt'));
  if(new Set(categories).size!==categories.length||categories.some(c=>!c||c==='todas'))return Response.json({error:'Utilize categorias únicas e não vazias. O nome Todas é reservado.'},{status:400});
  if(parsed.data.products.some(p=>!parsed.data.categories.includes(p.category)))return Response.json({error:'Seleccione uma categoria existente para cada produto.'},{status:400});
  const response=await db('/rest/v1/documents?id=eq.catalog&revision=eq.'+body.revision,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({data:parsed.data,revision:body.revision+1})},session.token);
  if(!response.ok)throw Error('database');const rows=await response.json();
  if(!rows.length)return Response.json({error:'O catálogo mudou noutra janela. Recarregue antes de editar.'},{status:409});
  return Response.json({revision:body.revision+1});
 }catch{return Response.json({error:'Não foi possível guardar. Verifique a configuração do Supabase.'},{status:503})}
}
