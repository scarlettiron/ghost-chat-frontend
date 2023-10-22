import React from 'react'
import '../../css/errors.css'

const Success2 = ({message}) => {
  return (
    <div className='success-container'>
        <h3>
        {message ? message : 'Success!'}
        </h3>
    </div>
  )
}

export default React.memo(Success2)