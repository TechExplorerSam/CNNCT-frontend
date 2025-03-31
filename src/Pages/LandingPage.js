import React from 'react'
import Header from '../Components(Reuseable)/Header'
import Landingpagestyles from './Landingpage.module.css'
import Buttons from '../Components(Reuseable)/Buttons'
import { useEffect,useState } from 'react'
import Footer from '../Components(Reuseable)/Footer'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {
const navigate=useNavigate();
const handlenavigatetosignuppage=()=>{
  navigate('/signup')
}
  return (
    <div className={Landingpagestyles.landing_page_grid_container}>
        <Header />
        
          <h1 className={Landingpagestyles.landing_page_heading}>
          CNNCT – Easy <br></br>
          Scheduling Ahead
          </h1>
          <Buttons buttontext={(window.innerWidth<600)?"Join now":"Sign Up free"} typeofstyle="btn_primary_public2" buttonactionfunction={handlenavigatetosignuppage}/>
          
        <img src='screen_1.png'alt='' className={Landingpagestyles.landing_page_image_1} ></img> 
        <h2>
        Simplified scheduling for you and your team
        </h2>
        <p >
        CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link,<br></br> <br></br><span> and let others book time with you instantly.</span> 
        </p>
        
          <img alt='' src='Fantastical 1.png' className={Landingpagestyles.landing_page_image_2}>
          </img>
          
          <img src='screen_3.png' alt='' className={Landingpagestyles.landing_page_image_3}>
          </img>
          <h3>
       Stay Organized with Your<br>
       </br> Calendar & Meetings        </h3>
          <p > 
          Seamless Event Scheduling

  </p>
   
          <ul>
           <li>
           View all your upcoming meetings and appointments in one place.

           </li>
           <br></br>
           <br></br>
           <li>
           Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts

           </li>
           <br></br>
            <br></br>
           <li>
           Customize event types: one-on-ones, team meetings, group<br></br> <br></br>sessions, and webinars.

           </li>
           
          </ul>
   
<img src='Frame_1.png' className={Landingpagestyles.landing_page_image_4} alt=''>
           </img>
           <img src='testimonials.png' className={Landingpagestyles.landing_page_image_5} alt=''>
           </img>
        
           <h2>
           All Link Apps and Integrations
        </h2>
        <img src='Frame.png' className={Landingpagestyles.landing_page_image_6}>
        </img>
                <br></br>
                <br></br>
                
        
        <Footer />
        
    </div>
  )
}

export default LandingPage