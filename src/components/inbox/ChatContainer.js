import React, {memo, useEffect, useContext, useRef, createRef, useState} from 'react'
import InboxContext from '../../context/InboxContext'
import PrivateSocketContext from '../../context/PrivateSocketContext'
import AuthContext from '../../context/AuthContext'
import Message from './Message'
//Holds all messages for thread

const ChatContainer = () => {
    const {User} = useContext(AuthContext)
    const {currentThread, getNextPageOfMessages} = useContext(InboxContext)
    //const {call, calling} = useContext(PrivateSocketContext)
    const displaySendingPopup = useRef(null)
    const initialMount = useRef(true)
    const scrollDiv = createRef()
 
    const [loading, setLoading] = useState(() => true)
  
    const scrollToBottom = () => {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
    }
  
    const handleScroll = () => {
      if(initialMount.current){
      initialMount.current = false
      }
    }
  
    const observer = useRef()
  
    const handleTrackPosition = element => {
      if(!currentThread.next) return
      if(observer.current) {observer.current.disconnect()}
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          if(scrollDiv != null && scrollDiv.current.scrollTop <= 40){
            getNextPageOfMessages()
        }
        }
      })
      if(element) {observer.current.observe(element)}
    }
  
    
  
    useEffect(()=>{
      if(loading && !currentThread) return
      if(initialMount.current && currentThread){

      scrollToBottom()
      }
    }, [currentThread, loading])
  
  
   // useEffect(() => {
    //  if(call.current.caller !== User.user_id){
      //  scrollToBottom()
      //}

    //}, [calling])

  return (
    <div className='chat-container' ref={scrollDiv}>
        {currentThread &&
            currentThread.message_list.map((message, index) => {
                if(index === currentThread.message_list.length - 1){
                  return <div ref={handleTrackPosition} key={index}>
                    <Message message={message} sender={message.sender} 
                    key={`message-${message.id}-${index}`} user={User} />
                  </div>
                }
                return <Message message={message} sender={message.sender} 
                key={`message-${message.id}-${index}`} user={User}/>
            })
        }
    </div>
  )
}

export default memo(ChatContainer)