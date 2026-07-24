import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/public/Home'
import Products from './pages/public/Products'
import Contact from './pages/public/Contact'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import Inventory from './pages/admin/Inventory'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/contactos" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<AdminProducts />} />
        <Route path="stock" element={<Inventory />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
