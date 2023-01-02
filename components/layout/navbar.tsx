import NextLink from 'next/link'
import { FC, useEffect, useState } from 'react'

import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import { SiteMeta } from '../../utils/config'
import Accordion from '../accordion'
import CategorySubMenu from '../menu/CategorySubMenu'
import {
  navAddendumClass,
  navClass,
  navLeft,
  navLogo,
  navMenu,
  navMenuIconClass,
  navMenuIconContainer,
  navMenuItem,
  navMenuList,
} from './navbar.css'
import { useLayout } from './use_layout'

const SUPPORT_LINK = 'https://ko-fi.com/X8X2FFB20'

type NavbarProps = {
  courseSummary: Array<RecipeCourse>
  cuisineSummary: Array<RecipeCuisine>
}

const Navbar: FC<NavbarProps> = ({ courseSummary, cuisineSummary }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSupportPopupOpen, setIsSupportPopupOpen] = useState(false)

  const { openSearch } = useLayout()

  useEffect(() => {
    if (!isSupportPopupOpen) return
    window.open(
      SUPPORT_LINK,
      '_blank',
      'popup=yes,width=600,height=600,scrollbars=no,resizable=no'
    )

    setIsSupportPopupOpen(false)
  }, [isSupportPopupOpen])

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`nav ${navClass}`}>
      <div className={`nav__left ${navLeft}`}>
        <div
          className={`btn nav__menu__container--icon \
${navMenuIconContainer} ${isMobileMenuOpen ? 'open' : 'closed'}`}
          onClick={toggleMenu}
        >
          <div
            className={` nav__menu--icon ${
              isMobileMenuOpen ? 'open' : ''
            } ${navMenuIconClass}`}
          ></div>
        </div>

        <div className={'icon__ghost'}></div>
        <div className={`nav__logo mobile ${navLogo}`}>
          <NextLink href="/" prefetch={false}>
            <img
              height="35px"
              width={'140px'}
              className="link img nav__logo--img"
              alt="TFC logo"
              src={SiteMeta.logo}
            ></img>
          </NextLink>
        </div>
      </div>
      <div
        className={`nav__menu ${navMenu} ${isMobileMenuOpen ? '' : 'closed'}`}
      >
        <ul className={`${navMenuList}`}>
          <li className={`nav__menu--item ${navMenuItem}`} onClick={toggleMenu}>
            <NextLink href={'/'} prefetch={false}>
              <h2 className="link">Home</h2>
            </NextLink>
          </li>
          <li className={`nav__menu--item mobile ${navMenuItem}`}>
            <Accordion title={<h2 className={`${navMenuItem}`}>Cook</h2>}>
              <CategorySubMenu
                key="Course"
                title="Course"
                items={
                  courseSummary
                    ? courseSummary.map((course) => {
                        return {
                          name: course.name as string,
                          uri: course.uri,
                          onClick: toggleMenu as () => void,
                        }
                      })
                    : []
                }
              />
              <CategorySubMenu
                key="Cuisine"
                title="Cuisine"
                items={
                  cuisineSummary
                    ? cuisineSummary.map((cuisine) => {
                        return {
                          name: cuisine.name as string,
                          uri: cuisine.uri,
                          onClick: toggleMenu as () => void,
                        }
                      })
                    : []
                }
              />
            </Accordion>
          </li>
          <li
            className={`nav__menu--item desktop ${navMenuItem}`}
            onClick={toggleMenu}
          >
            <h2>Cook</h2>
          </li>
          <li
            className={`nav__menu--item ${navMenuItem} disabled`}
            onClick={toggleMenu}
          >
            <h2>Read</h2>
          </li>
          <li
            className={`nav__menu--item ${navMenuItem} disabled`}
            onClick={toggleMenu}
          >
            <NextLink prefetch={false} href="/shop">
              <h2>Shop</h2>
            </NextLink>
          </li>
          <li
            className={`nav__menu--item ${navMenuItem} disabled`}
            onClick={toggleMenu}
          >
            <NextLink prefetch={false} href="/about">
              <h2>About</h2>
            </NextLink>
          </li>
          <li
            className={`nav__menu--item ${navMenuItem}`}
            onClick={() => {
              toggleMenu()
              setIsSupportPopupOpen(true)
            }}
          >
            <h2>Support</h2>
          </li>
          <li
            className={`nav__menu--item ${navMenuItem} disabled`}
            onClick={toggleMenu}
          >
            <NextLink prefetch={false} href="/subscribe">
              <h2>Subscribe</h2>
            </NextLink>
          </li>
        </ul>
      </div>
      <div className={`nav__logo desktop ${navLogo}`}>
        <NextLink href="/" prefetch={false}>
          <img
            height="50px"
            width={'200px'}
            className="link img nav__logo--img"
            alt="TFC logo"
            src={SiteMeta.logo}
          ></img>
        </NextLink>
      </div>

      <div className={`nav__addend ${navAddendumClass}`}>
        <img
          width="30px"
          height="30px"
          className="link img img__search"
          src="/images/search-green.svg"
          alt="search"
          onClick={openSearch}
        />
        <img
          width="30px"
          height="30px"
          className="link img img__shop"
          src="/images/shop.svg"
          alt="shop"
          style={{ display: 'none' }}
        />
        <img
          width="30px"
          height="30px"
          className="link img img__support"
          src="/images/support_light.png"
          onClick={() => setIsSupportPopupOpen(true)}
          alt="support"
        />
      </div>
    </nav>
  )
}

export default Navbar
