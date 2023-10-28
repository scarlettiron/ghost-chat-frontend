import React, {createContext, useState, useEffect, useContext} from "react";
import AuthContext from './AuthContext'
import CustomFetch from '../utils/CustomFetch'
import {InboxUrls} from '../utils/ApiEndPoints'
import {CountRenders} from '../utils/CountRenders'
const InboxContext = createContext()

export default InboxContext;

export const InboxProvider = ({children}) => {
    CountRenders('Inbox Context: ')
    const {dashboard, createMessage, getMesssages} = InboxUrls
    const {User} = useContext(AuthContext)
    // list of threads messages are
    //organized by thread with messages included in 
    //'message_list'
    //{[
    //    'pk':thread pk,
    //     'massage_list':[{message data},]
    // ]}
    const [messages, setMessages] = useState(() => localStorage.getItem('_GhostThreads_') ? JSON.parse(localStorage.getItem('_GhostThreads_')) : false)

    const [error, setError] = useState(() => false)
    const [loading, setLoading] = useState(() => true)
    
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
        try{
            const {response, data} = await CustomFetch(dashboard.url)
            console.log(response)
            console.log(data)
            if(response.status === 200){
                if(!messages){
                    setMessages(data)
                    localStorage.setItem('ghost_inbox', JSON.stringify(data))
                    setLoading(() => false)
                    return 
                }
                //If there are message already in state
                setMessages((oldData) => {
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

                                //oldData[i].message_list.sort()
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

    const handleSetCurrentThread = (threadId) => {
        for(let i = 0; i < messages.length; i++){
            if(messages[i].id === threadId){
                setCurrentThread(messages[i])
                return
            }
        }
    }

    //mark messages as read for server
    const handleMarkAsRead = async () => {
        
    }

    //get messages for individual thread from server
    const handleFetchThreadMessages = async (threadId) => {
        try{
            const {response, data} = await CustomFetch(`${getMesssages.url}/${threadId}`)
            if(response.status === 200){
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

                //add messages to current threads state
                setCurrentThread(() => threadData)
                //iterate through all threads and add new messages
                const newInbox = {...messages}
                for(let k = 0; k < newInbox.length; k++){
                    if(newInbox[k].id === threadData.id){
                        newInbox[k] = threadData
                        setMessages(newInbox)
                        break
                    }
                }
                //Add updated info to local storage
                localStorage.removeItem('ghost_inbox')
                localStorage.setItem('ghost_inbox', newInbox)

            }
        }
        catch(error){

        }
    }

    //  Add message to LOCAL storage only
    const handleAddMessage = (message) => {
        setCurrentThread((oldData) => ({
            message_list:[message, ...oldData.message_list],
            ...oldData
        }))

        const threadData = {...messages}
        for(let x = 0; x < threadData.length; x++){
            if(threadData[x].id === currentThread.id){
                threadData[x].message_list.push(message)
                break
            }
        }
        setMessages(threadData)
        localStorage.removeItem('ghost_inbox')
        localStorage.setItem('ghost_inbox', threadData)

    }

    // Add unread message to db
    const handleSaveMessageToDb = async (message) => {
        const fetchConfig = {body:JSON.stringify(message), method:createMessage.method}
        const {response, data} = await CustomFetch(createMessage.url, fetchConfig)
        if(response.status === 200){
            console.log('success')
        }
    }


    useEffect(() => {
        if(!User) return
        handleDashboardLoad()
    }, [])

    const contextData = {
        Inbox:messages,
        dashboardError:error,
        dashboardLoading:loading,
        handleAddMessage:handleAddMessage,
        handleSetCurrentThread:handleSetCurrentThread,
        currentThread:currentThread,
        handleSaveMessageToDb:handleSaveMessageToDb,
    }

    return (
        <InboxContext.Provider value={contextData}>
            {children}
        </InboxContext.Provider>
    )
}