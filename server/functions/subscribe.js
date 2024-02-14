import { MailerLiteClient } from '../services/MailerLiteClient'

const handler = async (event) => {
  const subscribeService = new MailerLiteClient()

  try {
    if (event.httpMethod === 'POST') {
      //console.log(event.body)
      const { email, campaign, instance, tags } = JSON.parse(event.body)

      //console.log('Subscribing to Mailchimp for email : ', email)
      const response = await subscribeService.addMemberToList({
        email,
        campaign,
        instance,
        tags,
      })
      const resJson = await response.json()

      if ([200, 201].includes(response.status)) {
        return {
          statusCode: 200,
          body: JSON.stringify(resJson),
        }
      }
      return {
        statusCode: parseInt(resJson.status),
        body: JSON.stringify(resJson),
      }
    } else {
      if (event.httpMethod === 'GET') {
        return {
          statusCode: 200,
          body: 'Working fine',
        }
      }
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: err,
    }
  }
}

export { handler }
