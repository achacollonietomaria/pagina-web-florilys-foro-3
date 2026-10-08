import Main from '../components/layout/Main.jsx'
import PageIntro from '../components/ui/PageIntro.jsx'
import SplitSection from '../components/sections/SplitSection.jsx'

export default function AboutPage({ navigate }) {
  return <Main>
    <PageIntro eyebrow="Nuestra historia" title="Florece contigo." description="Creemos que las flores tienen una forma especial de decir aquello que a veces no sabemos cómo expresar." />
    <SplitSection sectionClassName="section" imageFirst eyebrow="Nuestro equipo" title="Hecho con manos, tiempo y corazón." paragraphs={[{ text: 'Somos un colectivo de apasionados por la botánica y el diseño. Liderados por floristas con décadas de experiencia, nuestro equipo en Cochabamba se dedica a transformar cada tallo en una expresión de arte y sentimiento.', muted: true }, { text: 'Cada arreglo que sale de nuestro taller lleva consigo la dedicación y el amor de manos que entienden el lenguaje silencioso de las flores.', muted: true }]} imageSrc="boutique-2.jpg" imageAlt="Arreglo floral de Florilys" action={{ href: '/contacto', label: 'Hablemos' }} navigate={navigate} />
    <SplitSection sectionClassName="band" eyebrow="Nuestra boutique" title="Un refugio de calma y belleza natural." paragraphs={[{ text: 'Te invitamos a visitarnos para experimentar las texturas, los aromas y la paleta de colores que definen cada temporada.' }, { text: 'Cochabamba, Bolivia · Visitas con cita previa' }]} imageSrc="boutique-3.jpg" imageAlt="Flores frescas en la boutique" />
  </Main>
}