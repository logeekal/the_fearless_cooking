import '../styles/globals.css'
import '../styles/global.css'
import '../styles/globals/index.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

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

  if ('layoutProps' in pageProps) {
    /* eslint-disable-next-line */
        const { layoutProps, ...rest } = pageProps

    return getLayout(<Component {...rest} />, layoutProps)
  }

  return getLayout(<Component {...pageProps} />, {} as LayoutProps)
}

export default MyApp
