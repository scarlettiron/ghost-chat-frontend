import React, {memo} from 'react'
import SearchBox from '../search/SearchBox'


//For landing dashboard on larger screens
//contains search users box
const InboxcontainerLargeScreen = () => {
  return (
    <div className='inbox-container-large-landing temp'>
        <SearchBox/>
    </div>
  )
}

export default memo(InboxcontainerLargeScreen)