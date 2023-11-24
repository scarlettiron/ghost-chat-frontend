import React, {memo, useRef, useContext, useEffect, useState} from 'react'
import InboxContext from '../../context/InboxContext'
import AuthContext from '../../context/AuthContext'
import PrivateSocketContext from '../../context/PrivateSocketContext'
import { useParams } from 'react-router-dom'
import ChatHeader from '../../components/inbox/ChatHeader'
import Loading1 from '../../components/loading-errors-success/Loading1'
import { CountRenders } from '../../utils/CountRenders'
import ChatContainer from '../../components/inbox/ChatContainer'
import MessageInput from '../../components/inbox/MessageInput'
const PrivateThread = () => {

    CountRenders("Private thread: ")
    const {threadID} = useParams()
    const {User} = useContext(AuthContext)
    const {dashboardLoading, currentThread, handleSetCurrentThread, handleFetchThreadMessages} = useContext(InboxContext)
    const {handleSetContextThread} = useContext(PrivateSocketContext)

    const receiver = useRef()
    const [loading, setLoading] = useState(() => true)
    

    useEffect(() => {
      const handleSetUp = async () => {
        const threadId = parseInt(threadID)
        await handleSetCurrentThread(threadId)
        await handleSetContextThread(threadId)
        await handleFetchThreadMessages(threadId)
        setLoading(() => false)
      }

      if(dashboardLoading) {return}
      handleSetUp()

    }, [dashboardLoading, threadID])

    useEffect(() => {
      if(!currentThread || !User) return
      receiver.current = currentThread.user1.id === User.user_id ? currentThread.user2 : currentThread.user1 
    }, [currentThread, threadID])

  return (
    <div className='chat-wrapper'>
      {loading && <Loading1/>}
      <ChatHeader thread={currentThread} receiver={receiver.current}/>
      <ChatContainer/>
      <MessageInput/>

    </div>
  )
}

export default memo(PrivateThread)