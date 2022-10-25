export type ICacheService = {
  set(name: string, value: string): void
  get(name: string): Buffer | undefined
}
