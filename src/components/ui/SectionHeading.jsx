export default function SectionHeading({ eyebrow, title, description, action, className = '', as: Heading = 'h2' }) {
  return <div className={`section-head ${className}`.trim()}>
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <Heading>{title}</Heading>
    </div>
    {description && <p>{description}</p>}
    {action}
  </div>
}