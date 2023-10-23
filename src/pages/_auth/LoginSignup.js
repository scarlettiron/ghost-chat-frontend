import React, {useState} from 'react'
import LoginForm from '../../components/_auth_components/LoginForm'
import SignupForm from '../../components/_auth_components/SignupForm'
import '../../css/general.css'

const LoginSignup = () => {
   const [toggleLogin, setToggleLogin] = useState(() => true)
  const handleToggle = () => {
    setToggleLogin(!toggleLogin)
  }
   return (
    <div className='form-container'>
      {
        toggleLogin ?
        <LoginForm toggle = {handleToggle}/>
        :
        <SignupForm toggle = {handleToggle}/>
      }
    </div>
  )
}

export default React.memo(LoginSignup)