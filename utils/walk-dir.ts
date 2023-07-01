import fs from 'fs'
import path from 'path'

export function getAIRecipesFiles() {
  const AI_RECIPE_DIR = path.join('content', 'ai-recipes')
  const results: string[] = []
  const dateDirs = fs.readdirSync(AI_RECIPE_DIR)
  dateDirs.forEach((dir) => {
    results.push(
      ...fs
        .readdirSync(path.join(AI_RECIPE_DIR, dir))
        .filter((file) => {
          return file.endsWith('json')
        })
        .map((f) => path.join(AI_RECIPE_DIR, dir, f))
    )
  })

  return results
}
