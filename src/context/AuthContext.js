import React, {createContext, useState, useEffect, useCallback} from "react";
import jwt_decode from 'jwt-decode'
import {tokenExp, AuthUserUrls} from "../utils/ApiEndPoints";
import { useHistory } from "react-router-dom";
import GetCookie from "../utils/GetCookie";
import dayjs from 'dayjs'
import { CountRenders } from "../utils/CountRenders";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = React.memo(({children}) => {
    CountRenders('Auth Context: ')
    const [AuthTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse((localStorage.getItem('authTokens'))) :  null)
    const [User, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens'))?.access) : null)

    const [loading, setLoading] = useState(() => true)
    const history = useHistory()

    const {Login, RefreshToken, passwordReset, passwordResetConfirm} = AuthUserUrls

    const loginUser = useCallback(async (username, password) => {
        const payload = {
            'username':username,
            'password':password
        }
        //handle user authentication
        const response = await fetch(Login, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            }, 
            body:JSON.stringify(payload)
        })

        //if successful retrieve user profile info
        if (response.status === 200){
            const data = await response.json()
            const user = jwt_decode(data.access)
            //set auth tokens in local state
            setAuthTokens(() => data)
            setUser(() => user)
            //set auth tokens in local storage
            localStorage.setItem('authTokens', JSON.stringify(data))
            localStorage.setItem('user', JSON.stringify(user))
            history.push('/dashboard')
            }
        else{
            return "Invalid login credentials"
        } 
    }, [setAuthTokens])

    const logoutUser = useCallback(() => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        localStorage.removeItem('user')
        setUser(null)
        history.push('/login-signup')
    },[setAuthTokens])
              

    
    const updateToken = useCallback(async () => {
        const csrf = GetCookie('csrftoken')
        const refresh = AuthTokens?.refresh
        if(refresh){
            const response = await fetch(RefreshToken, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':csrf,
                },
                body:JSON.stringify({'refresh': refresh})
            })

            const data = await response.json()
            if('code' in data && data.code === "token_not_valid"){
                logoutUser()
            }

            if(response.status === 200){
                if (data.refresh){
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    setAuthTokens(() => data)
                    const user = jwt_decode(data.access)
                    setUser(() => user)

                    if(loading){
                        setLoading(false)
                    }
                    return {response, data}
                }
            }
            else{
                logoutUser()
            }
        }

    },[AuthTokens, setAuthTokens, setUser])


    const resetPassword = async (email) => {
        const fetchConfig = {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:email})
        }
        const response = await fetch(passwordReset.url, fetchConfig)
        return response
        
    }

    const confirmPasswordReset = async (uid, token, newPassword, verifyPassword) => {
        const fetchConfig = {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'uid':uid, 
                                'token':token,
                                'new_password':newPassword,
                                're_new_password':verifyPassword
                                })
        }
        const response = await fetch(passwordResetConfirm.url, fetchConfig)
        return response
    }


    const contextData = {
        loginUser:loginUser,
        logoutUser:logoutUser,
        User:User,
        setUser : setUser,
        AuthTokens:AuthTokens,
        setAuthTokens:setAuthTokens,
        updateToken:updateToken,
        d:resetPassword,
        confirmPasswordReset:confirmPasswordReset,
    }


     useEffect(() => {
         
        const updateData = async () => { await updateToken();}
        if(loading){
            if(!AuthTokens) return
            const User = jwt_decode(AuthTokens.access)
            const expired = dayjs.unix(User.exp).diff(dayjs()) < 1
            if(!expired) return 
            updateData()
        }

        const interval = setInterval(()=>{
            if(AuthTokens){
                updateData()
            }
        }, tokenExp)
        return ()=> clearInterval(interval)
    }, [AuthTokens, loading])
    

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
})