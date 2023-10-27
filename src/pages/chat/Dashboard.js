import React from 'react'
import ThreadContainer from '../../components/inbox/ThreadContainer'
import InboxContainerLargeScreen from '../../components/inbox/InboxcontainerLargeScreen'

//Main landing page 
const Dashboard = () => {
  return (
    <div className='dashboard-container temp3'>
      {/*container for all threads */}
      <ThreadContainer/>

      {/*Only shows up when screen is 500px or larger */}
      <InboxContainerLargeScreen/>
    </div>
  )
}

export default Dashboard