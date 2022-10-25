export function getIfExists(val: unknown | undefined, name: string) {
  if (!val) {
    throw new Error(`Missing mandatory param : ${name}`)
  }
  return val as string
}
