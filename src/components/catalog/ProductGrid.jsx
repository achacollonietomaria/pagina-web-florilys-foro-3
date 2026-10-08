import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ items, navigate, addToCart }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} />)}</div>
}