import React, { forwardRef, Fragment, useMemo } from 'react'
import striptags from 'striptags'
import { Duration } from 'tinyduration'

import { Recipe } from '../../types/wp-graphql.types'
import { ICompleteRecipe } from '../../utils/types'
import Checkbox from '../checkbox'
import { getStepURL } from '../utils'
import {
  recipeCard,
  recipeCardBody,
  recipeCardBodyTitle,
  recipeCardCatDetails,
  recipeCardContentHeader,
  recipeCardDetail,
  recipeCardDetailLabel,
  recipeCardDetails,
  recipeCardDetailValue,
  recipeCardHeader,
  recipeCardIngredients,
  recipeCardLogo,
  recipeCardSubTitle,
  recipeCardTitle,
  recipeCategories,
  recipeIngredientSectionTitle,
  recipeInstructionListItem,
  recipeInstructionNotes,
} from './index.css'

interface RecipeCardProps {
  recipe: ICompleteRecipe['content']
  recipePost: Recipe
}

const getTextDuration = (duration: Duration): string => {
  const hours = duration.hours ? `${duration.hours} hr` : undefined
  const mins = duration.minutes ? `${duration.minutes} min` : undefined
  if (!hours && !mins) {
    return '0 min'
  }

  if (hours || mins) {
    return !mins ? (hours as string) : !hours ? mins : `${hours} ${mins}`
  }

  return '0 min'
}

const RecipeCard = forwardRef<HTMLDivElement, RecipeCardProps>(
  ({ recipe, recipePost }, ref) => {
    const getInnerHTML = (str: unknown) => {
      if (typeof str === 'string') {
        return {
          __html: str,
        }
      } else {
        return
      }
    }

    const recipeCuisines = useMemo(() => {
      const cuisines = recipePost.recipeCuisines?.nodes
        ?.slice(0, 2)
        .map((cuisineObj) => cuisineObj)
      return cuisines ?? []
    }, [recipePost])

    const recipeCourses = useMemo(() => {
      const courses = recipePost.recipeCourses?.nodes
        ?.slice(0, 2)
        .map((courseObj) => courseObj)
      return courses ?? []
    }, [recipePost])

    if (!recipe) return <> </>
    return (
      <div className={`recipe-card ${recipeCard}`} ref={ref}>
        <div className={`recipe-card__header ${recipeCardHeader}`}>
          {/*
           *<div className={`recipe_card__label ${recipeCardLabel}`}>Recipe</div>
           */}
          <div className={`${recipeCardContentHeader}`}>
            <h2 className={`${recipeCardTitle}`}>{recipePost.title}</h2>
            <p className={`${recipeCardSubTitle}`}>{recipe.recipeSubtitle}</p>
            <div
              dangerouslySetInnerHTML={getInnerHTML(recipe.recipeDescription)}
            />
            <div className={`recipe-card__details ${recipeCardDetails}`}>
              <div className={`recipe-card__detail ${recipeCardDetail}`}>
                <p className={`detail__value ${recipeCardDetailValue}`}>
                  {recipe.noOfServings}
                </p>
                <p className={`detail__label ${recipeCardDetailLabel}`}>
                  {'Servings'}
                </p>
              </div>
              <div className={`recipe-card__detail ${recipeCardDetail}`}>
                <p className={`detail__value ${recipeCardDetailValue}`}>
                  {getTextDuration(
                    recipe.calculatedDurations.prepTimeInDurations
                  )}
                </p>
                <p className={`detail__label ${recipeCardDetailLabel}`}>
                  Prep Time
                </p>
              </div>
              <div className={`recipe-card__detail ${recipeCardDetail}`}>
                <p className={`detail__value ${recipeCardDetailValue}`}>
                  {getTextDuration(
                    recipe.calculatedDurations.cookTimeInDurations
                  )}
                </p>
                <p className={`detail__label ${recipeCardDetailLabel}`}>
                  Cook Time
                </p>
              </div>
              <div className={`recipe-card__detail ${recipeCardDetail}`}>
                <p className={`detail__value ${recipeCardDetailValue}`}>
                  {getTextDuration(recipe.calculatedDurations.totalDuration)}
                </p>
                <p className={`detail__label ${recipeCardDetailLabel}`}>
                  Total Time
                </p>

                <div className={`recipe-card__logo ${recipeCardLogo}`}>
                  <img
                    className="lazyload"
                    alt={'logo of the fearless cooking'}
                    data-src="/images/logo_compact_green_small.png"
                    width={'100%'}
                    height={'100%'}
                  />
                </div>
              </div>
            </div>

            <div className={`recipe-card__categories ${recipeCategories}`}>
              <div className={'recipe-card__category '}>
                {recipeCourses && (
                  <>
                    <div className="category__heading">
                      <p className="bold">Courses</p>
                    </div>
                    <div
                      className={`category___detail ${recipeCardCatDetails}`}
                    >
                      {recipeCourses.map((course, idx) => (
                        <React.Fragment key={course?.id}>
                          {idx > 0 ? <p className="brand"> / </p> : null}
                          <a href={course?.uri}>
                            <p className="brand">{course?.name} </p>
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className={'recipe-card__category '}>
                {recipeCuisines && (
                  <>
                    <div className="category__heading">
                      <p className="bold ">Cuisines</p>
                    </div>
                    <div
                      className={`category___detail ${recipeCardCatDetails}`}
                    >
                      {recipeCuisines.map((cuisine, idx) => (
                        <React.Fragment key={cuisine?.id}>
                          {idx > 0 ? <p className="brand"> / </p> : null}
                          <a href={cuisine?.uri}>
                            <p className="brand">{cuisine?.name} </p>
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="saperator" />
        <div className={`recipe-card__body ${recipeCardBody}`}>
          <div className={`recipe-card__ingredients ${recipeCardIngredients}`}>
            <h2 className={`${recipeCardBodyTitle}`}>Ingredients</h2>
            {recipe.recipeIngredients.map((ingredientSection, index) => {
              return (
                <div key={index}>
                  <p
                    className={`${recipeIngredientSectionTitle}`}
                    style={{
                      marginBlock: '10px',
                    }}
                  >
                    {ingredientSection.sectionTitle}
                  </p>
                  <ul
                    id="ingredient list"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {ingredientSection.ingredients.map((ingredient, index) => {
                      return (
                        <Checkbox key={index} id={ingredient.ingredient}>
                          <span>{`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}</span>
                          {ingredient.notes ? (
                            <span>
                              <span>,&nbsp;</span>
                              <span
                                className={`${recipeInstructionNotes}`}
                              >{` ${ingredient.notes}`}</span>
                            </span>
                          ) : null}
                        </Checkbox>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
          <div className="recipe-card__instructions">
            <h2 className={`${recipeCardBodyTitle} `}>Steps</h2>
            {recipe.recipeInstructions.map((instructionSection, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBlock: '10px',
                    }}
                  >
                    {instructionSection.sectionTitle}
                  </div>
                  <ol>
                    {instructionSection.instruction
                      .filter(
                        (instruction) => instruction.instruction.length > 0
                      )
                      .map((instruction, index) => {
                        return (
                          <Fragment key={instruction.instruction}>
                            <li
                              className={`${recipeInstructionListItem}`}
                              id={getStepURL(
                                instructionSection.sectionTitle,
                                instruction.instructionTitle,
                                index + 1
                              )}
                              key={index}
                              style={{
                                lineHeight: '2rem',
                                marginBottom: '1rem',
                                paddingInlineStart: '5px',
                                WebkitPaddingStart: '5px',
                                MozPaddingStart: '5px',
                                scrollMarginTop: '100px',
                              }}
                            >
                              {striptags(instruction.instruction)}
                            </li>
                            {instruction.instructionNotes && (
                              <blockquote
                                style={{
                                  marginLeft: '25px',
                                }}
                              >
                                {striptags(instruction.instructionNotes)}
                              </blockquote>
                            )}
                          </Fragment>
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
)

RecipeCard.displayName = 'RecipeCard'

export default RecipeCard
