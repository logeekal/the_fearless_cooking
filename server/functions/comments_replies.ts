import { HandlerEvent } from '@netlify/functions'

import {
  getRepliesController,
  GetRepliesControllerInput,
} from '../routes/controllers/comments'
import { getIfExists } from '../utils/func_utils'

export const handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve({
      statusCode: 405,
    })
  }

  try {
    const parsedBody = JSON.parse(
      event.body ?? '{}'
    ) as GetRepliesControllerInput

    const { commentInternalId } = parsedBody

    getIfExists(commentInternalId, 'commentInternalId')

    const output = await getRepliesController(parsedBody)

    return {
      statusCode: 200,
      body: JSON.stringify(output),
    }
  } catch (err) {
    console.error(err)
    return Promise.resolve({
      statusCode: 500,
      body: String(err),
    })
  }
}
