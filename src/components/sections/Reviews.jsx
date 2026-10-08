import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ReviewCard from './ReviewCard.jsx'

const reviews = [
  ['VM', 'Valeria M.', 'Quedé encantada con mi ramo. La presentación fue hermosa y superó completamente mis expectativas. Se nota el cuidado en cada detalle.'],
  ['CR', 'Camila R.', 'Fue el regalo perfecto. La atención fue excelente y el ramo llegó tal como lo había imaginado. Definitivamente volvería a comprar.'],
  ['AP', 'Andrea P.', 'Me encantó la calidad y el diseño del ramo. Todo se veía delicado, elegante y muy bien presentado. ¡Lo recomiendo muchísimo!'],
]

export default function Reviews() {
  return <Section className="reviews"><SectionHeading className="reviews-head" eyebrow="Palabras que florecen" title="Lo que dicen nuestros clientes" description="Cada detalle cuenta, y nuestros clientes lo hacen parte de sus momentos especiales." /><div className="reviews-grid">{reviews.map(([initials, name, text]) => <ReviewCard key={initials} initials={initials} name={name} text={text} />)}</div></Section>
}