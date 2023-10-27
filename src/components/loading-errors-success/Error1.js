import React from 'react'
import '../../css/errors-success.css'

const Error1 = ({error=null}) => {
  return (
    <div className='error-container'>
      <h3>{error.errorMessage ? error.errorMessage : "An error has occured"}</h3>
    </div>
  )
}

export default React.memo(Error1)