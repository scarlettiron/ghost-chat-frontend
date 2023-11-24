import React, {memo} from 'react'

const Message = ({message, sender, user}) => {
  return (
    <div className={sender.id === user.user_id ? 'w-100 justify-content-end' : 'w-100 justify-content-start'}>
      <div className={sender.id === user.user_id ? 'message-container user' : 'message-container'}>
          <h5>{message.body}</h5>
      </div>
    </div>
  )
}

export default memo(Message)