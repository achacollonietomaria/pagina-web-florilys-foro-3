import AppLink from '../navigation/AppLink.jsx'

export default function Footer({ navigate }) {
  return <footer className="site-footer"><div className="container footer-inner"><div><AppLink className="brand" href="/" navigate={navigate}>Florilys</AppLink><p className="text-muted">Arreglos florales para almas libres.</p></div><nav className="footer-links"><AppLink href="/productos" navigate={navigate}>Ramos</AppLink><AppLink href="/nosotros" navigate={navigate}>Nosotros</AppLink><AppLink href="/contacto" navigate={navigate}>Contacto</AppLink><AppLink href="/carrito" navigate={navigate}>Carrito</AppLink></nav></div></footer>
}