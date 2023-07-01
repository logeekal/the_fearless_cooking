export const safeName = (name: string) => {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
}
