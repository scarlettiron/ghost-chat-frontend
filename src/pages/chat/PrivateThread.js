import React, {memo, useContext} from 'react'
import InboxContext from '../../context/InboxContext'
import AuthContext from '../../context/AuthContext'
import PrivateSocketContext from '../../context/PrivateSocketContext'
import { useParams } from 'react-router-dom'

const PrivateThread = () => {
    const {threadID} = useParams()
    const {currentThread, handleSetCurrentThread} = useContext(InboxContext)
    const {handleSetContextThread} = useContext(PrivateSocketContext)


  return (
    <div>PrivateThread</div>
  )
}

export default PrivateThread