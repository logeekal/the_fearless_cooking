import React from 'react'

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
            I know how annoying it is to see the unwanted ads popping all over
            the place and distracting while you are reading something. That’s
            why, I will always keep this place clean and distraction free for
            you. Afterall, it’s always nice to be served on a clean plate :D
          </p>
          <p>
            So, you can support me to keep this show going and let me experiment
            more in the kitchen.
          </p>
        </div>
        <div className="support__footer heading cursive text_center">
          Support The Fearless Cooking
        </div>
      </div>
    </section>
  )
}

export default SupportBanner
