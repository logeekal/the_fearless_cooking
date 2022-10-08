/* eslint-disable */
import Copy from 'copy-to-clipboard'
import Link from 'next/link'
import React, { CSSProperties, LegacyRef, useEffect, useState } from 'react'
import {
  FaCopy,
  FaFacebookSquare,
  FaPinterestSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import { MdShare } from 'react-icons/md'
import { usePopper } from 'react-popper'
import { ssrWindow } from 'ssr-window'


import { SiteMeta } from '../../utils/config'
import useWindowClick from '../hooks/use_window_clicks'
import { genCompleteURL } from '../utils'
import {
  socialElLink,
  socialListContainer,
  socialListEl,
  socialSharePopup,
  socialShareTooltip,
} from './index.css'

interface SocialShareProps {
  pageTitle: string
  pageURI: string
}

const window: Window = ssrWindow as unknown as Window

const SocialShare: React.FC<SocialShareProps> = ({ pageTitle, pageURI }) => {
  const clickTarget: Element | null = useWindowClick()
  const [shareLinks, setShareLinks] = useState({
    fb: '',
    twitter: '',
    pinterest: '',
  })

  useEffect(() => {
    if (!clickTarget) return
    if (
      !clickTarget.closest('#tooltip') &&
      !clickTarget.closest('#social-share')
    ) {
      setIsShareDialogVisible(false)
    }
  }, [clickTarget])

  const [isShareDialogVisible, setIsShareDialogVisible] = useState(false)

  const [shareButtonEl, setShareButtonEl] = useState(null)
  const [popperEl, setPopperEl] = useState(null)
  const [arrowEl, setArrowEl] = useState(null)

  const [copiedMessage, setCopiedMessage] = useState('Copy link')

  const { styles, attributes, update } = usePopper(shareButtonEl, popperEl, {
    modifiers: [
      { name: 'arrow', options: { element: arrowEl } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  useEffect(() => {
    if (isShareDialogVisible && !shareLinks.fb) {
      setShareLinks({
        fb: `https://facebook.com/sharer/sharer.php?u=${encodeURI(
          typeof window !== 'undefined' ? window.location.href : ''
        )}`,
        twitter: genCompleteURL('https://twitter.com/intent/tweet', {
          hashtags: 'thefearlesscooking',
          original_referer: window ? window.location.href : '',
          text: pageTitle,
          url: window.location.href,
          via: SiteMeta.social.twitter,
        }),
        pinterest: genCompleteURL('https://pinterest.com/pin/create/button', {
          url: window.location.href,
          title: window.document.title,
        }),
      })
    }
  }, [isShareDialogVisible])

  const onCopy = (text: string) => {
    Copy(text)
    setCopiedMessage('Copied...')

    setTimeout(() => {
      setCopiedMessage('Copy link')
    }, 4000)
  }

  const handleShare = async () => {
    if (typeof window === 'undefined') {
      return
    }

    if (
      navigator.userAgent.toLowerCase().match(/mobile/i) &&
      !navigator.userAgent.toLowerCase().match(/windows/i)
    ) {
      // navigator share is enabled.
      navigator
        .share({
          title: pageTitle,
          text: pageTitle,
          url: pageURI,
        })
        .then(() => console.log('Shared successfully.'))
        .catch((err) => console.error(err))
    } else {
      console.log('native sharing not available, using in build option')
      setIsShareDialogVisible(!isShareDialogVisible)
      update && await update()
    }
  }

  return (
    <>
      <div
        id="social-share"
        ref={setShareButtonEl as LegacyRef<HTMLDivElement>}
      >
        <MdShare onClick={handleShare} />
      </div>
      <div
        id="tooltip"
        className={`tooltip ${socialShareTooltip}`}
        ref={setPopperEl as LegacyRef<HTMLDivElement>}
        style={{
          ...styles.popper,
          display: isShareDialogVisible ? 'block' : 'none',
        }}
        {...attributes.popper}
      >
        <ul
          className={`${socialListContainer}`}
        >
          <li className={`${socialListEl}`}>
            <Link
              className={`${socialElLink}`}
              href={shareLinks.fb}
              target="popup"
              onClick={() =>
                window.open(shareLinks.fb, 'popup', 'width=600,height=600')
              }
            >
              <>
                <FaFacebookSquare /> Facebook
              </>
            </Link>
          </li>
          <li className={`${socialListEl}`}>
            <Link
              className={`${socialElLink}`}
              href={shareLinks.twitter}
              target="popup"
              rel="noopener noreferrer"
              onClick={() =>
                window.open(shareLinks.twitter, 'popup', 'width=600,height=600')
              }
            >
              <>
                <FaTwitterSquare /> Twitter
              </>
            </Link>
          </li>
          <li className={`${socialListEl}`}>
            <Link
              className={`${socialElLink}`}
              href={shareLinks.pinterest}
              target="popup"
              rel="noopener noreferrer"
              onClick={() =>
                window.open(
                  shareLinks.pinterest,
                  'popup',
                  'width=600,height=600'
                )
              }
            >
              <>
                <FaPinterestSquare /> Pin it
              </>
            </Link>
          </li>
          <li className={`${socialListEl}`}>
            <div onClick={() => onCopy(window.location.href)}>
              <FaCopy
                style={
                  {
                    ':hover': {
                      cursor: 'no-drop',
                    },
                  } as CSSProperties
                }
              />{' '}
              {copiedMessage}
            </div>
          </li>
        </ul>
        <div
          id="arrow"
          className={`arrow ${socialSharePopup}`}
          ref={setArrowEl as LegacyRef<HTMLDivElement>}
          style={styles.arrow}
          {...attributes.arrow}
        />
      </div>
    </>
  )
}

