import React, {memo, useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import InputPrimary from '../../components/buttons-inputs/InputPrimary'
import BtnPrimary from '../../components/buttons-inputs/BtnPrimary'
import formInputChecker from '../../utils/FormInputChecker'
import Error1 from '../loadings-errors-success/Error1'
import Loading1 from '../loadings-errors-success/Loading1'
import '../../css/forms.css'
import '../../css/general.css'


const LoginForm = ({toggle}) => {
    const [loading, setLoading] = useState(() => false)
    const [error, setError] = useState(() => false)

    const {loginUser} = useContext(AuthContext)

    const handleLogin = async (e) => {
        const inputError = formInputChecker(e)
        if(inputError){
            setError({type:inputError})
        }
        setLoading(()=>true)
        setError(() => false)
        let {username, password} = e.target.elements

        username = username.strip()
        password = password.strip()

        const loginError = await loginUser(username, password)
        if(loginError){
            setError({message:loginError})
            setLoading(()=> false)
        }
    }

  return (


    <form className='form-primary'  id='login-form'
          onSubmit={(e)=>handleLogin(e)}>
        <h3 className='text-primary'>Login</h3>
       {error &&
        <Error1 error={error}/>
       }
       {!loading &&
        <>
            <InputPrimary id='username' placeholder='Username'
            error={error}/>
            <InputPrimary id='password' placeholder='Password'
            type='password' error={error}/>
            <BtnPrimary text={'Login'} form='login-form'/>
        </>
        }
        {loading &&
            <Loading1/>
        }
        <div className='w-100 justify-content-space-around'>
            <h5 className='text-secondary' onClick={() => toggle()}>Signup</h5>
            <h5 className='text-secondary'>Forgot Password</h5>
        </div>
    </form>
  )
}

export default memo(LoginForm)