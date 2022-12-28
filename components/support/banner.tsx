import React from 'react'

import { SOCIALS } from '../../utils/config'
import { genericContent } from '../sidebar/index.css'
import { support } from './banner.css'

//type Props = {}

const SupportBanner = () => {
  return (
    <section className={`support ${support}`}>
      <div className={`sidebar-content-width ${genericContent}`}>
        <div className="support__heading cursive heading text_center">
          Support
        </div>
        <div className="support__text text_center">
          <p>
            I know how annoying it is when you want to read something and all
            those ads keep popping-up all over the place. That’s why, I will
            keep the space absolutely clean for your ultimate reading
            experience. Afterall, it is always nice to be served on a clean
            plate 🙏.
          </p>
          <br />
          <p>
            But honestly, we do need money to survive. So, if you want us to
            keep working and bringing the best of the recipes, do contribute
            here. Every dollar absolutely matters.
          </p>
        </div>
        <div className="support__footer heading cursive text_center">
          <a href={SOCIALS.kofi} target="blank">
            Support The Fearless Cooking
          </a>
        </div>
      </div>
    </section>
  )
}

export default SupportBanner
