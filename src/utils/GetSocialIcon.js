import Twitter from '../components/social-icons/Twitter'
import Tiktok from '../components/social-icons/Tiktok'
import Facebook from '../components/social-icons/Facebook'
import Instagram from '../components/social-icons/Instagram'
import Youtube from '../components/social-icons/Youtube'

const getSocialIcon = (name) =>{
        if(name === 'tiktok'){
          return <Tiktok/>
        }
        if(name === 'twitter'){
          return <Twitter/>
        }
        if(name === 'instagram'){
          return <Instagram/>
        }
        if(name === 'facebook'){
          return <Facebook/>
        }
        if(name === 'youtube'){
          return <Youtube/>
        }
      }


export default getSocialIcon