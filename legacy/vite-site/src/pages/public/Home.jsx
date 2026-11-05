import { Link } from 'react-router-dom'

const featured = [
  {name:'Mesa de bilhar profissional', price:'Sob consulta', desc:'Modelo resistente, elegante e preparado para uso comercial.', image:'/images/loja-mesa-bilhar.jpeg'},
  {name:'Tacos e acessórios', price:'Vários modelos', desc:'Tacos, bolas, pontas, giz e peças para manutenção.', image:'/images/saranplay-logo.jpeg'},
  {name:'Montagem e assistência', price:'Serviço completo', desc:'Entrega, montagem e apoio técnico para o seu negócio.', image:'/images/loja-mesa-bilhar.jpeg'},
]

export default function Home(){
  return <>
    <section className="hero hero-photo">
      <div className="hero-overlay"></div>
      <div className="container hero-grid hero-content">
        <div className="hero-copy">
          <span className="eyebrow">SaranPlay • Jogos e Serviços</span>
          <h1>Mesas de bilhar profissionais para o seu negócio</h1>
          <p>Venda de mesas de bilhar, acessórios, entrega, montagem e assistência em Tete, Chimoio e Nampula.</p>
          <div className="hero-actions">
            <Link className="btn" to="/produtos">Ver catálogo</Link>
            <a className="btn ghost" href="https://wa.me/258875563554" target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </div>
        <div className="hero-logo-card">
          <img src="/images/saranplay-logo.jpeg" alt="SaranPlay Jogos e Serviços" />
        </div>
      </div>
    </section>

    <section className="section container">
      <div className="section-head"><div><span className="eyebrow">Destaques</span><h2>Produtos e serviços</h2></div><Link to="/produtos">Ver todos</Link></div>
      <div className="cards">{featured.map((p)=><article className="product-card" key={p.name}><img className="product-photo" src={p.image} alt={p.name}/><h3>{p.name}</h3><p>{p.desc}</p><strong>{p.price}</strong></article>)}</div>
    </section>

    <section className="benefits">
      <div className="container cards">
        <div><h3>Entrega e montagem</h3><p>Serviço completo para deixar a sua mesa pronta para uso.</p></div>
        <div><h3>Atendimento rápido</h3><p>Pedidos e suporte direto pelo WhatsApp.</p></div>
        <div><h3>Presença em três cidades</h3><p>Atendimento em Tete, Chimoio e Nampula.</p></div>
      </div>
    </section>

    <section className="section showroom-section">
      <div className="container showroom-grid">
        <div>
          <span className="eyebrow">Nossa loja</span>
          <h2>Conheça a qualidade SaranPlay</h2>
          <p>Equipamentos selecionados para lazer, rendimento extra e valorização do seu estabelecimento.</p>
          <a className="btn" href="https://wa.me/258875563554" target="_blank" rel="noreferrer">Solicitar orçamento</a>
        </div>
        <img src="/images/loja-mesa-bilhar.jpeg" alt="Mesa de bilhar na loja SaranPlay" />
      </div>
    </section>
  </>
}
