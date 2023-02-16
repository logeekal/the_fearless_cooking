import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import React, { createRef, useCallback, useEffect } from 'react'
//import { MdFormatListBulleted } from 'react-icons/md'
import {
  RiArrowUpSLine,
  RiFileList2Line,
  RiQuestionLine,
  RiSearch2Line,
} from 'react-icons/ri'

import { globalVars } from '../../styles/vars.css'
import { AnalyticsEvents } from '../../types/common'
import { useLayout } from '../layout/use_layout'
import { bottomBar, bottomBarSection, icon, text } from './index.css'

const iconSize = 25

type BottomBarProps = {
  recipe?: boolean
  faq?: boolean
}

const BottomBar = (props: BottomBarProps) => {
  const { recipe = true, faq = true } = props
  const { openSearch } = useLayout()
  const router = useRouter()
  const bottomBarRef = createRef<HTMLDivElement>()

  const plausible = usePlausible<AnalyticsEvents>()
  useEffect(() => {
    if (!bottomBarRef.current) return
    if (bottomBarRef.current.classList.contains('visible')) return

    bottomBarRef.current.style.transform = 'translateY(100%)'

    setTimeout(() => {
      if (bottomBarRef.current) {
        bottomBarRef.current.style.transition = `transform 0.2s ${globalVars.curve.easeOut}`
        bottomBarRef.current.style.transform = 'translateY(0%)'
        bottomBarRef.current.classList.add('visible')
      }
    }, 100)
  }, [bottomBarRef])

  const goToElementById = useCallback(
    (id: string) => {
      if (router.isReady)
        router
          .push(id, undefined, {
            shallow: true,
            scroll: false,
          })
          .then()
          .catch(() => console.error)
    },
    [router]
  )

  const onRecipeClickHandler = useCallback(() => {
    if (recipe) {
      goToElementById('#recipe-card')
      plausible('BottomTab', {
        props: {
          id: 'Recipe',
        },
      })
    }
  }, [recipe, goToElementById, plausible])

  const onFAQClickHandler = useCallback(() => {
    if (faq) {
      goToElementById('#faq')
      plausible('BottomTab', {
        props: {
          id: 'FAQ',
        },
      })
    }
  }, [faq, goToElementById, plausible])

  const scrollToTopHandler = useCallback(() => {
    goToElementById(window.location.href.split('#')[0])
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [goToElementById])

  useEffect(() => {
    const cleanup = () => {
      document.body.style.paddingBottom = '0px'
    }
    // height of the bottom bar
    document.body.style.paddingBottom = '77px'
    return cleanup
  }, [])

  return (
    <div className={`bottom-bar ${bottomBar}`} ref={bottomBarRef}>
      <button onClick={onRecipeClickHandler} disabled={!recipe}>
        <div
          className={`bottom-bar__section ${bottomBarSection} ${
            recipe ? '' : 'disabled'
          } `}
        >
          <RiFileList2Line className={icon} size={iconSize} />
          <p className={text}>Recipe</p>
        </div>
      </button>
      <button onClick={onFAQClickHandler} disabled={!faq}>
        <div
          className={`bottom-bar__section ${bottomBarSection} ${
            faq ? '' : 'disabled'
          }`}
        >
          <RiQuestionLine className={icon} size={iconSize} />
          <p className={text}>FAQs</p>
        </div>
      </button>
      <div
        className={`bottom-bar__section ${bottomBarSection} search`}
        onClick={openSearch}
      >
        <RiSearch2Line className={icon} size={iconSize} />
        <p className={text}>Search</p>
      </div>
      <div
        className={`bottom-bar__section ${bottomBarSection}`}
        onClick={scrollToTopHandler}
      >
        <RiArrowUpSLine className={icon} size={iconSize} />
        <p className={text}>Top</p>
      </div>
    </div>
  )
}

export default BottomBar
