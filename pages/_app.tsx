import '../styles/globals.css'
import '../styles/global.css'
import '../styles/globals/index.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { ComponentProps, ComponentType, ReactElement, ReactNode } from 'react'

import { LayoutProps } from '../components/layout'

export type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement, props: LayoutProps) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>
  pageProps: P & {
    layoutProps: LayoutProps
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout<unknown>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const CompWithPlausible = withPlausible(Component)

  if ('layoutProps' in pageProps) {
    /* eslint-disable-next-line */
        const { layoutProps, ...rest } = pageProps

    return getLayout(<CompWithPlausible {...rest} />, layoutProps)
  }

  return getLayout(<Component {...pageProps} />, {} as LayoutProps)
}

const withPlausible = (WrappedComponent: ComponentType) => {
  const WithPlausibleComp = (
    props: ComponentProps<typeof WrappedComponent>
  ) => {
    return (
      <PlausibleProvider
        domain="thefearlesscooking.com"
        customDomain="https://analytics.logeekal.eu"
        selfHosted
        trackLocalhost={false}
        enabled
      >
        <WrappedComponent {...props} />{' '}
      </PlausibleProvider>
    )
  }

  WithPlausibleComp.displayName = 'WithPlausible'
  return WithPlausibleComp
}

export default MyApp
