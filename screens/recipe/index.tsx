import Link from 'next/link'
import React from 'react'
import striptags from 'striptags'

import { cardCategory } from '../../components/card/card.css'
import FAQs from '../../components/faq'
import RecipeCard from '../../components/recipe_card'
import { SEO } from '../../components/SEO'
import { SiteMeta } from '../../utils/config'
import { ICompleteRecipe } from '../../utils/types'
import {
  FAQSection,
  recipeCategories,
  recipeContainer,
  recipePost,
} from './recipe.css'

type RecipePageProps = {
  recipe: ICompleteRecipe
}

function RecipePage(props: RecipePageProps) {
  const { recipe } = props

  const categories = [
    ...(recipe.post.recipeCuisines?.nodes ?? []),
    ...(recipe.post.recipeCourses?.nodes ?? []),
  ]

  return (
    <div id={`recipe ${recipeContainer}`}>
      <SEO
        title={`${recipe.post.title as string} | ${SiteMeta.titleSuffix}`}
        description={striptags(recipe.post.excerpt as string)}
        image={recipe.post.featuredImage?.node?.mediaItemUrl as string}
        isArticle={true}
        url=""
        schemas={[
          {
            type: 'recipe',
            schema: recipe.recipeSchema || '',
          },
        ]}
      />
      <div id="recipe-post" className={`recipe-post ${recipePost}`}>
        <div className="recipe__postHeader">
          <h1
            style={{ lineHeight: '3rem' }}
            dangerouslySetInnerHTML={{
              __html: recipe.post.title as string,
            }}
          ></h1>
          <div className={`recipe__categories ${recipeCategories}`}>
            {categories.map((cat, idx) => {
              return (
                <>
                  {idx > 0 ? (
                    <span className="card__category--saperator">/</span>
                  ) : null}
                  <span
                    className={`card__category ${cardCategory}`}
                    key={cat?.uri}
                  >
                    <Link prefetch={false} href={cat?.uri as string}>
                      {cat?.name}
                    </Link>
                  </span>
                </>
              )
            })}
          </div>
        </div>
        <img
          itemProp="image"
          src={recipe.post?.featuredImage?.node?.mediaItemUrl as string}
          srcSet={recipe.post?.featuredImage?.node?.srcSet as string}
          sizes="(max-width: 600px) 80vw, 50vw"
          alt={`Image of ${recipe.post.title as string}`}
        />

        <article
          id="article"
          dangerouslySetInnerHTML={{
            __html: recipe.post.content as string,
          }}
        ></article>
        <div id="recipe-card" className="recipe__card">
          <RecipeCard recipe={recipe.content} recipePost={recipe.post} />
        </div>
      </div>
      <div className={`${FAQSection}`}>
        <FAQs faqs={recipe.faqs} />
      </div>
    </div>
  )
}

export default RecipePage
