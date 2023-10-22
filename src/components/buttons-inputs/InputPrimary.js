import React, {memo} from 'react'
import '../../css/buttons-inputs.css'

const InputPrimary = ({id, placeholder, type='text', error=null}) => {
  return (
    <input 
    className={error ? 'input-primary error' : 'input-primary'}
    id={id} 
    name={id} 
    placeholder={placeholder} 
    type={type}/>
  )
}

export default memo(InputPrimary)