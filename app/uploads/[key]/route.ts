import {settings} from '../../../lib/supabase';
export async function GET(req:Request,{params}:{params:Promise<{key:string}>}){
 const {key}=await params;if(!/^[a-f0-9-]{36}\.(jpeg|png|webp)$/.test(key))return new Response('Not found',{status:404});
 try{const {url}=settings();const r=await fetch(url+'/storage/v1/object/public/saranplay-media/'+key);
 if(!r.ok)return new Response('Not found',{status:404});return new Response(r.body,{headers:{'Content-Type':r.headers.get('Content-Type')||'image/jpeg','Cache-Control':'public,max-age=31536000,immutable','X-Content-Type-Options':'nosniff'}})}catch{return new Response('Service unavailable',{status:503})}
}
