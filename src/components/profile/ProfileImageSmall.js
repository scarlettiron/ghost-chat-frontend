import React, {memo} from 'react'

const ProfileImageSmall = ({user}) => {
  return (
    <div className='profile-picture-small'>
        <img src={user.pic} alt={user.username}/>
    </div>
  )
}

export default memo(ProfileImageSmall)