import React, {memo, useState} from 'react'
import InputPrimary from '../../components/buttons-inputs/InputPrimary'
import BtnPrimary from '../../components/buttons-inputs/BtnPrimary'
import formInputChecker from '../../utils/FormInputChecker'
import Error1 from '../loading-errors-success/Error1'
import Loading1 from '../loading-errors-success/Loading1'
import Success1 from '../loading-errors-success/Success1'
import {AuthUserUrls} from '../../utils/ApiEndPoints'
import '../../css/forms.css'
import '../../css/general.css'

const SignupForm = ({toggle}) => {
  const [loading, setLoading] = useState(() => false)
  const [error, setError] = useState(() => false)
  const [success, setSuccess] = useState(() => false)

  const {Signup} = AuthUserUrls

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if(error){
      setError(() => false)
    }
    const formError = formInputChecker(e)

    if(formError){
      setError({'type':formError})
      return
    }
    
    const {password, retypePassword, username, email} = e.target.elements
    if(password !== retypePassword){
      setError({type:'password', message:'Passwords do not match'})
      setLoading(() => false)
      return
    }
    const emailAt = email.indexOf("@")
    const emailDot = email.lastIndexOf(".");
    if(!emailAt | !emailDot){
      setError({type:'email', message:'Invalid Email'})
      setLoading(() => false)
      return
    }


    const payload = JSON.stringify({
      'username':username.value.trim(),
      'password':password.value.trim(),
      'email':email.value.trim()
    })

    setLoading(() => true)
    try{
        const response = await fetch(Signup.url, 
                                    {body:payload, 
                                    method:Signup.method})
    
        if(response.status === 200){
        setSuccess(() => true)
        setLoading(() => false)
        return
        }
    }
    catch(error){
        setError({message:error})
        setLoading(() => false)
      }
    
  }

  return (
    <form className='form-primary' id='signup-form'
          onSubmit={(e) => handleSignup(e)}>
       {error &&
        <Error1 error={error}/>
       }
       {success &&
        <Success1/>
       }
       {!loading && !success &&
        <>
            <InputPrimary id='username' placeholder='Username'
            error={error}/>
            <InputPrimary id='password' placeholder='Password'
            type='password' error={error}/>
            <InputPrimary id='retypePassword' placeholder='Retype Password'
            type='password' error={error}/>
            <InputPrimary id='email' placeholder='Password'
            error={error}/>
            <BtnPrimary text={'Signup'} form='signup-form'/>
        </>
        }
        {loading &&
            <Loading1/>
        }

        <div className='w-100 justify-content-space-around'>
            <h5 className='text-secondary' onClick={() => toggle()}>Login Instead</h5>
        </div>
    </form>
  )
}

export default memo(SignupForm)