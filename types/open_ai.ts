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
}

export type RecipeObject = {
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

export type RecipeWithId = {
  id: number
} & RecipeObject

export type RecipeWithImage = {
  image: {
    large: string
    small: string
  }
} & RecipeWithId

export type RecipeIngredient = {
  name: string
  quantity: string
  alternative?: string
}

export type GPT35Response = typeof sampleGPTResponse

export type GuessRecipeFunctionRequest = {
  ingredients: string[]
  cuisine?: string
  type: 'vegetarian' | 'vegan' | 'none'
}
