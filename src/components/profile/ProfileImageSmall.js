import React, {memo} from 'react'
import Placeholder from '../../assets/placeholder.png'

const ProfileImageSmall = ({user}) => {
  return (
    <div className='profile-picture-small'>
        <img src={user.pic ? user.pic : Placeholder} alt={user.username}/>
    </div>
  )
}

export default memo(ProfileImageSmall)