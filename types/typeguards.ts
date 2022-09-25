import { PossiblePostType } from './common'
import { Post, Recipe } from './wp-graphql.types'

export function isRecipeType(post: PossiblePostType): post is Recipe {
    return post && post.__typename === 'Recipe'
}

export function isPostType(post: PossiblePostType): post is Post {
    return post && post.__typename === 'Post'
}
