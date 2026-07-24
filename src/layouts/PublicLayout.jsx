import { Outlet, NavLink } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div>
      <header className="site-header">
        <div className="container nav-wrap">
          <NavLink to="/" className="brand brand-logo" aria-label="SaranPlay">
            <img src="/images/saranplay-logo.jpeg" alt="Logotipo oficial SaranPlay" />
          </NavLink>
          <nav>
            <NavLink to="/">Início</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/contactos">Contactos</NavLink>
            <NavLink to="/login" className="btn small">Entrar no POS</NavLink>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/saranplay-logo.jpeg" alt="SaranPlay" />
            <div><strong>SaranPlay</strong><p>Jogos e Serviços</p></div>
          </div>
          <div><p>Tete • Chimoio • Nampula</p><p>84 563 5541 / 87 556 3554</p></div>
        </div>
      </footer>
    </div>
  )
}
