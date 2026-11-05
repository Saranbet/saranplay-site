import {cookies} from 'next/headers';
import {publicConfig} from './public-config';
export function settings(){return {url:process.env.SUPABASE_URL||publicConfig.url,anon:process.env.SUPABASE_ANON_KEY||publicConfig.publishableKey};}
export async function db(path:string,init:RequestInit={},token?:string){const {url,anon}=settings();return fetch(url+path,{...init,cache:'no-store',headers:{apikey:anon,...(token?{Authorization:'Bearer '+token}:{}),'Content-Type':'application/json',...init.headers}})}
export async function auth(path:string,init:RequestInit={}){const {url,anon}=settings();return fetch(url+'/auth/v1/'+path,{...init,cache:'no-store',headers:{apikey:anon,'Content-Type':'application/json',...init.headers}})}
export async function setSession(session:any){const jar=await cookies();const options={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/'};jar.set('sp-access',session.access_token,{...options,maxAge:session.expires_in||3600});jar.set('sp-refresh',session.refresh_token,{...options,maxAge:60*60*24*7})}
export async function adminSession():Promise<{token:string,email:string}|null>{
 const jar=await cookies();let token=jar.get('sp-access')?.value;
 if(!token&&!jar.get('sp-refresh'))return null;
 let response=token?await auth('user',{headers:{Authorization:'Bearer '+token}}):null;
 if(!response?.ok&&jar.get('sp-refresh')?.value){const refresh=await auth('token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:jar.get('sp-refresh')!.value})});if(!refresh.ok)return null;const session=await refresh.json();await setSession(session);token=session.access_token;response=await auth('user',{headers:{Authorization:'Bearer '+token}})}
 if(!response?.ok||!token)return null;const user=await response.json();
 if(!user.email_confirmed_at||!user.email)return null;
 const access=await db('/rest/v1/site_admin_emails?select=email&email=eq.'+encodeURIComponent(user.email.toLowerCase()),{},token);
 if(!access.ok||!(await access.json()).length)return null;
 return {token,email:user.email};
}
export async function isAdmin(){return !!await adminSession()}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin&&[new URL(req.url).origin,publicConfig.siteUrl,publicConfig.chatgptSiteUrl,process.env.SITE_URL?.replace(/\/$/,'')].includes(origin)}
