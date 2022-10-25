import { Handler } from '@netlify/functions'

import RecipeService from '../../services/RecipeService'
import { getIfExists } from '../utils/func_utils'

export type ValidPayload = {
  id: number
  count?: number
  after?: string
}

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const { id, count, after } =
        event.queryStringParameters as unknown as ValidPayload

      const courseId = parseInt(getIfExists(id, 'id'))
      const recipeService = new RecipeService()

      const recipeCourse = await recipeService.getCourseSummaryById(
        courseId,
        count
      )

      //console.log(recipeCourse)

      return {
        statusCode: 200,
        body: JSON.stringify(recipeCourse),
      }
    } else {
      return {
        statusCode: 405,
        body: '',
      }
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: String(err),
    }
  }
}

export { handler }
