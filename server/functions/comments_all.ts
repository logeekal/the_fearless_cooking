import { Handler, HandlerEvent } from '@netlify/functions'

import { GetCommentsInputs } from '../../services/types'
import { getAllCommentsController } from '../routes/controllers/comments'
import { getIfExists } from '../utils/func_utils'

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve({
      statusCode: 405,
    })
  }

  try {
    const parsedBody = JSON.parse(event.body ?? '{}') as GetCommentsInputs

    const { postId } = parsedBody

    getIfExists(postId, 'postId')

    const output = await getAllCommentsController(parsedBody)
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    }
  } catch (err) {
    console.error({ err })
    return Promise.resolve({
      statusCode: 500,
      body: String(err),
    })
  }
}
