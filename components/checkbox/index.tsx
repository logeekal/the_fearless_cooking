import React, { FC } from 'react'

import { checkboxContainer, checkboxInput, label } from './index.css'

type Props = { id: string; label: string }

const Checkbox: FC<Props> = (props) => {
  return (
    <li className={`${checkboxContainer}`}>
      <input id={props.id} className={`${checkboxInput}`} type="checkbox" />
      <label htmlFor={props.id} className={`${label}`}>
        <span> {props.label}</span>
      </label>
    </li>
  )
}

export default Checkbox
