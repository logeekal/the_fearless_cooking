import React from 'react'
import striptags from 'striptags'

import { Recipe } from '../../types/wp-graphql.types'
import { ICompleteRecipe } from '../../utils/types'
import { getStepURL } from '../utils'
import {
  recipeCard,
  recipeCardBody,
  recipeCardContentHeader,
  recipeCardHeader,
  recipeCardIngredients,
  recipeCardIngredientsTitle,
  recipeCardLabel,
  recipeCardSubTitle,
  recipeCardTitle,
} from './index.css'

interface RecipeCardProps {
  recipe: ICompleteRecipe['content']
  recipePost: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, recipePost }) => {
  return (
    <div className={`recipe-card ${recipeCard}`}>
      <div className={`recipe-card__header ${recipeCardHeader}`}>
        <div className={`recipe_card__label ${recipeCardLabel}`}>Recipe</div>
        <div className={`${recipeCardContentHeader}`}>
          <h2 className={`${recipeCardTitle}`}>{recipePost.title}</h2>
          <p className={`${recipeCardSubTitle}`}>{recipe.recipeSubtitle}</p>
        </div>
      </div>
      <div className={`recipe-card__body ${recipeCardBody}`}>
        <div className={`recipe-card__ingredients ${recipeCardIngredients}`}>
          <h2 className={`${recipeCardIngredientsTitle}`}>Ingredients</h2>
          {recipe.recipeIngredients.map((ingredientSection, index) => {
            return (
              <div key={index}>
                <p
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {ingredientSection.sectionTitle}
                </p>
                <ul
                  style={{
                    WebkitPaddingStart: '1rem',
                    MozPaddingStart: '1rem',
                    paddingInlineStart: '1rem',
                  }}
                >
                  {ingredientSection.ingredients.map((ingredient, index) => {
                    return (
                      <li
                        key={index}
                        style={{
                          lineHeight: '2rem',
                          WebkitPaddingStart: 0,
                          MozPaddingStart: '5px',
                          marginBottom: '0px',
                        }}
                      >
                        <p>{`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}</p>
                        <i
                          style={{
                            color: 'secondary',
                          }}
                        >{` ${ingredient.notes}`}</i>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="recipe-card__instructions">
          <h2>Steps</h2>
          {recipe.recipeInstructions.map((instructionSection, index) => {
            return (
              <div key={index}>
                <p
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {instructionSection.sectionTitle}
                </p>
                <ol
                  style={{
                    WebkitPaddingStart: '1rem',
                    MozPaddingStart: '1rem',
                    paddingInlineStart: '1rem',
                  }}
                >
                  {instructionSection.instruction
                    .filter((instruction) => instruction.instruction.length > 0)
                    .map((instruction, index) => {
                      return (
                        <li
                          id={getStepURL(
                            instructionSection.sectionTitle,
                            instruction.instructionTitle,
                            index + 1
                          )}
                          key={index}
                          style={{
                            lineHeight: '1.65rem',
                            marginBottom: '1rem',
                            paddingInlineStart: '5px',
                            WebkitPaddingStart: '5px',
                            MozPaddingStart: '5px',
                            scrollMarginTop: '100px',
                          }}
                        >
                          {striptags(instruction.instruction)}
                          {instruction.instructionNotes && (
                            <div>
                              <blockquote>
                                {striptags(instruction.instructionNotes)}
                              </blockquote>
                            </div>
                          )}
                        </li>
                      )
                    })}
                </ol>
              </div>
            )
          })}
        </div>
      </div>

      <div className="recipe-card__footer">
        <div className="recipe-card__footer-social">
          <div className="recipe-card__reactions"> </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
