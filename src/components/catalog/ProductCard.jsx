import { useState } from 'react'
import AppLink from '../navigation/AppLink.jsx'
import Button from '../ui/Button.jsx'
import Image from '../ui/Image.jsx'
import { money } from '../../utils/money.js'

export default function ProductCard({ product, navigate, addToCart }) {
  const [added, setAdded] = useState(false)
  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return <article className="product-card" data-color={product.color} data-price={product.price}>
    <AppLink className="product-image" href={`/detalle?id=${product.id}`} navigate={navigate}><Image src={product.image} alt={`Ramo ${product.name}`} loading="lazy" /></AppLink>
    <h3><AppLink href={`/detalle?id=${product.id}`} navigate={navigate}>{product.name}</AppLink></h3>
    <div className="type">{product.type}</div><div className="price">{money(product.price)}</div>
    <Button variant="outline" className={added ? 'added' : ''} onClick={handleAdd} aria-label={`Añadir ${product.name} al carrito`}>{added ? '✓ Agregado al carrito' : 'Añadir'}</Button>
  </article>
}