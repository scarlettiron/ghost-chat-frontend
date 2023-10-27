import React, {memo, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import ProfileImageSmall from '../profile/ProfileImageSmall'
import { CountRenders } from '../../utils/CountRenders'

const ThreadItem = ({thread}) => {
  CountRenders(`thread item ${thread.id}: `)
    const {User} = useContext(AuthContext)
    const receiver = User.user_id === thread.user1.id ? thread.user2 : thread.user1
  return (
    <Link to={`/chat/${thread.id}`} className='thread-item'>
        <ProfileImageSmall
        user={receiver}
        />

        <h3 className='text-primary profile-name'>{receiver.username}</h3>
    </Link>
  )
}

export default memo(ThreadItem)