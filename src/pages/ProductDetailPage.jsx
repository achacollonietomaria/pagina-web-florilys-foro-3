import { useState } from 'react'
import Main from '../components/layout/Main.jsx'
import Button from '../components/ui/Button.jsx'
import Field from '../components/ui/Field.jsx'
import Image from '../components/ui/Image.jsx'
import { money } from '../utils/money.js'

export default function ProductDetailPage({ product, addToCart }) {
  const [dedication, setDedication] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [added, setAdded] = useState(false)
  const now = new Date()
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const submit = (event) => {
    event.preventDefault()
    addToCart(product, { dedication, date, time })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return <Main className="container"><div className="detail"><div><Image className="detail-main-image" src={product.image} alt={`Ramo ${product.name}`} /></div><div className="detail-info"><div className="eyebrow">Colección Florilys</div><h1>{product.name}</h1><div className="price">{money(product.price)}</div><p className="description">{product.description}</p><div className="tag-list">{product.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><form onSubmit={submit}><Field id="detail-dedication" label="Dedicatoria (opcional)"><textarea id="detail-dedication" rows="3" maxLength="150" placeholder="Escribe un mensaje especial..." value={dedication} onChange={(event) => setDedication(event.target.value)} /></Field><div className="form-grid"><Field id="delivery-date" label="Fecha de entrega"><input id="delivery-date" type="date" min={minDate} required value={date} onChange={(event) => setDate(event.target.value)} /></Field><Field id="delivery-time" label="Horario"><select id="delivery-time" required value={time} onChange={(event) => setTime(event.target.value)}><option value="">Seleccionar</option><option value="mañana">Mañana, 9:00 - 12:00</option><option value="tarde">Tarde, 14:00 - 18:00</option></select></Field></div><Button type="submit" className={added ? 'added' : ''}>{added ? '✓ Agregado al carrito' : 'Añadir al carrito'} <span>→</span></Button></form></div></div></Main>
}