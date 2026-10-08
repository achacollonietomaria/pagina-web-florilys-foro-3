export default function Section({ className = '', container = true, children, ...props }) {
  return <section className={`section ${className}`.trim()} {...props}>
    {container ? <div className="container">{children}</div> : children}
  </section>
}