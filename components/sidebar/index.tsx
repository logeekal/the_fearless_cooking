import React from 'react'

import SubscribeBanner from '../subscribe/banner'
import SupportBanner from '../support/banner'
import {
  about,
  aboutHeading,
  aboutImage,
  aboutText,
  cookbook,
  cookbookText,
  genericContent,
  sideBar,
} from './index.css'

const Sidebar = () => {
  return (
    <div className={`full-width ${sideBar}`}>
      <section className={`about full-width ${about}`}>
        <div className={`sidebar-content-width ${genericContent}`}>
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
            <p className={'about__text--section'}>Hi There!</p>
            <p className={'about__text--section'}>
              Welcome to my kitchen. I am Richa - the human behind the lens. I
              hope you found something interesting to cook today. If you are
              still confused, then try my all time favourite kadhi chawal. You
              will love it.
            </p>
            <p className={'about__text--section'}>
              And then we can learn more about each other. Afterall, everything
              feels good after a happy meal 😁
            </p>
          </div>
        </div>
      </section>
      <section className={`cookbook sidebar-content-width ${cookbook}`}>
        <div className={`sidebar-content-width ${genericContent}`}>
          <div className="cookbook__image grid_center">
            <img
              className=""
              src="/images/book-pages-preview.png"
              alt={'book preview for Fall in love with the salads'}
            />
          </div>
          <div className="cookbook__heading cursive heading text_center">
            Oh yeah! I have a cookbook for you ✌🏽
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
        </div>
      </section>
      <SupportBanner />
      <SubscribeBanner />
    </div>
  )
}

export default Sidebar
