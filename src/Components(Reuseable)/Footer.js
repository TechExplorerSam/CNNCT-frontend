import React from 'react'
import Buttons from './Buttons'
import { Link, Navigate } from 'react-router-dom'
import FooterStyles from './Footer.module.css'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate=useNavigate();
  const loginbuttonfunction=()=>{
    navigate('/')
  }
  
  const handlenavigatetosignuppage=()=>{
    navigate('/signup')
  }
  return (
    <footer className={FooterStyles.footer}>
      <div className={FooterStyles.Buttons}>
   <Buttons buttontext="Log in" typeofstyle='btn_primary_login' buttonactionfunction={loginbuttonfunction} />
        <Buttons buttontext="Sign up free" typeofstyle='btn_primary_landing' buttonactionfunction={handlenavigatetosignuppage}/>
      </div>
     
       
        <div className={FooterStyles.footer_links}>
          <div className={FooterStyles.footer_links_column_1}>
<Link to='/' >About CNNCT</Link>
        <Link to='/'>Blog</Link>       
        <Link to='/'>Press</Link>    
        <Link to='/'>Social Good</Link>
        <Link to='/'>Contact </Link> 
          </div>
          <div className={FooterStyles.footer_links_column_2}>
        <Link to='/'>Careers</Link>
        <Link to='/'>Getting Started</Link> 
        <Link to='/'>Featuresand How-Tos</Link> 
        <Link to='/'>FAQs</Link>
        <Link to='/'>Report a Violation</Link>
        </div>
        <div className={FooterStyles.footer_links_column_3}>
          <Link to='/'>Terms and conditions</Link>
        <Link to='/'>Privacy Policy</Link>
        <Link to='/'>Cookie Notice</Link>
        <Link to='/'>TrustCenter</Link>
        </div>
        
        </div>
       <div className={FooterStyles.footer_social_media_icon}>
        <Link to='/'><img src='Twitter.png' alt=''></img></Link>
        <Link to='/'><img src='Insta.png' alt=''></img></Link>
        <Link to='/'><img src='Tiktok.png' alt=''></img></Link>
        <Link to='/'><img src='CNNCT.png' alt=''></img></Link>


       </div>
 
  <p className={FooterStyles.footer_acknowledgment}>
        We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri<br></br> people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
        </p> 




        
        
    </footer>
  )
}

export default Footer