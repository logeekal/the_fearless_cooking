import { HandlerEvent } from '@netlify/functions'

import { AddCommentArgs } from '../../services/types'
import { addCommentController } from '../routes/controllers/comments'
import { getIfExists } from '../utils/func_utils'

export const handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve({
      statusCode: 405,
      body: 'Method not allowed',
    })
  }

  try {
    const parsedBody = JSON.parse(event.body ?? '{}') as AddCommentArgs
    const {
      content,
      meta: { rating },
      author_ip,
      author_user_agent,
      post,
    } = parsedBody

    getIfExists(content, 'content')
    getIfExists(rating, 'rating')
    getIfExists(author_ip, 'author_ip')
    getIfExists(author_user_agent, 'author_user_agent')
    getIfExists(post, 'post')

    const output = await addCommentController(parsedBody)

    return Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(output),
    })
  } catch (err) {
    return Promise.resolve({
      statusCode: 500,
      body: err,
    })
  }
}
