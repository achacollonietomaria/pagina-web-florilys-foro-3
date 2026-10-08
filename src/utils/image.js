export function imageSource(name) {
  if (name?.startsWith('/assets/images/')) return name
  return `/assets/images/${name?.replace(/^assets\/images\//, '')}`
}