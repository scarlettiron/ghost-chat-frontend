import React from 'react'
import '../../css/buttons-inputs.css'

const InputPrimary = ({id, placeholder, type='text'}) => {
  return (
    <input 
    className='input-primary'
    id={id} 
    name={id} 
    placeholder={placeholder} 
    type={type}/>
  )
}

export default InputPrimary