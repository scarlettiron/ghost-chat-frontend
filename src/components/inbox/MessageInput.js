import React, {useState, memo, useContext, useRef, useEffect} from 'react'
import PrivateSocketContext from '../../context/PrivateSocketContext';
import TextareaAutosize from 'react-textarea-autosize';
import {ReactComponent as SendArrow} from '../../assets/send-arrow.svg'
const MessageInput = () => {
  const {sendSocketMessage, sendingMessage} = useContext(PrivateSocketContext)
  const tag = useRef()
  
  const [body, setBody] = useState(() => sendingMessage?.sent === true && null)
  const [disabled, setDisabled] = useState(() => sendingMessage ? true : false)

  const handeleSetBody = (e) => {
    setBody(e.target.value)
  }

  const handleSendMessage = () => {
    console.log("sending message")
    sendSocketMessage({'body':body})
    setDisabled(() => true)
  }

  //handle clearing input when message is successfully sent
  useEffect(() => {
    if(sendingMessage?.sent === true) 
    {tag.current.value = null}

  }, [sendingMessage])

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
        {sendingMessage ?
          <h5>Sing</h5>
          :
        <SendArrow onClick = {() => handleSendMessage()} className= "send-icon-svg" viewBox="0 0 512.035 512.035"/>
        } 
    </div>
  )
}

export default memo(MessageInput)