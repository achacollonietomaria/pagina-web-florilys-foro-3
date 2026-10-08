import Main from '../components/layout/Main.jsx'
import Button from '../components/ui/Button.jsx'
import Field from '../components/ui/Field.jsx'
import Image from '../components/ui/Image.jsx'
import PageIntro from '../components/ui/PageIntro.jsx'
import { products } from '../data/products.js'
import { money } from '../utils/money.js'

const deliveryMethods = [
  ['pickup', 'Retiro en el local', 'Recoge tu pedido directamente en nuestro local.'],
  ['delivery', 'Delivery', 'Recibe tu pedido en la dirección que nos indiques.'],
  ['cod', 'Contra entrega', 'Realiza el pago al momento de recibir tu pedido.'],
]
const paymentMethods = [['qr', 'Pago QR'], ['cash', 'Contra entrega'], ['transfer', 'Transferencia']]

export default function CartPage({ cart, setCart, checkout, setCheckout, navigate, showToast }) {
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0)
  const delivery = checkout.method === 'pickup' ? 0 : 20
  const changeQuantity = (key, amount) => setCart((current) => current.flatMap((item) => {
    if ((item.key || item.id) !== key) return [item]
    const quantity = Number(item.quantity || 1) + amount
    return quantity > 0 ? [{ ...item, quantity }] : []
  }))
  const submit = (event) => {
    event.preventDefault()
    setCart([])
    setCheckout({})
    showToast('Pedido recibido. Nos pondremos en contacto contigo pronto.')
  }

  return <Main className="container">
    <PageIntro container={false} style={{ textAlign: 'left' }} eyebrow="Tu selección" title="Tu pedido." titleClassName="page-title" description="Revisa los detalles antes de coordinar la entrega." />
    {cart.length === 0 ? <div className="empty"><h2>Tu carrito está esperando flores.</h2><p>Descubre nuestra colección y encuentra el detalle perfecto.</p><Button href="/productos" navigate={navigate}>Ver ramos</Button></div> : <>
      <section className="cart-layout"><div className="cart-list">{cart.map((item) => {
        const key = item.key || item.id
        return <article className="cart-item" key={key}><Image src={item.image || products[0].image} alt={item.name || 'Ramo floral'} /><div><h3>{item.name || 'Ramo floral'}</h3><div className="text-muted">{money(item.price)}{item.type ? ` · ${item.type}` : ''}</div>{(item.date || item.time || item.dedication) && <small className="cart-detail">{[item.date, item.time, item.dedication].filter(Boolean).join(' · ')}</small>}<div className="qty"><button type="button" onClick={() => changeQuantity(key, -1)} aria-label={`Disminuir cantidad de ${item.name}`}>−</button><span>{item.quantity || 1}</span><button type="button" onClick={() => changeQuantity(key, 1)} aria-label={`Aumentar cantidad de ${item.name}`}>+</button></div></div><div><strong>{money(Number(item.price || 0) * Number(item.quantity || 1))}</strong><br /><button className="remove" type="button" onClick={() => setCart((current) => current.filter((product) => (product.key || product.id) !== key))}>Eliminar</button></div></article>
      })}</div><aside className="summary"><h2>Resumen</h2><div className="total-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="total-line"><span>Delivery</span><strong>{money(delivery)}</strong></div><div className="total-line final"><span>Total</span><strong>{money(subtotal + delivery)}</strong></div><a className="btn" href="#checkout" style={{ width: '100%', marginTop: 22 }}>Continuar</a></aside></section>
      <section id="checkout" className="checkout-layout"><div><span className="eyebrow">Último paso</span><h2 className="page-title">Datos de entrega.</h2></div><form className="form-panel" onSubmit={submit}><Field id="buyer-name" label="Nombre completo"><input id="buyer-name" name="name" autoComplete="name" required /></Field><div className="form-grid"><Field id="buyer-email" label="Correo electrónico"><input id="buyer-email" name="email" type="email" autoComplete="email" required /></Field><Field id="buyer-phone" label="Teléfono"><input id="buyer-phone" name="phone" type="tel" autoComplete="tel" required /></Field></div>
        <section className="checkout-options"><h3>¿Cómo deseas recibir tu pedido?</h3><div className="delivery-options">{deliveryMethods.map(([value, label, description]) => <label className="delivery-option" key={value}><input type="radio" name="delivery_method" value={value} required checked={checkout.method === value} onChange={() => setCheckout((state) => ({ ...state, method: value }))} /><strong>{label}</strong><small>{description}</small></label>)}</div><p className="checkout-note">{checkout.method === 'pickup' ? 'Tu pedido estará listo para recogerlo en nuestro local.' : checkout.method === 'delivery' ? 'El delivery se coordinará con la dirección indicada.' : checkout.method === 'cod' ? 'El pago se realizará al recibir tu pedido.' : 'Selecciona una opción para continuar.'}</p>{checkout.method === 'delivery' && <Field id="delivery-address" label="Dirección de entrega" className="conditional-visible"><textarea id="delivery-address" name="delivery_address" rows="2" required value={checkout.address || ''} onChange={(event) => setCheckout((state) => ({ ...state, address: event.target.value }))} placeholder="Escribe la dirección completa" /></Field>}</section>
        <section className="checkout-subsection"><h3>¿Quieres agregar una dedicatoria?</h3><label className="dedication-toggle"><input type="checkbox" checked={Boolean(checkout.hasDedication)} onChange={(event) => setCheckout((state) => ({ ...state, hasDedication: event.target.checked }))} /> Sí, quiero agregar una dedicatoria</label>{checkout.hasDedication && <Field id="checkout-dedication" label="Escribe tu dedicatoria" className="conditional-visible"><textarea id="checkout-dedication" name="dedication" maxLength="200" rows="3" value={checkout.dedication || ''} onChange={(event) => setCheckout((state) => ({ ...state, dedication: event.target.value }))} placeholder="Ej.: Para alguien muy especial, con mucho cariño..." /><small id="dedication-counter">{(checkout.dedication || '').length} / 200 caracteres</small></Field>}</section>
        <section className="checkout-subsection"><h3>Método de pago</h3><div className="payment-options">{paymentMethods.map(([value, label]) => <label className="payment-option" key={value}><input type="radio" name="payment_method" value={value} required checked={checkout.payment === value} onChange={() => setCheckout((state) => ({ ...state, payment: value }))} />{label}</label>)}</div></section><Button type="submit">Confirmar pedido <span>→</span></Button>
      </form></section>
    </>}
  </Main>
}