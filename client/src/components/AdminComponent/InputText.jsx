import React from 'react'

const InputText = ({handleFunction, ...arg}) => {
  return (
    <input {...arg} onChange={(e) => handleFunction(e)}/>
  )
}

export default InputText