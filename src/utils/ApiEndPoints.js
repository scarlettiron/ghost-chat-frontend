
//const server = process.env.REACT_APP_SERVER_NAME
const server = 'https://twisted-plan-beta-production.up.railway.app/api/'

const taxApi = "https://sales-tax-calculator.p.rapidapi.com/rates"

const loginRefreshUrl = `${server}users/token/refresh/`
const loginUrl = `${server}users/token/`
const tokenExp = 1000 * 60 * 4
const signupUrl = `${server}users/signup/`

const infoUrl = `${server}socials/supported-socials/`

const authUserUrls = {
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

const checkoutUrls = {
    CreateStripePaymentSecret:{
        url:`${server}checkout/create-intent/`,
        method:'POST'
    },
    UpdatePaymentMethod:{
        url:`${server}checkout/update-payment-method/`,
        method:'POST',
        success:201
    }
}

const subscriptionPlans = {
    //For changing a users subscription plan
    //add the id of the plan you want to upgrade to 
    //the end of the url
    UpdatePlan:{
        url:`${server}checkout/change-plan/`,
        method:'PUT',
        success:200
    },
    CancelPlan:{
        url:`${server}checkout/cancel-subscription/`,
        method:'DELETE',
        success:200
    }
}



const searchUrls = {
    complex:{
    url: `${server}search/complex/`,
    methods:['GET']
    }
}

const staffUrls = {
    createContactRequest:{
        url:`${server}staff/create-contact-request/`,
        methods:['POST']
    }
}


const userProfileUrls = {
    getUserProfile:{
        url:`${server}users/user-profile/`
    },
    updateUserProfile:{
        url: `${server}users/user-profile/`
    }
}

const postUrls = {
    schedulePost:{
        url:`${server}posts/schedule-list/`,
        success:201
    },
    postDetailUrl : {
        url : `${server}posts/schedule-detail/`
    },
    futurePostsUrl : {
        url: `${server}posts/schedule-list/?range=future`
    },
    pastPostsUrl : {
        url : `${server}posts/schedule-list/?range=past`
    }, 

    subPostDetail : {
        url: `${server}posts/subpost-detail/`
    }
}

const socialPlatformUrls = {
    addSocial:{
        url:`${server}socials/add-social/`,
    },
    deleteSocial:{
        url:`${server}socials/delete-social/`,
    },
    refreshSocial:{
        url:`${server}socials/refresh/`,
    }

}

export {server, infoUrl, loginRefreshUrl,signupUrl,  userProfileUrls, socialPlatformUrls, checkoutUrls, searchUrls, 
    taxApi, staffUrls, postUrls, loginUrl, tokenExp, authUserUrls, subscriptionPlans}