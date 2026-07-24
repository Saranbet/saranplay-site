import { Outlet, NavLink } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div>
      <header className="site-header">
        <div className="container nav-wrap">
          <NavLink to="/" className="brand">Saran<span>Play</span></NavLink>
          <nav>
            <NavLink to="/">Início</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/contactos">Contactos</NavLink>
            <NavLink to="/login" className="btn small">Entrar</NavLink>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer>
        <div className="container footer-grid">
          <div><strong>SaranPlay</strong><p>Jogos e Serviços</p></div>
          <div><p>Tete • Chimoio • Nampula</p><p>84 563 5541 / 87 556 3554</p></div>
        </div>
      </footer>
    </div>
  )
}
