require('isomorphic-fetch')

import { getIfExists } from '../utils/func_utils'

export default class MailchimpClient {
  LIST_ID: string
  MAILCHIMP_API_KEY: string
  MAILCHIMP_URL: string

  constructor() {
    this.LIST_ID = getIfExists(
      process.env.MAILCHIMP_LIST_ID,
      'mailchimp_list_id'
    )
    this.MAILCHIMP_API_KEY = getIfExists(
      process.env.MAILCHIMP_KEY,
      'mailchimp_key'
    )

    this.MAILCHIMP_URL = 'https://us19.api.mailchimp.com/3.0'
  }

  addMemberToList = async (email: string, tags: string[]) => {
    const response: unknown = await fetch(
      `${this.MAILCHIMP_URL}/lists/${this.LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${this.getAuthorizationString()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          tags,
          status: 'subscribed',
        }),
      }
    )

    return response
  }

  getAuthorizationString = () => {
    return Buffer.from(`SOMESTRING:${this.MAILCHIMP_API_KEY}`).toString(
      'base64'
    )
  }
}
