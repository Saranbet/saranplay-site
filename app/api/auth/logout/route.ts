import {cookies} from 'next/headers';
import {auth,sameOrigin} from '../../../../lib/supabase';
export async function POST(req:Request){
 if(!sameOrigin(req))return new Response('Origem inválida',{status:403});
 const jar=await cookies();const token=jar.get('sp-access')?.value;
 try{if(token)await auth('logout',{method:'POST',headers:{Authorization:'Bearer '+token}})}catch{}
 jar.delete('sp-access');jar.delete('sp-refresh');return Response.json({ok:true});
}
