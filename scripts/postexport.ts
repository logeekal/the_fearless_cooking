import { run } from './genSitemap'
import { RSS } from './rss'

// generateSiteMap
run()

// gen RSS
const rss = new RSS()
rss.createAIRecipeRSS()
rss.createRecipeRSS()
