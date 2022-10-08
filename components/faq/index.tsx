import React from 'react'

import { ICompleteRecipe } from '../../utils/types'
import Accordion from '../accordion'
import { faq, faqAnswer } from './index.css'

type Props = {
  faqs: ICompleteRecipe['faqs']
}

const FAQs = (props: Props) => {
  const { faqs } = props
  return (
    <div id="faq" className={`faq ${faq}`}>
      <p className={'cursive heading'} style={{ marginBlock: '2rem' }}>
        FAQs
      </p>
      {faqs.map((faq, idx) => {
        const titleEl = (
          <div
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <div
              className="heavy-bold"
              dangerouslySetInnerHTML={{ __html: faq.title.rendered }}
            />
          </div>
        )
        return (
          <div key={faq.id}>
            <Accordion
              showSaperator={idx !== faqs.length - 1 ? true : false}
              title={titleEl}
              isInitiallyExpanded={true}
            >
              <div
                className={`${faqAnswer}`}
                dangerouslySetInnerHTML={{ __html: faq.content.rendered }}
              />
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}

export default FAQs
