import React from 'react'
import ProfileImageSmall from '../profile/ProfileImageSmall'
import ChatBtns from './ChatBtns'

const ChatHeader = ({receiver}) => {
  return (
    <div className='chat-header'>
        {receiver &&
        <div className='chat-profile-info'>
            <ProfileImageSmall user={receiver}/>
            <h3 className='text-primary profile-name'>{receiver.username}</h3>
        </div>
        }
        <ChatBtns/>
    </div>
  )
}

export default ChatHeader