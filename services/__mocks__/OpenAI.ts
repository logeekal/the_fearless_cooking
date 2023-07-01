import {
  sampleGPTResponse,
  sampleImageResponse,
} from '../sample_data/ai_sample_recipe.data'

const mock = jest.fn().mockImplementation(() => ({
  completion: async () =>
    Promise.resolve(sampleGPTResponse.choices[0].message.content),
  image: async () => Promise.resolve(sampleImageResponse),
}))

export const OpenAI = mock
