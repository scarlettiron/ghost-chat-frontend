import React, {memo} from 'react'
import '../../css/buttons-inputs.css'

const BtnPrimary = ({text, onClick, form=null, type='text'}) => {
  return (
    <button type ={type} className='btn-primary' onClick={onClick} form={form}>
        {text}
    </button>
  )
}

export default memo(BtnPrimary)