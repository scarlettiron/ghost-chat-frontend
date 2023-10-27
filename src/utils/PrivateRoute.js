import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Route, Navigate} from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
  const {AuthTokens} = useContext(AuthContext)

    return AuthTokens ? <>{children}</>: <Navigate to='/not'/> 
}

export default PrivateRoute