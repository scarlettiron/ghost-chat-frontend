import React from 'react'
import '../../css/loader.css'

const Loading1 = ({btnAction = null}) => {
  return (
    <div className='lds-container'>
      <div className='lds-wrapper'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}

export default React.memo(Loading1)