import React, { PropsWithChildren, useEffect } from 'react'

import { modal, modalBg, modalContent } from './modal.css'

type Props = PropsWithChildren<{
  show: boolean
}>

const LOCK_SCROLL = 'lock-scroll'

const Modal = (props: Props) => {
  const { children, show } = props

  useEffect(() => {
    return () => document.body.classList.remove(LOCK_SCROLL)
  }, [])

  useEffect(() => {
    if (show) {
      document.body.classList.add(LOCK_SCROLL)
      return
    }

    document.body.classList.remove(LOCK_SCROLL)
  }, [show])

  return (
    <div className={`modal ${modal} ${show ? '' : 'hidden'}`} data-open={show}>
      <div className={`modal__bg ${modalBg}`}>
        <div className={`modal__content ${modalContent}`}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
