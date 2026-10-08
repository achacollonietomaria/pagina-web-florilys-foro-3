import { useEffect, useState } from 'react'
import AppLink from '../navigation/AppLink.jsx'

const links = [['/', 'Inicio'], ['/productos', 'Ramos'], ['/nosotros', 'Quiénes somos'], ['/contacto', 'Contacto']]

export default function Header({ page, cartCount, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (href) => { setMenuOpen(false); navigate(href) }

  return <>
    <div className={`drawer${menuOpen ? ' open' : ''}`} hidden={!menuOpen} onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false) }}>
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menú de navegación"><button className="icon-btn" type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">×</button><nav className="drawer-nav">{links.map(([href, label]) => <AppLink key={href} href={href} navigate={go}>{label}</AppLink>)}<AppLink href="/carrito" navigate={go}>Carrito</AppLink></nav></aside>
    </div>
    <header className="site-header"><button className="icon-btn menu-btn" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-expanded={menuOpen}>☰</button><AppLink className="brand" href="/" navigate={navigate}>Florilys</AppLink><nav className="nav">{links.map(([href, label]) => <AppLink key={href} className={page === href ? 'active' : ''} href={href} navigate={navigate}>{label}</AppLink>)}</nav><AppLink className="icon-btn cart-link" href="/carrito" navigate={navigate} aria-label={`Abrir carrito, ${cartCount} productos`}>♧{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</AppLink></header>
  </>
}