import React, {useState} from 'react'
import LoginForm from '../../components/_auth_components/LoginForm'
import SignupForm from '../../components/_auth_components/SignupForm'
import '../../css/general.css'

const LoginSignup = () => {
   const [toggleLogin, setToggleLogin] = useState(() => true)
  return (
    <>
    {
      toggleLogin ?
      <LoginForm/>
      :
      <SignupForm/>
    }
    </>
  )
}

export default React.memo(LoginSignup)