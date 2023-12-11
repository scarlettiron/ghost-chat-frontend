




const handleDeclineCall = () => {
    handleCleanup()
    const socketPayload = JSON.stringify({
        type:'decline_call_request',
        sender:User.user_id,
        candidateSignal:null,
        thread:contextThread.value,
        body:' '
    })
    socket.current.send(socketPayload)

}


//part of socket context export
handleDeclineCall:handleDeclineCall,


