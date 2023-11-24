import React, {createContext, useRef, useCallback, useState, useEffect, useContext} from "react";
import AuthContext from './AuthContext'
import CustomFetch from '../utils/CustomFetch'
import {dateIsBefore} from '../utils/DateFunctions'
import {InboxUrls} from '../utils/ApiEndPoints'
import {CountRenders} from '../utils/CountRenders'
const InboxContext = createContext()

export default InboxContext;

export const InboxProvider = ({children}) => {
    CountRenders('Inbox Context: ')
    const {dashboard, createMessage, getMesssages, markAsRead} = InboxUrls
    const {User} = useContext(AuthContext)
    // list of threads messages are
    //organized by thread with messages included in 
    //'message_list'
    //{[
    //    'pk':thread pk,
    //     'massage_list':[{message data},]
    // ]}
    const [inbox, setInbox] = useState(() => localStorage.getItem('_GhostThreads_') ? JSON.parse(localStorage.getItem('_GhostThreads_')) : false)

    const [error, setError] = useState(() => false)
    const [loading, setLoading] = useState(() => true)
  
    //prevents duplicate dashboard loads 
    const dashLoadCalls = useRef(0)

    // Initial dash board load for first 10 threads 
    // and 5 messages per thread
    // GhostChat only stores messages in the database which
    //have not been seen by the receiver. However, it stores
    //messages which have been seen inside of local storage
    //UNTIL a user logs out, at the time all seen messages
    //are lost.
    //So, we need to fetch unseen messages from server and
    //sort them into the correct spots in state before placing
    //them in local storage
    const handleDashboardLoad = async () => {
        if(dashLoadCalls.current > 0) return
        dashLoadCalls.current = dashLoadCalls.current + 1
        
        try{
            const {response, data} = await CustomFetch(dashboard.url)
            if(response.status === 200){
                if(!inbox){
                    //sort messages in threads
                    for(let i = 0; i < data.length; i++){
                        const sortedMessages = handleSortMessages(data[i].message_list)
                        data[i].message_list = sortedMessages
                    }
                    
                    setInbox(data)
                    localStorage.setItem('ghost_inbox', JSON.stringify(data))
                    setLoading(() => false)
                    return 
                }
                //If there are messages already in state
                setInbox((oldData) => {
                    //iterate through threads in data first
                    for(let j = 0; j < data.length; j++){
                        //iterate through current state threads data
                        let found = false
                        for( let i = 0; i < oldData.length; i++){
                            if(data[j].id === oldData[i].id){
                                found = true
                                //get all id's for old threads messages
                                let messageIds = []
                                for(let x = 0; x < oldData[i].message_list.length; x++){
                                    messageIds.push(oldData[i].message_list[x].id)
                                }

                                // iterate through messages just fetched
                                for(let z = 0; z < data[j].message_list.length; z++){
                                    // add if message is not in state list
                                    if(!messageIds.includes(data[j].message_list[z])){
                                        oldData[i].message_list.push(data[j].message_list[z])
                                    }

                                }

                                oldData[i].message_list = handleSortMessages(oldData[i].message_list)
                                break
                            }
                            
                        }

                        //add thread if thread is not in state list
                        if(!found){
                            oldData.push(data[j])
                        }
                    }
                    localStorage.removeItem('ghost_inbox')
                    localStorage.setItem('ghost_inbox', oldData)
                    return oldData
                })
            setLoading(() => false)
            }
        }

        catch(error){
            console.log('error')
            console.log(error)
            setError(error)
            setLoading(() => false)
        }
    }

    //For users currently active thread
    const [currentThread, setCurrentThread] = useState(() => null)

    const handleSetCurrentThread = useCallback((threadId) => {
        for(let i = 0; i < inbox.length; i++){
            if(inbox[i].id === threadId){
                //sort the threads messages into correct order

                setCurrentThread(inbox[i])
                return
            }
        }
    }, [inbox])

    //mark messages as read for server
    //takes in a list if message id's
    const handleMarkAsRead = useCallback(async (idList) => {
        const fetchConfig = JSON.stringify({
            method:markAsRead.method,
            body:{id_list:idList}
        })
        await CustomFetch(markAsRead.url, fetchConfig)
    }, [])

    //get messages for individual thread from server
    const handleFetchThreadMessages = async (threadId) => {
        try{
            const {response, data} = await CustomFetch(`${getMesssages.url}${threadId}`)
            if(response.status === 200 && data.length > 0){
                //add messages to state
                const threadData = {...currentThread}
                //iterate through messages and insert into correct slots
                for(let i = 0; i < data.results.length; i++){
                    let foundMessage = false
                    for(let x = 0; x < threadData.message_list.length; x++){
                        if(data.results[i].id === threadData.message_list[x]){
                            foundMessage = true
                            break
                        }
                    }
                    if(!foundMessage){
                        threadData.message_list.push(data.results[i])
                    }
                }
                //add pagination endpoint
                threadData.next = data.next
                //add messages to current threads state
                setCurrentThread(() => threadData)
                //iterate through all threads and add new messages
                const newInbox = {...inbox}
                for(let k = 0; k < newInbox.length; k++){
                    if(newInbox[k].id === threadData.id){
                        newInbox[k] = threadData
                        setInbox(newInbox)
                        break
                    }
                }
                //Add updated info to local storage
                localStorage.removeItem('ghost_inbox')
                localStorage.setItem('ghost_inbox', newInbox)

                //mark messages as read
                const messageIdList = []
                for(let v = 0; v < data.length; v++){
                    if(data[v].sender.id !== User.id){
                        messageIdList.push(data[v].id)
                    }
                }
                handleMarkAsRead(messageIdList)
            }
        }
        catch(error){
            //handle errors
            console.log(error)
        }
    }

    //handle sorting list of messages so that they are reversed
    //with the most current message being at the last index
    //and the oldest message being at the first index
    const handleSortMessages  = (messageList) => {
        const newMessageList = messageList.sort((first, second) => {
            let checkDate = dateIsBefore(first.date, second.date)
            if(checkDate){
                return -1
            }
            return 1
        })

        return newMessageList
    }

    //  Add message to LOCAL storage only
    const handleAddMessage = (message) => {
        setCurrentThread((oldData) => ({
            message_list:[message, ...oldData.message_list],
            ...oldData
        }))

        const threadData = {...inbox}
        for(let x = 0; x < threadData.length; x++){
            if(threadData[x].id === currentThread.id){
                threadData[x].message_list.push(message)
                break
            }
        }
        setInbox(threadData)
        localStorage.removeItem('ghost_inbox')
        localStorage.setItem('ghost_inbox', threadData)

    }


    useEffect(() => {
        if(!User || !loading || dashLoadCalls.current >= 1) return
        handleDashboardLoad()
    }, [loading, User])

    const contextData = {
        Inbox:inbox,
        dashboardError:error,
        dashboardLoading:loading,
        handleAddMessage:handleAddMessage,
        handleSetCurrentThread:handleSetCurrentThread,
        currentThread:currentThread,
        handleFetchThreadMessages:handleFetchThreadMessages,
        handleSortMessages:handleSortMessages,

    }

    return (
        <InboxContext.Provider value={contextData}>
            {children}
        </InboxContext.Provider>
    )
}