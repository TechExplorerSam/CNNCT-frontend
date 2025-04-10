import React, { useEffect } from 'react'

import { useState } from 'react';
import './Login.css'
import axios from 'axios';

// const  displayPassword=()=>{
//   const passwordInput=document.getElementById('password');
//   if(passwordInput.type==='password'){
//     passwordInput.type='text';
//   }
//   else{
//     passwordInput.type='password';
//   }
// }
const Login = () => {
const [logindata,setlogindata]=useState({
  username:'',
  password:''
})
const handlechange=(e)=>{
  setlogindata({...logindata,[e.target.name]:e.target.value})
}
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
const handleSubmit=(e)=>{
  e.preventDefault();
  const {username,password}=logindata;
  console.log(username,password);
  try{
    const response=axios.post('https://cnnct-backend-oaje.onrender.com/user/login', {  
      username: username,
      password: password
    })
    .then(response => {
      console.log(response.data);
      const token=response.data.token;
      console.log(token);
   const userId=   localStorage.setItem('userId', response.data._id);
     const username= localStorage.setItem('username', response.data.username);
     localStorage.setItem('token', token);
      console.log(token);
    const userstoredId=localStorage.getItem('userId')
      if (response.status === 200) {
        console.log('Login successful');
        window.location.href = `/UserDashboard`;
      } else {
        console.log('Login failed');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
}
  catch(error){
    console.error('Error:', error);
  }   

}

  return (
    <div>
      <div style={{position:'fixed',top:'12px',left:'10px',right:'0',height:'80px',backgroundColor:'#FFFFFF',padding:'20px',display:'flex',fontFamily:'Plus Jakarta Sans',fontSize:'24px',color:'#000000',fontWeight:'900',gap:'5px'}}>
        
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_9_587)">
<path d="M26.0402 26.056C27.6898 25.6432 28.9202 25.232 28.9202 25.232C29.299 25.0386 29.6158 24.7427 29.8348 24.3781C30.0537 24.0135 30.1659 23.5948 30.1586 23.1696V20.6944C29.5234 22.9432 28.0492 24.8624 26.0402 26.056ZM27.6898 18.6336L24.8098 17.3952V19.04C24.7272 19.7645 24.5027 20.4656 24.1491 21.1034C23.7955 21.7411 23.3198 22.3029 22.749 22.7568C23.1618 22.7568 23.1618 23.1696 23.1618 23.5824L22.749 24.4064L24.3986 25.232C27.6978 23.9936 28.5234 20.2832 28.9346 18.2208L27.6898 18.6336ZM16.5554 23.5824C16.0995 22.829 15.8175 21.9834 15.7298 21.1072V27.7056C15.7731 28.0186 15.9181 28.3087 16.1426 28.5312H17.3794C19.0901 28.4196 20.7666 28.0001 22.3282 27.2928C21.1513 27.1402 20.023 26.7282 19.0247 26.0866C18.0264 25.4449 17.183 24.5896 16.5554 23.5824ZM19.8546 15.3344C19.8336 15.7837 19.9808 16.2246 20.2674 16.5712C20.6786 16.5712 21.0914 16.5712 21.5042 15.7456C21.917 14.92 21.5042 14.096 20.6786 14.096C20.4467 14.2145 20.2491 14.3907 20.1048 14.6075C19.9605 14.8244 19.8743 15.0747 19.8546 15.3344ZM16.1426 12.8592V17.808C16.3732 16.1227 17.0225 14.5221 18.0312 13.1525C19.04 11.7829 20.3759 10.6881 21.917 9.96799L17.3794 11.2048C16.5554 11.2096 16.1426 12.0352 16.1426 12.8592ZM14.493 12.8592C14.437 12.103 14.6568 11.352 15.1119 10.7454C15.567 10.1388 16.2265 9.71771 16.9682 9.55999L27.277 7.08639L18.6178 3.78719H16.9682L5.421 6.26079C5.421 6.26079 4.1826 6.67359 4.1826 7.49759V8.31999L3.3586 9.97279V12.4464L2.533 12.8592V13.6848L3.3586 14.096V16.16L4.1826 17.3968V22.7584C4.1802 22.8675 4.19991 22.9759 4.24055 23.0772C4.28119 23.1784 4.34191 23.2704 4.41906 23.3475C4.49621 23.4247 4.58818 23.4854 4.68943 23.526C4.79069 23.5667 4.89912 23.5864 5.0082 23.584C5.8322 23.9952 11.1938 26.464 14.493 27.7072V12.8592ZM24.8034 12.8592L27.6834 14.096L28.509 13.6848C28.0069 13.055 27.5905 12.3615 27.2706 11.6224C26.5186 11.1648 25.6731 10.8826 24.797 10.7968L24.8034 12.8592ZM29.3394 8.31999L23.5666 9.55679C24.3644 9.34193 25.205 9.34325 26.0022 9.5606C26.7993 9.77795 27.5243 10.2035 28.1026 10.7936C28.5973 11.0985 29.0075 11.5227 29.2957 12.0272C29.5839 12.5318 29.7409 13.1006 29.7522 13.6816V8.31999C29.7522 7.91039 29.3394 7.91039 29.3394 8.31999ZM31.2178 6.23999C30.9142 5.93335 30.5228 5.7287 30.0978 5.65439L19.5106 1.58559C19.0672 1.34378 18.5717 1.21322 18.0667 1.20514C17.5617 1.19706 17.0623 1.31169 16.6114 1.53919C14.9938 1.94399 5.1874 3.98879 5.0194 4.02719C4.21519 4.19228 3.49087 4.62553 2.96504 5.25601C2.43921 5.88648 2.14303 6.67682 2.125 7.49759V7.76639L1.365 9.27999L1.309 11.2416L0.483398 11.6544V14.7632L0.894598 15.176V16.7568L1.7202 17.9936V22.7568C1.73505 23.4115 1.93822 24.0481 2.3054 24.5903C2.67257 25.1326 3.18821 25.5575 3.7906 25.8144C4.3186 25.9904 6.7698 27.0352 9.1394 28.0448C14.997 30.5408 15.6578 30.7952 15.9442 30.7952H16.7698L17.6946 30.7856C19.2818 30.5216 23.2402 29.2992 26.133 28.4064C27.5282 27.9744 28.9714 27.5296 29.141 27.4976L29.4162 27.4304C30.2582 27.0839 30.9767 26.4924 31.4785 25.7327C31.9803 24.973 32.2424 24.08 32.2306 23.1696V8.73599C32.2794 8.2688 32.2126 7.79676 32.036 7.36149C31.8593 6.92622 31.5784 6.54108 31.2178 6.23999ZM30.9922 23.1712C30.9992 23.8365 30.8076 24.4887 30.4419 25.0445C30.0763 25.6003 29.5531 26.0343 28.9394 26.2912C28.6194 26.3536 27.9042 26.5696 25.7618 27.232C22.9042 28.1136 18.989 29.3232 17.5858 29.5648L16.0354 29.576C15.621 29.4752 12.149 27.9952 9.6146 26.9152C7.0034 25.7952 4.7474 24.8352 4.2514 24.6752C3.87634 24.5084 3.55519 24.2404 3.324 23.9013C3.09281 23.5621 2.96074 23.1652 2.9426 22.7552V17.6224L2.117 16.3856V14.6672L1.7058 14.2544V12.4144L2.5298 12V9.70559L3.2898 8.18559L3.3554 7.49759C3.3554 7.09759 3.3554 5.87839 5.3394 5.21279C5.7442 5.12959 15.269 3.14399 17.0354 2.68639C17.3413 2.52566 17.6825 2.44369 18.028 2.44788C18.3736 2.45207 18.7127 2.54229 19.0146 2.71039L29.7346 6.83519L29.9554 6.87679C30.1036 6.91864 30.2382 6.99864 30.3458 7.10879C30.5902 7.29632 30.7789 7.54688 30.8917 7.83356C31.0044 8.12024 31.037 8.43222 30.9858 8.73599L30.9922 23.1712Z" fill="#1877F2"/>
</g>
<defs>
<clipPath id="clip0_9_587">
<rect width="32" height="32" fill="white" transform="translate(0.349121)"/>
</clipPath>
</defs>
</svg>
CNNCT

      </div>
    <div className='login-container' >
       <h1 >
       Sign in      </h1>
       <h1>
      
       Sign in to your Spark
    
       </h1>
       
        <br></br>
        <br></br>
                    {/* <span class="password-toggle-icon"><i class="fas fa-eye"></i></span> */}
                    <form onSubmit={handleSubmit}>
                      <label for='username'>Username:</label>
                    <br></br>
                    <input type='text' placeholder={isMobile?'':'Username'} name='username' className='input-fields' value={logindata.username} onChange={handlechange}>
        </input><br></br><br></br>
        <label for='username'>Password:</label>
                    <br></br>
                    
        <input type='password' placeholder={isMobile?'':'Password'} name='password' value={logindata.password} className='input-fields'onChange={handlechange}>
        
        </input>
        <br></br><br></br><br></br><br></br><br></br>
       

                    </form>
          
        <button className='button_log_in' onClick={handleSubmit}>
          {isMobile?'Sign in':'Log in'}
        </button>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <p  className='inline-text'>
    Don’t have an account?
    </p>  
     <a href='/signup' style={{textDecoration:'underline',color:'#1877F2',fontSize:'17px'}}>Sign Up</a>
        <br></br>
        <br></br>
         
        <img src='image_1.png' alt='' height={'100%'} width={'40%'} style={{float:'right',position:'fixed',left:'60%',top:'0',marginTop:'0'}}></img>

    </div>
    <div className='p-contianer'>
       <p className='p2' >
    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
    </p>
    </div>
   
    </div>
  )
}

export default Login