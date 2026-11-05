import {auth,sameOrigin,setSession} from '../../../../lib/supabase';
export async function POST(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
 try{const {email,password}=await req.json();
 if(typeof email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())||typeof password!=='string'||password.length<12||password.length>256)return Response.json({error:'Utilize o e-mail do proprietário e uma palavra-passe com pelo menos 12 caracteres.'},{status:400});
 const r=await auth('signup',{method:'POST',body:JSON.stringify({email:email.trim(),password})});const result=await r.json();
 if(!r.ok)return Response.json({error:'Não foi possível criar a conta. Se já existe, utilize Entrar ou recupere a palavra-passe no Supabase.'},{status:400});
 if(result.access_token){await setSession(result);return Response.json({ok:true,signedIn:true})}
 return Response.json({ok:true,message:'Conta preparada. Confirme o e-mail enviado pelo Supabase e depois entre com a palavra-passe que escolheu.'});
 }catch{return Response.json({error:'Não foi possível contactar o Supabase.'},{status:503})}
}
