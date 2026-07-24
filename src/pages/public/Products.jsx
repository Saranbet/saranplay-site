const products = [
  ['Mesa de bilhar metálica','95.000 MT','Mesas'],
  ['Taco profissional','2.500 MT','Acessórios'],
  ['Bolas de bilhar completas','7.500 MT','Acessórios'],
  ['Giz para taco','Sob consulta','Acessórios'],
  ['Pano para mesa','Sob consulta','Peças'],
  ['Triângulo para bolas','Sob consulta','Acessórios'],
]
export default function Products(){return <section className="section container"><span className="eyebrow">Catálogo</span><h1>Nossos produtos</h1><div className="cards products-grid">{products.map(([name,price,cat])=><article className="product-card" key={name}><div className="product-image">{cat}</div><small>{cat}</small><h3>{name}</h3><strong>{price}</strong><a className="btn full" href={`https://wa.me/258875563554?text=Olá, tenho interesse em ${encodeURIComponent(name)}`}>Pedir pelo WhatsApp</a></article>)}</div></section>}
