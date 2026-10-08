import AppLink from '../navigation/AppLink.jsx'

export default function Button({ variant = 'primary', href, navigate, className = '', children, ...props }) {
  const classes = ['btn', variant === 'primary' ? '' : variant, className].filter(Boolean).join(' ')
  if (href) return <AppLink className={classes} href={href} navigate={navigate} {...props}>{children}</AppLink>
  return <button className={classes} type="button" {...props}>{children}</button>
}