import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import ThreadContainer from '../inbox/ThreadContainer'

const SideNav = () => {
    const {threadID} = useParams()
    const [toggle, setToggle] = useState(() => threadID? false : true)

  return (
    <div className='side-nav-wrapper temp'>
      {/*container for all threads */}
      {toggle &&
        <ThreadContainer/> 
      }
    </div>
  )
}

export default SideNav