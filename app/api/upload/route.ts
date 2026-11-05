import {adminSession,sameOrigin,settings} from '../../../lib/supabase';
export async function POST(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
 try{
  const session=await adminSession();if(!session)return Response.json({error:'Entre como administrador.'},{status:403});
  const form=await req.formData();const f=form.get('file');
  if(!(f instanceof File)||!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>4*1024*1024||!f.size)return Response.json({error:'Escolha JPG, PNG ou WebP até 4 MB.'},{status:400});
  const b=new Uint8Array(await f.arrayBuffer());
  const valid=(f.type==='image/jpeg'&&b[0]===255&&b[1]===216)||(f.type==='image/png'&&b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71)||(f.type==='image/webp'&&String.fromCharCode(...b.slice(0,4))==='RIFF'&&String.fromCharCode(...b.slice(8,12))==='WEBP');
  if(!valid)return Response.json({error:'O ficheiro não corresponde ao formato escolhido.'},{status:400});
  const ext=f.type.split('/')[1],key=crypto.randomUUID()+'.'+ext;
  const {url,anon}=settings();
  const response=await fetch(url+'/storage/v1/object/saranplay-media/'+key,{method:'POST',headers:{apikey:anon,Authorization:'Bearer '+session.token,'Content-Type':f.type,'x-upsert':'false'},body:b});
  if(!response.ok)throw Error('storage');return Response.json({url:'/uploads/'+key});
 }catch{return Response.json({error:'Falha no carregamento. Verifique o bucket e as variáveis do Supabase.'},{status:503})}
}
