export default function ReviewCard({ initials, name, text }) {
  return <article className="review-card"><div className="review-avatar" aria-hidden="true">{initials}</div><div><h3>{name}</h3><div className="stars" aria-label="5 de 5 estrellas">★★★★★</div></div><p>“{text}”</p></article>
}