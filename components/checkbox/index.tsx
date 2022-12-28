import React, { FC, PropsWithChildren } from 'react'

import { checkboxContainer, checkboxInput, label } from './index.css'

type Props = { id: string }

const Checkbox: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <li id={props.id} className={`${checkboxContainer}`}>
      <input id={props.id} className={`${checkboxInput}`} type="checkbox" />
      <label htmlFor={props.id} className={`${label}`}>
        {props.children}
      </label>
    </li>
  )
}

export default Checkbox
