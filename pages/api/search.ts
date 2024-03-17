import lunr from 'lunr'
import { NextApiRequest, NextApiResponse } from 'next'

import recipeIndex from '../../server/assets/recipe_index.json'
import recipes from '../../server/assets/recipes.json'
import { NO_OF_RESULTS } from '../../server/constants'
import { FieldResultMetadata } from '../../server/types'
import { ResultMetadata } from '../../server/types'
import {
  convertToFieldResults,
  pruneMetaData,
  removeTermClassification,
} from '../../server/utils/search'
import { IndexableRecipeObj } from '../../types/common'

type SearchResult = {
  id: string
  score: number
  title: string
  excerpt: string
  uri: string
  position: FieldResultMetadata
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<SearchResult> | string>
) {
  try {
    if (req.method === 'GET') {
      const query = req.query

      if (!query || !('term' in query)) {
        res.status(402)
        return
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
          excerpt: recipeObj[result.ref]['excerpt'] ?? '',
          uri: recipeObj[result.ref]['uri'],
          position: resultWithFieldData,
        }
      })

      res.status(200).json(finalResults)

      return
    }

    res.status(200).send('Method not allowed')
    return
  } catch (err) {
    console.error(err)
    res.status(500).send(String(err))
    return Promise.resolve({
      statusCode: 500,
      body: String(err),
    })
  }
}
