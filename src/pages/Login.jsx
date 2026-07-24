import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Login(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState(''); const nav=useNavigate()
 async function submit(e){e.preventDefault(); if(!supabase){setMsg('Modo de demonstração: a entrar no painel.'); setTimeout(()=>nav('/admin'),500); return} const {error}=await supabase.auth.signInWithPassword({email,password}); if(error)setMsg(error.message); else nav('/admin')}
 return <div className="login-page"><form className="login-card" onSubmit={submit}><div className="brand">Saran<span>Play</span></div><h1>Entrar no sistema</h1><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Palavra-passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="btn full">Entrar</button>{msg&&<p className="message">{msg}</p>}<small>Sem Supabase configurado, o sistema abre em modo de demonstração.</small></form></div>
}
