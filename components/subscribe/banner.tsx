import Image from 'next/image'
import React from 'react'

import { banner, bannerText } from './banner.css'

type Props = Record<string, never>

const SubscribeBanner = (props: Props) => {
    return (
        <section className={`subscribe__banner ${banner}`}>
            <div className="subscribe__banner--heading cursive heading grid_center">
                <div>
                    <span> Join the Fearless </span>
                    {/*
                     *<span>
                     *    <Image
                     *        width={20}
                     *        height={20}
                     *        src="/images/logo_compact_green.svg"
                     *        alt="compact logo of the fearless cooking"
                     *    />
                     *</span>
                     */}
                    <span> Cook Community</span>
                </div>
            </div>
            <div
                className={`subscribe__banner--text text_center ${bannerText}`}
            >
                <p>
                    Drop your name and email id and I will solve one of the
                    biggest problems of everyday life - WHAT TO COOK FOR DINNER?{' '}
                </p>
                <p>
                    Get a FREE COPY of my 30 Dinner Recipes - One for each day.
                    They are quick, easy, light and not to forget TASTY. It
                    contains recipes from simple roti sabzi to some exciting
                    Asian recipes.
                </p>
                <p>
                    Plus, get access to exclusive content delivered to your
                    inbox once in a while. SPAMMING IS A CRIME 😁
                </p>
            </div>
            <div className="subscribe__banner--form"></div>
        </section>
    )
}

export default SubscribeBanner
