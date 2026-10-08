import AppLink from '../navigation/AppLink.jsx'
import Image from '../ui/Image.jsx'

export default function SplitSection({ sectionClassName = '', imageFirst = false, imageSrc, imageAlt, eyebrow, title, paragraphs, action, navigate }) {
  const copy = <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2>{paragraphs.map((paragraph) => <p className={paragraph.muted ? 'text-muted' : undefined} key={paragraph.text}>{paragraph.text}</p>)}{action && <AppLink className="btn" href={action.href} navigate={navigate}>{action.label} <span>→</span></AppLink>}</div>
  const photo = <Image src={imageSrc} alt={imageAlt} />
  return <section className={sectionClassName}><div className="container split">{imageFirst ? <>{photo}{copy}</> : <>{copy}{photo}</>}</div></section>
}