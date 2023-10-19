import dayjs from 'dayjs'
import GetCookie from './GetCookie'
import jwt_decode from 'jwt-decode'
import {loginRefreshUrl} from './ApiEndPoints'

let updateToken = async (AuthTokens) => {
    if(AuthTokens?.refresh){
        let response = await fetch(loginRefreshUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',

            },
            body:JSON.stringify({'refresh':AuthTokens?.refresh})
        })
        let data = await response.json()
        localStorage.setItem('authTokens', JSON.stringify(data))
        return {response, data}
    }
    
}

let CustomFetch = async (dataUrl, fetchConfig={}, contentTypeOverRide=false) => {
    let AuthTokens = JSON.parse(localStorage.getItem('authTokens'))
    let User = jwt_decode(AuthTokens.access)
    let tokens = AuthTokens
    let expired = dayjs.unix(User.exp).diff(dayjs()) < 1

    if(expired){
        let {response, data} = await updateToken(AuthTokens)
        console.log(data)
        if(response.status === 200){
            tokens = await data
        }
        else{ 
            return {response, data}}
    }


    const csrfToken = GetCookie('csrftoken')
   
    if(!fetchConfig['headers']){
        fetchConfig['headers'] = {}
    }

    //add csrf token and authorization access token to passed in fetch configuration headers
    if(csrfToken){
    fetchConfig['headers']['X-CSRFToken'] = csrfToken
    }
    fetchConfig['headers']['Authorization'] = 'Bearer ' + tokens.access
    
    if(!fetchConfig['headers']['Content-Type'] && !contentTypeOverRide){
        fetchConfig['headers']['Content-Type'] =  'application/json'
    }

    console.log(fetchConfig)
    //continue with request
    let response = await fetch(dataUrl, fetchConfig)
    console.log(response)
    let data = {}
    if(response.status === 204){
        data = {'status':'deleted'}
    }
    else{
         data = await response.json()
    }


    // return fetch response
    return {response, data}
}

export default CustomFetch;