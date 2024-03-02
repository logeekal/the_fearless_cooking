import Link from 'next/link'
import React from 'react'

import { Button } from '../button'
import SubscribeBanner from '../subscribe/banner'
import SupportBanner from '../support/banner'
import {
  about,
  aboutHeading,
  aboutImage,
  aboutText,
  cookbook,
  cookbookFooter,
  cookbookList,
  cookbookListItem,
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
              className={`${aboutImage} lazyload`}
              data-src="https://i0.wp.com/wp-backend.thefearlesscooking.com/wp-content/uploads/2022/09/about_website.jpeg?resize=150%2C150&ssl=1"
              alt="Image of Richa Gupta - Creator of The Fearless Cooking"
            />
          </div>
          <div className={`about__text  ${aboutText}`}>
            <p className={'about__text--section'}>Hi There!</p>
            <p className={'about__text--section'}>
              Welcome to my kitchen. I am Richa - the human behind the lens. I
              hope you found something interesting to cook today. If you are
              still confused, then try my all time favourite &nbsp;{' '}
              <Link
                prefetch={false}
                href="/recipe/italian-basil-pesto-pasta-vegan"
              >
                pesto pasta
              </Link>
              . You will love it.
            </p>
            <p className={'about__text--section'}>
              And then we can learn more about each other. After all, everything
              feels good after a happy meal 😁
            </p>
          </div>
        </div>
      </section>
      <section className={`cookbook sidebar-content-width ${cookbook}`}>
        <div className={`sidebar-content-width ${genericContent}`}>
          <div className="cookbook__image grid_center">
            <img
              className="lazyload"
              data-src="/images/book-pages-preview.png"
              alt={'book preview for Fall in love with the salads'}
            />
          </div>
          <div className="cookbook__heading cursive heading text_center">
            ☝🏼🥗 🎮 <br />
            Level up your salad game
          </div>
          <div className={`cookbook__text text_center ${cookbookText}`}>
            <p>
              Our new Salad book <b>{'"Fall in love with Salads"'}</b> is out
              now. With this book you get:
              <ul className={`${cookbookList}`}>
                <li className={`${cookbookListItem}`}>
                  30 unique Salad recipes.
                </li>
                <li className={`${cookbookListItem}`}>
                  30 all natural Salad dressings. No Chemicals!
                </li>
                <li className={`${cookbookListItem}`}>
                  A Salad Guide which helps you create 100s of new salads.
                </li>
              </ul>
            </p>
          </div>
          <div className={`cookbook__footer heading ${cookbookFooter}`}>
            <Button
              href="https://thefearlesscooking.gumroad.com/l/fallinlovewithsalads/SALAD"
              target="_blank"
              variant="ghost"
            >
              Buy E-book
            </Button>
            <Button
              href="https://www.flipkart.com/fall-love-salads/p/itm8e09ce3716858?pid=9788196474515"
              target="_blank"
              variant="ghost"
            >
              Buy Hardcover
            </Button>
          </div>
        </div>
      </section>
      <SupportBanner />
      <SubscribeBanner />
    </div>
  )
}

export default Sidebar
