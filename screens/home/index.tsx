import React from 'react'

import ArticleGrid from '../../components/card_grid'
import SubscribeBanner from '../../components/subscribe/banner'
import SupportBanner from '../../components/support/banner'
import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import {
  about,
  aboutHeading,
  aboutImage,
  aboutText,
  cookbook,
  cookbookText,
} from './home.css'

type Props = {
  recipes: Recipe[]
  courses: RecipeCourse[]
  cuisines: RecipeCuisine[]
}

const Home = (props: Props) => {
  const { recipes } = props
  return (
    <>
      <ArticleGrid posts={recipes} />

      <section className={`about ${about}`}>
        <div className={`about__heading ${aboutHeading} cursive heading`}>
          Hi There
        </div>
        <div className="about__avatar">
          <img
            className={`${aboutImage}`}
            src="https://i0.wp.com/wp-backend.thefearlesscooking.com/wp-content/uploads/2022/09/about_website.jpeg?resize=150%2C150&ssl=1"
            alt="Image of Richa Gupta - Creator of The Fearless Cooking"
          />
        </div>
        <div className={`about__text  ${aboutText}`}>
          <p className={'about__text--section'}>
            I am Richa - the human behind this lens. Welcome to my kitchen. I
            hope you found something interesting to cook today.
          </p>
          <p className={'about__text--section'}>
            If you are still confused, then try my all time favourite kadhi
            chawal. Then we can know more about each other. Everything feels
            good after a happy meal :)
          </p>
        </div>
      </section>

      <section className={`cookbook ${cookbook}`}>
        <div className="cookbook__image grid_center">
          <img
            className=""
            src="/images/book-pages-preview.png"
            alt={'book preview for Fall in love with the salads'}
          />
        </div>
        <div className="cookbook__heading cursive heading text_center">
          Oh yeah! I have a cookbook for you :)
        </div>
        <div className={`cookbook__text text_center ${cookbookText}`}>
          <p>
            This is my first recipe book which is a collection of 30 delicious
            and addictive vegetarian/vegan salads. And it is my guarantee that
            these recipes will make you fall in love with salads.
          </p>
        </div>
        <div className="cookbook__footer cursive heading text_center">
          Coming Soon
        </div>
      </section>

      <SupportBanner />
      <SubscribeBanner />
    </>
  )
}

export default Home
