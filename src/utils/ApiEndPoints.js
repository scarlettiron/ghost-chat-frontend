
//const server = process.env.REACT_APP_SERVER_NAME
const server = 'http://localhost:8000/api/'

const tokenExp = 1000 * 60 * 4


const AuthUserUrls = {
    Login:{
        url:`${server}users/token/`,
        method:'POST'
    },
    RefreshToken:{
        url:`${server}users/token/refresh/`,
        method:'POST'  
    },
    Signup:{
        url:`${server}users/signup`,
        method:'POST'
    },


    passwordReset:{
        url : `${server}/auth/users/reset_password/`
    },
    passwordResetConfirm:{
        url: `${server}/auth/users/reset_password_confirm/`
    },
    passwordResetFail:{
        url : `${server}/`
    },
    passwordResetConfirmFail:{
        url : `${server}/`
    }

}

const UserUrls = {
    Search:{
        url:`${server}/users/`,
        method:'GET'
    }
}

const InboxUrls = {
    dashboard:{
        url:`${server}chat/dashboard`,
        method:'GET'
    },
    getMesssages:{
        url:`${server}chat/thread-messages/`,
        method:'GET',
        description:'requires thread pk to be included at end of url'
    },
    createMessage:{
        url:`${server}chat/thread-messages/`,
        method:'POST',
        description:'requires thread pk to be included at end of url'
    },
    createThread:{
        url:`${server}chat/create-thread`,
        method:'POST',
    }, 
    markAsRead:{
        url:`${server}chat/mark-read`,
        method:'PUT',
    }
}

const ChatUrls = {
    protocol:'http',
    socketUrl:{url:''},
    serverUrl:{url:''},
}

export {server, tokenExp, AuthUserUrls, InboxUrls, UserUrls, ChatUrls}