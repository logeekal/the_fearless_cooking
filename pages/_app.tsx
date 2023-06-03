import '../styles/globals.css'
import '../styles/global.css'
import '../styles/globals/index.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import PlausibleProvider from 'next-plausible'
import {
  ComponentProps,
  ComponentType,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'

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

  const router = useRouter()

  /*
   *
   * Nextjs re-renders the complete app when there is
   * a change in query string of the URL. Below
   * memoization makes sure that App is rendered
   * only when there is relavant state change of router
   * */
  const CompWithPlausible = useMemo(
    () => withPlausible(Component),
    [router.pathname, router.isReady, router.locale, Component]
  )

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
