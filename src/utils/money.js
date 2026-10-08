export function money(value) {
  return `Bs. ${Number(value).toLocaleString('es-BO')}`
}