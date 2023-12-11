import React, {useState, memo, useContext, useRef} from 'react'
import {effect} from "@preact/signals-react"
import PrivateSocketContext from '../../context/PrivateSocketContext';
import TextareaAutosize from 'react-textarea-autosize';
import {ReactComponent as SendArrow} from '../../assets/send-arrow.svg'
import LoadingSmall from '../loading-errors-success/LoadingSmall'
const MessageInput = () => {

  const {sendSocketMessage, sendingMessage} = useContext(PrivateSocketContext)
  const tag = useRef()

  const [body, setBody] = useState(() => sendingMessage?.sent === true && null)
  const [disabled, setDisabled] = useState(() => !sendingMessage | sendingMessage?.sent ? false : true)

  const handeleSetBody = (e) => {
    setBody(() => e.target.value)
  }

  const handleSendMessage = () => {
    if(!body.trim()){return}
    sendSocketMessage({'body':body})
    setDisabled(() => true)
  }

  //handle clearing input when message is successfully sent
  effect(() => {
    if(sendingMessage.sent === true) 
    {tag.current.value = null}
  })

  return (

    <div className='new-message-input-wrapper'>
        <TextareaAutosize 
            ref={tag}
            minRows={2}
            maxRows={2} 
            maxLength={500}
            className={'message-input'} 
            name='body'
            id='body'
            placeholder='send a message'
            onChange={(e) => handeleSetBody(e)}
            disabled = {disabled}
        />
        {sendingMessage && !sendingMessage.sent ?
          <LoadingSmall/>
          :
        <SendArrow onClick = {() => handleSendMessage()} className= "send-icon-svg" viewBox="0 0 512.035 512.035"/>
        } 
    </div>
  )
}

export default memo(MessageInput)