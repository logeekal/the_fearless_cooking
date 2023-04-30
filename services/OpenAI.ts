import axios from 'axios'

import {
  GPT35ModelRequest,
  GPT35Response,
  ImageRequest,
  ImageResponse,
} from '../types/open_ai'
import { logger } from '../utils/logger'

export class OpenAI {
  API_KEY: string

  MODEL = 'gpt-3.5-turbo-0301'

  BASE_URL = 'https://api.openai.com/v1'
  constructor() {
    this.API_KEY =
      process.env.NODE_ENV === 'production'
        ? process.env.OPEN_AI_KEY ?? ''
        : process.env.OPEN_AI_TEST_KEY ?? ''

    if (!this.API_KEY || this.API_KEY.length == 0) {
      const msg = `Invalid OpenAI API_KEY: ${this.API_KEY}`
      logger.error(msg)
      throw new Error(msg)
    }
  }

  sendRequest = async <T>(
    path: string,
    payload: Record<string, unknown>
  ): Promise<T> => {
    const url = `${this.BASE_URL}${path}`
    try {
      const result = await axios.post<T>(url, payload, {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      return result.data
    } catch (err) {
      logger.error(err)
      throw new Error(String(err))
    }
  }

  completion = async (
    prompt: string,
    randomness: 'normal' | 'full' = 'normal'
  ): Promise<string> => {
    const payload: GPT35ModelRequest = {
      model: this.MODEL,
      messages: [
        {
          content: prompt,
          role: 'user',
        },
      ],
      n: 1,
      temperature: randomness === 'normal' ? 1 : 2,
    }

    const response = await this.sendRequest<GPT35Response>(
      '/chat/completions',
      payload
    )

    return response.choices[0].message.content
  }

  image = async (prompt: string): Promise<ImageResponse> => {
    const payload: ImageRequest = {
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    }

    return await this.sendRequest<ImageResponse>('/images/generations', payload)
  }
}
