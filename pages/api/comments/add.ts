import { NextApiRequest, NextApiResponse } from 'next'

import { addCommentController } from '../../../server/routes/controllers/comments'
import { getIfExists } from '../../../server/utils/func_utils'
import { AddCommentArgs } from '../../../services/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
    return
  }

  try {
    const parsedBody = req.body as AddCommentArgs
    const {
      content,
      meta: { rating },
      author_ip,
      author_user_agent,
      post,
      parent,
    } = parsedBody

    getIfExists(content, 'content')
    if (parent === 0) {
      getIfExists(rating, 'rating')
    }
    getIfExists(author_ip, 'author_ip')
    getIfExists(author_user_agent, 'author_user_agent')
    getIfExists(post, 'post')

    const output = await addCommentController(parsedBody)

    res.status(200).json(output)
  } catch (err) {
    res.status(500).send(err)
  }
}
