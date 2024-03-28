import { NextApiRequest, NextApiResponse } from 'next'

import { getAllCommentsController } from '../../../server/routes/controllers/comments'
import { getIfExists } from '../../../server/utils/func_utils'
import { GetCommentsInputs } from '../../../services/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
    return
  }

  try {
    const parsedBody = req.body as GetCommentsInputs

    const { postId } = parsedBody

    getIfExists(postId, 'postId')

    const output = await getAllCommentsController(parsedBody)

    res.status(200).json(output)
  } catch (err) {
    console.error({ err })
    res.status(500).send(err)
  }
}
