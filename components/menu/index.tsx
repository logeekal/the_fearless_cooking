import React, {
  ComponentRef,
  forwardRef,
  HTMLProps,
  PropsWithChildren,
  useContext,
} from 'react'

import { menuClass, menuCloseIcon, menuTitleClass } from './menu.css'

type MenuProps = {
  mode?: 'expandable' | 'normal'
  type?: 'normal' | 'responsive'
}

type MenuContextValue = MenuProps

const MenuContext = React.createContext<MenuContextValue>({})

export const Menu = forwardRef<
  HTMLDivElement,
  MenuProps & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { mode = 'normal', type = 'normal', className = '', children } = props

  return (
    <MenuContext.Provider
      value={{
        mode,
        type,
      }}
    >
      <div
        className={`menu ${className} menu-${mode} type-${type} ${menuClass}`}
        ref={ref}
      >
        {children}
      </div>
    </MenuContext.Provider>
  )
})

Menu.displayName = 'Menu'

//---------------------------------------------
//---------------------------------------------
//---------------------------------------------

type MenuItemProps = {
  as: React.ElementType
  className?: string
}

export const MenuTitle = forwardRef<
  ComponentRef<MenuItemProps['as']>,
  PropsWithChildren<MenuItemProps>
>((props, ref) => {
  const { as: Component = 'p', children, className = '' } = props
  const { mode, type } = useContext(MenuContext)
  return (
    <div
      className={`menu_title ${menuTitleClass} mode-${mode ?? ''} type-${
        type ?? ''
      }`}
    >
      <Component className={`menu_title ${className}`} ref={ref}>
        {children}
      </Component>
      {mode === 'expandable' ? (
        <div className={`menu__close ${menuCloseIcon}`}>+</div>
      ) : (
        <></>
      )}
    </div>
  )
})

MenuTitle.displayName = 'MenuItem'

//---------------------------------------------
//---------------------------------------------
//---------------------------------------------
type MenuBodyProps = HTMLProps<HTMLDivElement>

export const MenuBody = forwardRef<
  HTMLDivElement,
  PropsWithChildren<MenuBodyProps>
>((props, ref) => {
  const { children, className = '' } = props
  return (
    <div className={`menu__body ${className}`} ref={ref}>
      {children}
    </div>
  )
})

MenuBody.displayName = 'MenuBody'
