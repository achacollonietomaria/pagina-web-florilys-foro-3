import Main from '../components/layout/Main.jsx'
import ProductGrid from '../components/catalog/ProductGrid.jsx'
import Button from '../components/ui/Button.jsx'
import Image from '../components/ui/Image.jsx'
import Section from '../components/ui/Section.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SplitSection from '../components/sections/SplitSection.jsx'
import { products } from '../data/products.js'

export default function HomePage({ navigate, addToCart }) {
  return <Main>
    <section className="hero"><div className="container hero-copy"><div className="eyebrow">Taller floral · Cochabamba</div><h1>Flores con un toque de <em>magia</em>.</h1><p>Arreglos botánicos para celebrar lo cotidiano, decir lo que sientes y llenar de belleza los espacios que habitas.</p><Button href="/productos" navigate={navigate}>Explorar ramos <span>→</span></Button></div><div className="hero-art container"><Image src="descargar-77.jpg" alt="Ramo floral artesanal" /></div></section>
    <Section className="container" container={false}><SectionHeading eyebrow="Elegidos para ti" title="La colección del momento" action={<Button variant="outline" href="/productos" navigate={navigate}>Ver colección</Button>} /><ProductGrid items={[products[2], products[4], products[6], products[7]]} navigate={navigate} addToCart={addToCart} /></Section>
    <SplitSection sectionClassName="band" eyebrow="Hecho a mano" title="Un ramo dice más cuando nace con intención." paragraphs={[{ text: 'Diseñamos cada composición en nuestro taller de Cochabamba con flores de temporada, texturas inesperadas y mucho cuidado.' }]} imageSrc="boutique-1.jpg" imageAlt="Florista preparando un arreglo" action={{ href: '/nosotros', label: 'Conocer Florilys' }} navigate={navigate} />
  </Main>
}