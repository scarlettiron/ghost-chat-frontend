import {ReactComponent as Fb} from '../assets/social-media-icons/facebook.svg'
import {ReactComponent as Insta} from '../assets/social-media-icons/instagram.svg'
import {ReactComponent as Tw} from '../assets/social-media-icons/twitter.svg'
import {ReactComponent as Tik} from '../assets/social-media-icons/tiktok.svg'

const getSocialIconSmall = (name) => {
    if(name === 'tiktok'){
        return <Tik className='svg-small' viewBox="0 0 48 48"/>
      }
      if(name === 'twitter'){
        return <Tw className='svg-small' viewBox="0 0 48 48"/>
      }
      if(name === 'instagram'){
        return <Insta className='svg-small' viewBox="0 0 48 48"/>
      }
      if(name === 'facebook'){
        return <Fb className='svg-small' viewBox="0 0 48 48"/>
      }
}

export default getSocialIconSmall