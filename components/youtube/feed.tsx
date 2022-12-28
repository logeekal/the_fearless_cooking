//import Image from 'next/image'
import React from 'react'

import { genericContent } from '../sidebar/index.css'
import { ytFeed, ytFeedSubImgContainer, ytFeedText } from './feed.css'

//type Props = Record<string, never>

const YoutubeFeed = () => {
  return (
    <section className={`ytfeed ${ytFeed}`}>
      <div className={`sidebar-content-width ${genericContent}`}>
        <div className="ytfeed__heading cursive heading text_center">
          Watch Now!
        </div>
        <div className="ytfeed__container disabled-feat">
          <div className="ytfeed"></div>
        </div>
        <div className={`ytfeed__text ${ytFeedText}`}>
          <p>
            If you are in a hurry, you can check out the recipe videos. If you
            try any recipe and like it too, Plz LIKE & SUBSCRIBE to the Youtube
            channel.
          </p>
        </div>
        <div className="ytfeed__subscribe grid_center">
          <a
            className={`${ytFeedSubImgContainer}`}
            href="https://www.youtube.com/c/thefearlesscooking?sub_confirmation=1"
          ></a>
        </div>
      </div>
    </section>
  )
}

export default YoutubeFeed
