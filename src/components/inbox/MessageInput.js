import React, {useRef, memo} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import {ReactComponent as SendArrow} from '../../assets/send-arrow.svg'
const MessageInput = () => {

  return (
    <div className='new-message-input-wrapper'>
        <TextareaAutosize 
            minRows={2}
            maxRows={2} 
            maxLength={500}
            className={'message-input'} 
            name='body'
            id='body'
            placeholder='send a message'
        />
        <SendArrow className= "send-icon-svg" viewBox="0 0 512.035 512.035"/> 
    </div>
  )
}

export default memo(MessageInput)