import React, {memo, useContext} from 'react'
import InboxContext from '../../context/InboxContext'
import ThreadItem from './ThreadItem'

const ThreadContainer = () => {
    const {Inbox} = useContext(InboxContext)

    return (
    <div className='thread-container-wrapper'>
        <div className='thread-container'>
            {Inbox &&
                Inbox?.map((thread, index) => 
                {return  <ThreadItem thread={thread} key={index}/>}
                )
            }
        </div>
    </div>
  )
}

export default memo(ThreadContainer)