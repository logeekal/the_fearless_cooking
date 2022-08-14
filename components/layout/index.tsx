import { FC, PropsWithChildren, ReactElement } from 'react'

import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'

export type LayoutProps = {
    layoutProps?: {
        cuisineSummary: Array<RecipeCuisine>
        courseSummary: Array<RecipeCourse>
    }
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
    return (
        <>
            <h1>Layout</h1>
            {props.children}
        </>
    )
}

export const getLayout = (page: ReactElement, layoutProps: LayoutProps) => {
    return <Layout {...layoutProps}>{page}</Layout>
}

export default Layout
