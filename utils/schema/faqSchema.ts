import { ICompleteRecipe } from '../types'

export const genFAQSchema = (
  faqs: ICompleteRecipe['faqs']
): ICompleteRecipe['faqSchema'] => {
  const finalSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => {
      return {
        '@type': 'Question',
        name: faq.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.content.rendered,
        },
      }
    }),
  }

  return finalSchema
}
