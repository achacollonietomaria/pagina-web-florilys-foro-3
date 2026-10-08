import { useEffect, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Toast from './components/ui/Toast.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import { products } from './data/products.js'
import './legacy.css'
import './florilys.css'

const CART_KEY = 'florilys_cart'
const CHECKOUT_KEY = 'florilys_checkout'

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch (error) {
    console.error(`No se pudo leer "${key}" desde localStorage.`, error)
    return fallback
  }
}

function readCart() {
  const saved = readStorage(CART_KEY, [])
  if (!Array.isArray(saved)) {
    console.error(`El valor guardado en "${CART_KEY}" no es una lista.`)
    return []
  }

  const cart = saved.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item) || typeof item.id !== 'string' || !item.id.trim()) return []
    if (item.price === null || item.price === '' || (typeof item.price !== 'number' && typeof item.price !== 'string')) return []
    const price = Number(item?.price)
    const quantity = Number(item?.quantity ?? 1)
    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(quantity) || quantity < 1) return []
    return [{ ...item, price, quantity, key: typeof item.key === 'string' && item.key ? item.key : item.id }]
  })
  if (cart.length !== saved.length) console.error(`Se omitieron elementos inválidos de "${CART_KEY}".`)
  return cart
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`No se pudo guardar "${key}" en localStorage.`, error)
  }
}

export default function AppRoot() {
  const [location, setLocation] = useState(() => `${window.location.pathname}${window.location.search}`)
  const [cart, setCart] = useState(readCart)
  const [checkout, setCheckout] = useState(() => {
    const saved = readStorage(CHECKOUT_KEY, {})
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
      console.error(`El valor guardado en "${CHECKOUT_KEY}" no es un objeto.`)
      return {}
    }
    return { ...saved, hasDedication: Boolean(saved.hasDedication || saved.dedication) }
  })
  const [toast, setToast] = useState('')

  useEffect(() => {
    const sync = () => setLocation(`${window.location.pathname}${window.location.search}`)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  useEffect(() => { writeStorage(CART_KEY, cart) }, [cart])
  useEffect(() => { writeStorage(CHECKOUT_KEY, checkout) }, [checkout])
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])
  useEffect(() => {
    const path = window.location.pathname
    document.title = path === '/productos' || path === '/ramos' ? 'Ramos | Florilys' : path === '/carrito' ? 'Tu pedido | Florilys' : path === '/contacto' ? 'Contacto | Florilys' : path === '/nosotros' || path === '/quienes-somos' ? 'Quiénes somos | Florilys' : path.startsWith('/detalle') ? 'Detalle | Florilys' : 'Florilys | Flores para almas libres'
  }, [location])

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    setLocation(`${window.location.pathname}${window.location.search}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const addToCart = (product, options = {}) => {
    const key = `${product.id}-${options.date || ''}-${options.time || ''}`
    setCart((current) => current.some((item) => item.key === key) ? current.map((item) => item.key === key ? { ...item, quantity: Number(item.quantity || 1) + 1 } : item) : [...current, { ...product, ...options, key, quantity: 1 }])
    setToast(`${product.name} añadido al carrito`)
  }

  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const page = pathname === '/ramos' ? '/productos' : pathname === '/quienes-somos' ? '/nosotros' : pathname
  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)
  const product = products.find((item) => item.id === new URLSearchParams(window.location.search).get('id')) || products[2]
  let content
  if (page === '/productos') content = <ProductsPage navigate={navigate} addToCart={addToCart} />
  else if (page === '/detalle') content = <ProductDetailPage key={product.id} product={product} addToCart={addToCart} />
  else if (page === '/carrito') content = <CartPage cart={cart} setCart={setCart} checkout={checkout} setCheckout={setCheckout} navigate={navigate} showToast={setToast} />
  else if (page === '/nosotros') content = <AboutPage navigate={navigate} />
  else if (page === '/contacto') content = <ContactPage showToast={setToast} />
  else content = <HomePage navigate={navigate} addToCart={addToCart} />

  return <><Header page={page} cartCount={cartCount} navigate={navigate} />{content}<Footer navigate={navigate} /><Toast message={toast} /><div className="petals" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span className="petal" key={index} style={{ left: `${8 + index * 11}%`, '--size': `${7 + (index % 3) * 3}px`, '--duration': `${13 + (index % 4) * 2}s`, '--delay': `${index * -1.7}s` }} />)}</div></>
}