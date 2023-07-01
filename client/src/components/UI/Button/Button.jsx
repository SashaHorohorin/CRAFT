import React from 'react'
import './Button.scss'

const Button = ({text, classAdd}) => {
  return (
    <button className={`btn ${classAdd}`}>{text}</button>

  )
}

export default Button