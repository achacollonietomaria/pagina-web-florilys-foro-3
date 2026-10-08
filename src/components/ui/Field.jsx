export default function Field({ id, label, children, className = '' }) {
  return <div className={`field ${className}`.trim()}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
}