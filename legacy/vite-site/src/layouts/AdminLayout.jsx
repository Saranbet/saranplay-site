import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Package, Boxes, LogOut } from 'lucide-react'

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand admin-brand">Saran<span>Play</span></div>
        <NavLink to="/admin" end><LayoutDashboard size={19}/> Dashboard</NavLink>
        <NavLink to="/admin/produtos"><Package size={19}/> Produtos</NavLink>
        <NavLink to="/admin/stock"><Boxes size={19}/> Stock</NavLink>
        <NavLink to="/"><LogOut size={19}/> Sair</NavLink>
      </aside>
      <section className="admin-content"><Outlet /></section>
    </div>
  )
}
