import Image from 'next/image'
import NextLink from 'next/link'
import { FC, useState } from 'react'

import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import Accordion from '../accordion'
import CategorySubMenu from '../menu/CategorySubMenu'
import {
    navAddendumClass,
    navClass,
    navLeft,
    navMenu,
    navMenuIconClass,
    navMenuIconContainer,
    navMenuItem,
    navMenuItemTitle,
    navMenuList,
} from './navbar.css'

type NavbarProps = {
    courseSummary: Array<RecipeCourse>
    cuisineSummary: Array<RecipeCuisine>
}

const Navbar: FC<NavbarProps> = ({ courseSummary, cuisineSummary }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                <div className="nav__logo">
                    <Image
                        height="40px"
                        width={'100px'}
                        className="img nav__logo--img"
                        alt="TFC logo"
                        src="/images/logo_complete_green.svg"
                    ></Image>
                </div>
            </div>
            <div
                className={`nav__menu ${navMenu} ${
                    isMobileMenuOpen ? '' : 'closed'
                }`}
            >
                <ul className={`${navMenuList}`}>
                    <li className={`nav__menu--item mobile ${navMenuItem}`}>
                        <Accordion
                            title={<h2 className={`${navMenuItem}`}>Cook</h2>}
                        >
                            <CategorySubMenu
                                key="Course"
                                title="Course"
                                items={
                                    courseSummary
                                        ? courseSummary.map((course) => {
                                              return {
                                                  name: course.name,
                                                  uri: course.uri,
                                                  onClick: toggleMenu,
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
                                                  name: cuisine.name,
                                                  uri: cuisine.uri,
                                                  onClick: toggleMenu,
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
                        <NextLink href="/shop">
                            <h2>Shop</h2>
                        </NextLink>
                    </li>
                    <li
                        className={`nav__menu--item ${navMenuItem}`}
                        onClick={toggleMenu}
                    >
                        <NextLink href="/about">
                            <h2>About</h2>
                        </NextLink>
                    </li>
                    <li
                        className={`nav__menu--item ${navMenuItem}`}
                        onClick={toggleMenu}
                    >
                        <NextLink href="/support">
                            <h2>Support</h2>
                        </NextLink>
                    </li>
                    <li
                        className={`nav__menu--item ${navMenuItem}`}
                        onClick={toggleMenu}
                    >
                        <NextLink href="/subscribe">
                            <h2>Subscribe</h2>
                        </NextLink>
                    </li>
                </ul>
            </div>
            <div className={`nav__addend ${navAddendumClass}`}>
                <Image
                    width="30px"
                    height="30px"
                    className="img img__search"
                    src="/images/search-green.svg"
                    alt="search"
                    layout="fixed"
                ></Image>
                <Image
                    width="30px"
                    height="30px"
                    className="img img__shop"
                    src="/images/shop.svg"
                    alt="shop"
                    layout="fixed"
                ></Image>
                <Image
                    width="30px"
                    height="30px"
                    className="img img__support"
                    src="/images/support-light.svg"
                    alt="support"
                    layout="fixed"
                ></Image>
            </div>
        </nav>
    )
}

export default Navbar
