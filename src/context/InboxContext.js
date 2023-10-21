import React, {createContext, useState, useEffect, useContext} from "react";
import {AuthContext} from './AuthContext'
import CustomFetch from '../utils/CustomFetch'
import {InboxUrls} from '../utils/ApiEndPoints'
import CountRenders from '../utils/CountRenders'
const InboxContext = createContext()

export default InboxContext;

export const InboxProvider = ({children}) => {
    CountRenders('Inbox Context: ')
    const {dashboard} = InboxUrls
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
            const {response, data} = await CustomFetch(dashboard)
            if(response.status === 200){
                if(!messages){
                    setMessages(data)
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

                                oldData[i].message_list.sort()
                                break
                            }
                            
                        }

                        //add thread if thread is not in state list
                        if(!found){
                            oldData.push(data[j])
                        }
                    }
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


    useEffect(() => {
        if(!User) return
        handleDashboardLoad()
    }, [])

    const contextData = {
        messages:messages,
        dashboardError:error,
        dashboardLoading:loading,
    }

    return (
        <InboxProvider.Provider value={contextData}>
            {children}
        </InboxProvider.Provider>
    )
}