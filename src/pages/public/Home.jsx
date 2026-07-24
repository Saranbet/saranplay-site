import { Link } from 'react-router-dom'

const featured = [
  {name:'Mesa de bilhar metálica', price:'95.000 MT', desc:'Resistente, profissional e pronta para rendimento.'},
  {name:'Taco profissional', price:'2.500 MT', desc:'Boa pegada, precisão e acabamento profissional.'},
  {name:'Kit de bolas completo', price:'7.500 MT', desc:'Conjunto completo para mesas de bilhar.'},
]

export default function Home(){
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Jogos e Serviços</span>
          <h1>Mesas de bilhar e acessórios para o seu negócio</h1>
          <p>Equipamentos profissionais, entrega, montagem e assistência em Tete, Chimoio e Nampula.</p>
          <div className="hero-actions"><Link className="btn" to="/produtos">Ver produtos</Link><a className="btn ghost" href="https://wa.me/258875563554">Pedir no WhatsApp</a></div>
        </div>
        <div className="hero-card"><div className="pool-table"><div className="ball b1">8</div><div className="ball b2">3</div><div className="ball b3">1</div></div></div>
      </div>
    </section>
    <section className="section container">
      <div className="section-head"><div><span className="eyebrow">Destaques</span><h2>Produtos em destaque</h2></div><Link to="/produtos">Ver todos</Link></div>
      <div className="cards">{featured.map((p)=><article className="product-card" key={p.name}><div className="product-image">SaranPlay</div><h3>{p.name}</h3><p>{p.desc}</p><strong>{p.price}</strong></article>)}</div>
    </section>
    <section className="benefits"><div className="container cards"><div><h3>Entrega e montagem</h3><p>Serviço completo para deixar a mesa pronta para uso.</p></div><div><h3>Atendimento rápido</h3><p>Pedidos e suporte direto pelo WhatsApp.</p></div><div><h3>Três cidades</h3><p>Presença em Tete, Chimoio e Nampula.</p></div></div></section>
  </>
}
