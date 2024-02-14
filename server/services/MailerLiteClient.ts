import { getIfExists } from '../utils/func_utils'
import { SubscriberInfo } from './types'

require('isomorphic-fetch')

type MailerLiteSubscriptionPayload = {
  email: string
  fields: {
    [k: string]: string | number
  }
  ip_address?: string
}

export class MailerLiteClient {
  MAILERLITE_KEY: string
  BASE_URL = 'https://connect.mailerlite.com/api'

  constructor() {
    this.MAILERLITE_KEY = getIfExists(
      process.env.MAILERLITE_KEY,
      'mailerlite_key'
    )

    console.debug({ key: this.MAILERLITE_KEY })
  }

  addMemberToList = async (subscriber: SubscriberInfo) => {
    const { email, tags, ip, instance, campaign } = subscriber
    const [tag_1, tag_2] = tags
    const response = await fetch(`${this.BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.MAILERLITE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: {
          instance,
          campaign,
          tag_1,
          tag_2,
        },
        ip_address: ip,
      } as MailerLiteSubscriptionPayload),
    })

    return response
  }
}
