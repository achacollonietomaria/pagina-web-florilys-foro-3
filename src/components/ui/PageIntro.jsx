export default function PageIntro({ eyebrow, title, description, className = '', titleClassName = '', container = true, children, ...props }) {
  return <section className={`page-intro ${className}`.trim()} {...props}>
    <div className={container ? 'container' : undefined}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 className={titleClassName || undefined}>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </div>
  </section>
}