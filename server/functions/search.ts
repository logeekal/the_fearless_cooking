import { Handler } from '@netlify/functions'
import lunr from 'lunr'

import { IndexableRecipeObj } from '../../types/common'
import recipeIndex from '../assets/recipe_index.json'
import recipes from '../assets/recipes.json'
import { NO_OF_RESULTS } from '../constants'
import { ResultMetadata } from '../types'
import {
  convertToFieldResults,
  pruneMetaData,
  removeTermClassification,
} from '../utils/search'

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const query = event.queryStringParameters

      if (!query || !('term' in query)) {
        return Promise.resolve({
          statusCode: 402,
          message: 'Bad Request',
        })
      }

      const originalSearchQuery = query['term'] as string

      if (originalSearchQuery === '')
        return Promise.resolve({
          statusCode: 200,
          body: JSON.stringify([]),
        })

      const terms = originalSearchQuery.split(' ')
      const additionalTerms = terms.map((term) => `*${term}*`)

      const searchQuery = [...terms, ...additionalTerms].join(' ')

      const idx: lunr.Index = lunr.Index.load(recipeIndex)

      const allresults: lunr.Index.Result[] = idx.search(searchQuery)

      const results = allresults.slice(0, NO_OF_RESULTS)

      const recipeObj = recipes as IndexableRecipeObj

      const finalResults = results.map((result) => {
        const doc = recipeObj[result.ref]
        const resultMetadata: ResultMetadata = result.matchData
          .metadata as ResultMetadata

        const prunedMetadata = pruneMetaData(resultMetadata)

        const fieldMetadata = removeTermClassification(prunedMetadata)

        const resultWithFieldData = convertToFieldResults(doc, fieldMetadata)

        return {
          id: result.ref,
          score: result.score,
          title:
            'title' in resultWithFieldData
              ? resultWithFieldData['title']
              : recipeObj[result.ref]['title'],
          excerpt: recipeObj[result.ref]['excerpt'],
          uri: recipeObj[result.ref]['uri'],
          position: resultWithFieldData,
        }
      })

      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify(finalResults),
      })
    }
    return Promise.resolve({
      statusCode: 402,
      body: 'Method not allowed',
    })
  } catch (err) {
    console.error(err)
    return Promise.resolve({
      statusCode: 500,
      body: String(err),
    })
  }
}
