import { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  return Promise.resolve({
    statusCode: 501,
  })
  /*
   *  if (event.httpMethod === 'GET') {
   *    try {
   *      const query = event.queryStringParameters
   *      let ingredients
   *      try {
   *        if (!('ingredient' in query)) {
   *          throw new Error('ingredient list is mandatory')
   *        }
   *        ingredients = JSON.parse(query['ingredients']) as string[]
   *
   *        if (!Array.isArray(ingredients)) {
   *          throw new Error('ingredient should be a list')
   *        }
   *      } catch (ingredientError) {
   *        return Promise.resolve({
   *          statusCode: 400,
   *          body: String(ingredientError),
   *        })
   *      }
   *
   *      const recipeType: string = query['type'] ?? 'none'
   *
   *      const cuisine: string | undefined = query['cuisine'] ?? ''
   *
   *      const recipeTypePrompt = ['vegan', 'vegetarian'].includes(recipeType)
   *        ? `must be ${recipeType}`
   *        : ''
   *
   *      const ingredientsPrompt =
   *        ingredients.length === 0
   *          ? ''
   *          : `Must contain ingredients : ${ingredients.join(' ')}`
   *
   *      // eslint-disabled-next-line
   *      const prompt = `Array of 3 ${cuisine} dishes. ${ingredientsPrompt}. ${recipeTypePrompt}. Do not include the recipe, only name and 1 line description.`
   *
   *      const openAIService = new OpenAI()
   *      const response = await openAIService.completion(prompt)
   *
   *      return Promise.resolve({
   *        statusCode: 200,
   *        body: response,
   *      })
   *    } catch (err) {
   *      console.error(err)
   *      return Promise.resolve({
   *        statusCode: 500,
   *        body: String(err),
   *      })
   *    }
   *  }
   */
}
