import React from 'react'
import './Button.scss'

const Button = ({text, classAdd}) => {
  return (
    <button className={`${classAdd} btn`}>{text}</button>

  )
}

export default Button