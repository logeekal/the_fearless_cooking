import '../styles/globals.css'
import '../styles/global.css'
import '../styles/globals/index.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
import { withFingerprint } from '../components/safe_fingerprint/with_fingerprint'

export type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement, props: LayoutProps) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>
  pageProps: P & {
    layoutProps: LayoutProps
  }
}

const reactQueryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout<unknown>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const router = useRouter()

  /*
   *
   * Nextjs re-renders the complete app when there is
   * a change in query string of the URL. Below
   * memoization makes sure that App is rendered
   * only when there is relevant state change of router
   * */
  const CompWithPlausible = useMemo(
    () => withFingerprint(withQueryClient(withPlausible(Component))),
    [router.pathname, router.isReady, router.locale, Component]
  )

  /* eslint-disable-next-line */
    const { layoutProps, ...rest } = pageProps



  return getLayout(<CompWithPlausible {...rest} />, layoutProps ?? {})
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

const withQueryClient = (WrappedComponent: ComponentType) => {
  const WithQueryClient = (props: ComponentProps<typeof WrappedComponent>) => {
    return (
      <QueryClientProvider client={reactQueryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    )
  }

  WithQueryClient.displayName = 'WithPlausible'
  return WithQueryClient
}

export default MyApp
