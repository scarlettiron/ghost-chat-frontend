import React, {memo, useContext, useEffect} from 'react'
import InboxContext from '../../context/InboxContext'
import AuthContext from '../../context/AuthContext'
import PrivateSocketContext from '../../context/PrivateSocketContext'
import { useParams } from 'react-router-dom'
import ChatHeader from '../../components/inbox/ChatHeader'

const PrivateThread = () => {
    const {threadID} = useParams()
    const {User} = useContext(AuthContext)
    const {currentThread, handleSetCurrentThread} = useContext(InboxContext)
    const {handleSetContextThread} = useContext(PrivateSocketContext)

    let receiver = null
    console.log(threadID)

    useEffect(() => {
      handleSetCurrentThread(threadID)
      handleSetContextThread(threadID)
    }, [])

    useEffect(() => {
      if(!currentThread) return
      receiver = currentThread.user1.id === User.id ? currentThread.user2 : currentThread.user1 
    }, [currentThread])
  return (
    <div className='chat-wrapper'>
      <ChatHeader thread={currentThread} receiver={receiver}/>
    </div>
  )
}

export default PrivateThread