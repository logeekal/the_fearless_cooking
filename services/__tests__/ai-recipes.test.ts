import { AIRecipes } from '../AIRecipes'
import { OpenAI } from '../OpenAI'
jest.mock('../OpenAI.ts')

describe('AI Recipes', () => {
  it('should get complete recipe', async () => {
    const openAIService = new OpenAI()
    const aiRecipeService = new AIRecipes(openAIService)

    const completeRecipe = await aiRecipeService.singleRecipe(
      'testing',
      123,
      '/tmp'
    )

    expect(completeRecipe.id).toBe(123)
    const keysToCheck = [
      'id',
      'excerpt',
      'image',
      'recipeName',
      'cookTime',
      'prepTime',
      'totalTime',
    ]

    keysToCheck.forEach((element) => {
      expect(Object.keys(completeRecipe)).toContain(element)
    })
  })
})
