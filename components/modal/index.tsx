import React, { PropsWithChildren } from 'react'

import { modal, modalBg, modalContent } from './modal.css'

type Props = PropsWithChildren<{
  show: boolean
}>

const Modal = (props: Props) => {
  const { children, show } = props

  return (
    <div className={`modal ${modal} ${show ? '' : 'hidden'}`}>
      <div className={`modal__bg ${modalBg}`}>
        <div className={`modal__content ${modalContent}`}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
