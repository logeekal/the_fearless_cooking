export type SubscriberInfo = {
  email: string
  tags: string[]
  instance: 'development' | 'production' | 'test'
  campaign: string
  name?: string
  ip?: string
}
