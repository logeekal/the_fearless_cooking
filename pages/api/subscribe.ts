import { NextApiRequest, NextApiResponse } from 'next'

import { MailerLiteClient } from '../../server/services/MailerLiteClient'
import { SubscriberInfo } from '../../server/services/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subscribeService = new MailerLiteClient()

  try {
    if (req.method === 'POST') {
      const { email, campaign, instance, tags } = JSON.parse(
        String(req.body)
      ) as SubscriberInfo

      //console.log('Subscribing to Mailchimp for email : ', email)
      const response = await subscribeService.addMemberToList({
        email,
        campaign,
        instance,
        tags,
      })
      const resJson = (await response.json()) as unknown

      if ([200, 201].includes(response.status)) {
        res.status(200).json(resJson)
        return
      }
      res.status(response.status).send(resJson)
      return
    } else {
      if (req.method === 'GET') {
        res.status(402).send('Method not allowed')
        return
      }
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
    return
  }
}
