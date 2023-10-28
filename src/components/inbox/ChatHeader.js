import React from 'react'
import ProfileImageMedium from '../profile/ProfileImageMedium'

const ChatHeader = ({thread, receiver}) => {
  return (
    <div className='chat-header'>
        {receiver &&
        <div className='chat-profile-info'>
            <ProfileImageMedium user={receiver}/>
            <h3 className='text-primary profile-name'>{receiver.username}</h3>
        </div>
        }

    </div>
  )
}

export default ChatHeader