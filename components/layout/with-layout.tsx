import React, { ComponentProps, ComponentType, FC } from 'react'

import { LayoutProps } from '.'

function WithLayout<P>(
  Component: ComponentType<P>
): FC<ComponentProps<typeof Component> & LayoutProps> {
  return function WrappedWithLayout(props) {
    return <Component {...props} />
  }
}

export default WithLayout
