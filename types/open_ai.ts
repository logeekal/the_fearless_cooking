import { sampleGPTResponse } from '../services/sample_data/ai_sample_recipe.data'

export type ImageResponse = {
  created: number
  data: ImageURLFormat[] | ImageB64Format[]
}

export type ImageURLFormat = {
  url: string
}

export type ImageB64Format = {
  b64_json: string
}

export type ImageRequest = {
  prompt: string
  n: number
  size: '256x256' | '1024x1024' | '512x512'
  response_format: 'b64_json' | 'url'
}

export type GPT35ModelRequest = {
  model: string
  messages: Array<{
    content: string
    role: string
  }>
  n: number
  temperature?: number
}

export type AIRecipeObject = {
  excerpt: string
  recipeName: string
  servings: string
  prepTime: string
  cookTime: string
  totalTime: string
  ingredients: Array<RecipeIngredient>
  instructions: Array<string>
  nutrition?: {
    calories: string
    fat: string
    sugar: string
    protien: string
  }
}

export type AIRecipeWithId = {
  id: number
} & AIRecipeObject

export type AIRecipeWithImage = {
  image: {
    large: string
    medium: string
    small: string
  }
} & AIRecipeWithId

export type AIRecipe = AIRecipeWithImage

export type RecipeIngredient = {
  name: string
  quantity: string
  unit?: string
  alternative?: string
  notes?: string
}

export type GPT35Response = typeof sampleGPTResponse

export type GuessRecipeFunctionRequest = {
  ingredients: string[]
  cuisine?: string
  type: 'vegetarian' | 'vegan' | 'none'
}
