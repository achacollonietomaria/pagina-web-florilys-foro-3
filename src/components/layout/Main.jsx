export default function Main({ className = '', children, ...props }) {
  return <main className={className || undefined} {...props}>{children}</main>
}