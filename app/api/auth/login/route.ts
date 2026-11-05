import {auth,db,sameOrigin,setSession} from '../../../../lib/supabase';
export async function POST(req:Request){
  if(!sameOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
  try{
    const body=await req.json();
    if(typeof body.email!=='string'||typeof body.password!=='string'||body.password.length>256)return Response.json({error:'Dados inválidos.'},{status:400});
    const response=await auth('token?grant_type=password',{method:'POST',body:JSON.stringify({email:body.email.trim(),password:body.password})});
    if(!response.ok)return Response.json({error:'E-mail ou palavra-passe incorrectos.'},{status:401});
    const session=await response.json();
    if(!session.user?.email_confirmed_at)return Response.json({error:'Confirme o e-mail da conta no Supabase.'},{status:403});
    const permission=await db('/rest/v1/site_admin_emails?select=email&email=eq.'+encodeURIComponent(session.user.email.toLowerCase()),{},session.access_token);
    if(!permission.ok||!(await permission.json()).length)return Response.json({error:'Esta conta não tem acesso à administração.'},{status:403});
    await setSession(session);
    return Response.json({ok:true});
  }catch{return Response.json({error:'Não foi possível entrar. Verifique a configuração do servidor.'},{status:503})}
}
