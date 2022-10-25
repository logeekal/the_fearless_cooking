import React from 'react'

import { genericContent } from '../sidebar/index.css'
import { banner, bannerText } from './banner.css'

const SubscribeBanner = () => {
  //const { values, handleChange, handleSubmission, errFields } = useForm(
  //submitHandler as FormEventHandler<HTMLFormElement>
  //)

  //const [submitRequestState, setSubmitReqState] = useState<
  //'IDLE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS' | 'EXIST'
  //>('IDLE')

  //async function submitHandler(): Promise<void> {
  //if (typeof window === 'undefined') return

  //setSubmitReqState('SUBMITTING')

  //if ('email' in values) {
  //const { email } = values
  //const response = await fetch('/.netlify/functions/subscribe', {
  //method: 'POST',
  //body: JSON.stringify({
  //email: email,
  //tags: [
  //process.env.NODE_ENV,
  //typeof window === 'undefined'
  //? 'backend'
  //: window.location.pathname,
  //],
  //}),
  //})

  //const resJSON = await response.json()
  //if (response.status === 200) {
  //setSubmitReqState('SUCCESS')
  //return
  //} else {
  //if (resJSON.title === 'Member Exists') {
  //setSubmitReqState('EXIST')
  //return
  //}
  //console.error('Some error while subscribing')
  //console.error(resJSON)
  //setSubmitReqState('ERROR')
  //}
  //}
  //}
  return (
    <section className={`subscribe__banner ${banner}`}>
      <div className={`sidebar-content-width ${genericContent}`}>
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
        <div className={`subscribe__banner--text text_center ${bannerText}`}>
          <p>
            Drop your name and email id and I will solve one of the biggest
            problems of everyday life - WHAT TO COOK FOR DINNER?{' '}
          </p>
          <p>
            Get a FREE COPY of my 30 Dinner Recipes - One for each day. They are
            quick, easy, light and not to forget TASTY. It contains recipes from
            simple roti sabzi to some exciting Asian recipes.
          </p>
          <p>
            Plus, get access to exclusive content delivered to your inbox once
            in a while. SPAMMING IS A CRIME 😁
          </p>
        </div>
        <div className="subscribe__banner--form"></div>
      </div>
    </section>
  )
}

export default SubscribeBanner
