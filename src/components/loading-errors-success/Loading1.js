import React from 'react'
import ButtonMain from '../buttons-inputs/BtnMain'
import '../../css/loader.css'

const Loading1 = ({btnAction = null}) => {
  return (
    <div className='lds-container'>
      {btnAction && <><div className='lds-btn-wrapper'><ButtonMain onClick={btnAction} text={'cancel'}/></div></>}
      <div className='lds-wrapper'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}

export default React.memo(Loading1)