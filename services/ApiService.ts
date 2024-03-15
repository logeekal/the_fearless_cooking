import axios from 'axios'

import { SearchResultType } from '../types/common'

export class ApiService {
  BASE_URL: string

  constructor() {
    this.BASE_URL = '/api'
  }

  async search(term: string): Promise<Array<SearchResultType>> {
    const searchURI = `${this.BASE_URL}/search?term=${term}`

    try {
      const result = await axios.get<Array<SearchResultType>>(searchURI)

      return result.data
    } catch (err) {
      throw new Error(String(err))
    }
  }
}
