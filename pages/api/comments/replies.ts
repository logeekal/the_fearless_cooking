import { NextApiRequest, NextApiResponse } from 'next'

import {
  getRepliesController,
  GetRepliesControllerInput,
} from '../../../server/routes/controllers/comments'
import { getIfExists } from '../../../server/utils/func_utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req.method', req.method)
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
    return
  }

  try {
    const parsedBody = req.body as GetRepliesControllerInput

    const { commentInternalId } = parsedBody

    getIfExists(commentInternalId, 'commentInternalId')

    const output = await getRepliesController(parsedBody)

    res.status(200).json(output)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}
