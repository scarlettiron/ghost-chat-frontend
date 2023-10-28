import React from 'react'
import Placeholder from '../../assets/placeholder.png'

const ProfileImageMedium = ({user}) => {
  return (
    <div className='profile-picture-medium'>
        <img src={user.pic ? user.pic : Placeholder} alt={user.username}/>
    </div>
  )
}

export default ProfileImageMedium