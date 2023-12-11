import React, {createContext, useContext, useEffect, useRef, useState, useCallback} from 'react'
import {signal, effect, useSignal} from "@preact/signals-react"
import AuthContext from './AuthContext' 
import InboxContext from './InboxContext'
import {w3cwebsocket as w3cSocket} from 'websocket'
import {ChatUrls} from '../utils/ApiEndPoints'
import Peer from 'simple-peer'

//Socket messages must be formatted in this manner
class SocketMessage {
    constructor(sender, thread, type='chat_message', body=false, 
    candidateSignal=false, sent=false, is_call=false){
        this.type = type;
        this.sender = sender;
        this.thread = thread;
        this.body = body;
        this.candidateSignal = candidateSignal;
        this.sent = sent;
        this.is_call = is_call;
    }
    toJSON(){
        return {
            type:this.type,
            sender:this.sender,
            thread:this.thread,
            body:this.body,
            candidateSignal:this.candidateSignal,
        }
    }
}


const PrivateSocketContext = createContext()

export default PrivateSocketContext;

const {socketUrl, serverUrl} = ChatUrls

export const PrivateSocketProvider = ({children}) => {
    const {User} = useContext(AuthContext)
    
    //current thread being viewed
    const [contextThread, setContextThread] = useState(false)

    //Set current thread user is viewing
    const handleSetContextThread = (threadId) => {
        sendingMessage.value = false
        //close socket from previous thread
        
        if(socketConnected){
            setSocketConnected(false)
        }

        if(socket.value){
            socket.value.close()
            socket.value = false
        }
        setContextThread(threadId)
    }

    const socket = useSignal(false)
    const [socketConnected, setSocketConnected] = useState(false)
    
    /// current message being sent over socket
    // when sending a message this is populated by socketmessage
    //object. If an error occurs while sending message or
    // message is successfully sent, this is set to false.
    const sendingMessage = useSignal(false)

    ///for messages state ///
    const {handleAddMessage} = useContext(InboxContext)

    //socket functions//
    const sendSocketMessage = async (data) => {
        const socketPayload = new SocketMessage({id:User.user_id}, {id:contextThread})
        socketPayload.type = 'chat_message'
        socketPayload.body = data.body.trim()
        sendingMessage.value = socketPayload
        const payload = JSON.stringify(socketPayload)
        socket.value.send(payload) 
    }

    const handleSocketActions = useCallback((data) => {
        if(data.type === 'chat_message'){
            if(data.sender.id === User.user_id & data.body === sendingMessage.value.body){
                sendingMessage.value = {...sendingMessage.value, sent:true}
            }
            handleAddMessage(data)
        }

        //part of handling socket actions
        if(data.type === 'call_request'){
            if(data.sender !== User.user_id){
            calling.value = "request"
            call.current = {status:true, caller:data.sender, candidateSignal:data.candidateSignal}
            }
        }
        if(data.type === 'accept_call_request'){
            handleCallAccepted(data)
        }
        if(data.type === 'decline_call_request'){
            if(data.sender !== User.user_id){
            handleAddMessage({
                sender:data.sender,
                thread:data.thread,
                body:null,
                is_call:true
            })
            calling.value = "declined"
            handleCleanup()
            }
        }
        if(data.type === 'call_ended'){
            handleAddMessage({
                sender:data.sender,
                thread:data.thread,
                body:null,
                is_call:true
            })
            if(data.sender !== User.user_id){
                handleCleanup()
            }
        }
        
    },[User, handleAddMessage])


    //connect socket when thread is viewed
    //setup socket in a way that, if there is an error the app will try and 
    //reconnect another socket
    useEffect(()=>{
  
        // to avoid multiple sockets from being opened
        if(!User | !contextThread){return}

        if(socketConnected === true){return}
        if(socket.value){return}
       
        const socketProtocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://'
        const socketConnectUrl = `${socketProtocol}${serverUrl.url}/${socketUrl.url}${contextThread}/`
        const newSocket = new w3cSocket(socketConnectUrl)

        newSocket.onerror = (error) => {
            setSocketConnected(()=>false)
            console.log("error")
            newSocket.close()
        }

        

        newSocket.onclose = () => {
            setSocketConnected(()=>false)
            console.log('socket closed')
        }

        newSocket.onopen = () => {
            console.log('socket open')
            setSocketConnected(()=>true)
        }

        newSocket.onmessage = ({data}) => {
            let parsedData = JSON.parse(data)
            handleSocketActions(parsedData)
        }

        socket.value = newSocket

        return () => {
            console.log("cleanup")
            //socketConnected.current = false
            //socket.value.close()
            //socketCount.current = socketCount.current -= 1
        }

        
    }, [socketConnected, contextThread,  User, socket, handleSocketActions])

        

    //// Voice and Video Calling ////
    ///for calling ///
    //Contains call data
    const call = useRef({status:false})
    const calling = useSignal(false)

    ////for peer////
    const peerSignal = useRef()
    const peersConnected = useRef()

    ///for streams ///
    const stream = useRef(null)
    const localVideo = useRef()
    const remoteVideo = useRef()

    //setup local stream using users camera and microphone
    const setupLocalStream = async () => {
        let currentStream = await navigator.mediaDevices.getUserMedia(
            {video:true, audio:true})
        stream.current = currentStream
        localVideo.current.srcObject = currentStream
    }


    //initiate call to remote user
    const handleMakeCall = async () =>{
        call.current = {status:true, caller:User.user_id}
        calling.value = "request"

        await setupLocalStream()
        if(stream.current){
        const newPeer = new Peer({initiator:true, trickle:false, stream:stream.current})
        //send peer signal via socket to remote user
        newPeer.on('signal', (data) => { 
            const socketPayload = new SocketMessage({id:User.user_id}, {id:contextThread})
            socketPayload.type = 'call_request'
            socketPayload.candidateSignal = data
            const payload = JSON.stringify(socketPayload)
            socket.current.send(payload)
        })

        newPeer.on('error', (error)=>{
            console.log(error)
            handleCleanup()
        })
        newPeer.on('connect', () => {
            console.log('connected')
            peersConnected.current = true
        })

        newPeer.on('stream', (RemoteStream) =>{
            console.log('streaming')
            remoteVideo.current.srcObject = RemoteStream
        })

        peerSignal.current = newPeer
        }
    }


    //handle if call is accepted by call receiver
    const handleCallAccepted = (data) => {
        if(data.sender !== User.user_id){
            peerSignal.current.signal(data.candidateSignal)
            calling.value = 'accepted'
        }

        peersConnected.current = true
    }



    //handle accepting call be sending a peer 
    //connection signal
    const handleAcceptCall = async () => {
        calling.value = "accepted"
        await setupLocalStream()
        if(stream.current){
        const newPeer = new Peer({initiator:false, trickle:false, stream:stream.current})

        newPeer.on('signal', (data) =>{
            const socketPayload = JSON.stringify({
                type:'accept_call_request',
                sender:User.user_id,
                candidateSignal:data,
                thread:contextThread,
                body:' '
            })
            socket.current.send(socketPayload)
        })

        newPeer.on('error', (error)=>{
            console.log(error)
            handleCleanup()
        })
        newPeer.on('connect', () => {
            console.log('connected')
            peersConnected.current = true
        })
        
        newPeer.on('stream', (remoteStream) =>{
            remoteVideo.current.srcObject = remoteStream
            peersConnected.current = true
        })

        newPeer.signal(call.current.candidateSignal)
        peerSignal.current = newPeer
        }
    }


    const handleEndCall = () => {
        handleCleanup()
        const socketPayload = JSON.stringify({
            type:'call_ended',
            sender:User.user_id,
            candidateSignal:null,
            thread:contextThread,
            body:' '
        })
        socket.current.send(socketPayload)
    }
    

    //reset everything for calling to initial settings
    const handleCleanup = () =>{
        calling.value = false
        try{
            stream.current.getTracks().forEach(track => {
                track.stop()    
            })
            peerSignal.current.destroy()
        }
        catch{
            console.log('no tracks to stop')
        }

        stream.current = null
        calling.value = false
        call.current = {status:false}
        peersConnected.current = false
        remoteVideo.current = null
        localVideo.current = null

    }


    
    //export data
    const socketContextData = {

        handleSetContextThread:handleSetContextThread,
        contextThread:contextThread,
        socket:socket,
        socketConnected:socketConnected,
        sendingMessage:sendingMessage.value,
        sendSocketMessage:sendSocketMessage,
        //for calling
        peerSignal:peerSignal,
        peersConnected:peersConnected,
        setupLocalStream:setupLocalStream,
        remoteVideo:remoteVideo,
        localVideo:localVideo,
        handleMakeCall:handleMakeCall,
        handleAcceptCall:handleAcceptCall,
        call:call,
        calling:calling.value,
        stream:stream,
    }



  return (
    <PrivateSocketContext.Provider value={socketContextData}>
        {children}
    </PrivateSocketContext.Provider>
  )
}
