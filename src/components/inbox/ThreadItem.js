import React, {memo, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import ProfileImageSmall from '../profile/ProfileImageSmall'

const ThreadItem = (thread) => {
    const {User} = useContext(AuthContext)
    const receiver = User.id === thread.user1.id ? thread.user2 : thread.user1
  return (
    <Link to={`/chat/${thread.id}`}>
    <div className='thread-item'>
        <ProfileImageSmall
        user={receiver}
        />

        <h3 className='text-primary'>{receiver.username}</h3>
    </div>
    </Link>
  )
}

export default memo(ThreadItem)