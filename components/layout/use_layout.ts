import { createContext, useContext } from 'react'

export type LayoutContextType = {
  openSearch: () => void
  closeSearch: () => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
)

export const useLayout = () => {
  const layoutContext = useContext(LayoutContext)

  if (!layoutContext) {
    throw Error('LayoutContext must be used within a provider')
  }

  return layoutContext
}
