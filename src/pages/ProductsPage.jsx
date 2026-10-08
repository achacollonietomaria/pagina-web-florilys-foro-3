import { useState } from 'react'
import Main from '../components/layout/Main.jsx'
import ProductGrid from '../components/catalog/ProductGrid.jsx'
import Reviews from '../components/sections/Reviews.jsx'
import PageIntro from '../components/ui/PageIntro.jsx'
import Section from '../components/ui/Section.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { products } from '../data/products.js'

const filters = [['all', 'Todos'], ['price', 'Precio'], ['color', 'Tonos cálidos']]

export default function ProductsPage({ navigate, addToCart }) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'price' ? [...products].sort((a, b) => a.price - b.price) : filter === 'color' ? products.filter((product) => ['pink', 'red'].includes(product.color)) : products
  return <Main>
    <PageIntro eyebrow="Diseños botánicos" title="Colección de Ramos" description="Belleza inesperada para mujeres de espíritu libre. Arreglos florales diseñados con un toque de magia." />
    <Section className="container" container={false}><SectionHeading title="Nuestros diseños" description="Elige el gesto que quieres regalar; nosotros nos encargamos de hacerlo inolvidable." /><div className="filters" aria-label="Filtrar ramos">{filters.map(([value, label]) => <button className={`filter${filter === value ? ' active' : ''}`} key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div><ProductGrid items={visible} navigate={navigate} addToCart={addToCart} /></Section>
    <Reviews />
  </Main>
}