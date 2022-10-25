import MailchimpClient from './services/MailChimpClient'

const handler = async (event) => {
  const subscribeService = new MailchimpClient()

  try {
    if (event.httpMethod === 'POST') {
      //console.log(event.body)
      const { email, tags } = JSON.parse(event.body)

      //console.log('Subscribing to Mailchimp for email : ', email)
      const response = await subscribeService.addMemberToList(email, tags)
      const resJson = await response.json()
      //console.log(resJson)
      if (response.status === 200) {
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
