export default function AppLink({ href, navigate, children, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return
    event.preventDefault()
    navigate(href)
  }

  return <a href={href} onClick={handleClick} {...props}>{children}</a>
}