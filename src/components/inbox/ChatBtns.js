import React, {useContext} from 'react'
import PrivateSocketContext from '../../context/PrivateSocketContext'
import {ReactComponent as Phone} from '../../assets/phone.svg'
const ChatBtns = () => {
  const {handleMakeCall} = useContext(PrivateSocketContext)
  return (
    <Phone 
    viewBox="0 0 24 24" 
    className='call-icon-svg'
    onClick={() => handleMakeCall()}
    />
  )
}

export default ChatBtns