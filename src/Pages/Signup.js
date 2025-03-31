import React, { useState ,useEffect} from 'react';
import Heading from '../Components(Reuseable)/Heading';
import './Signup.css'
import './CalenderStyle.css'
import axios from 'axios';
import Buttons from '../Components(Reuseable)/Buttons';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        preferences: [],
    });
const navigate = useNavigate();
    const [stageofsignup, setstateofsignup] = useState(1);

    const preferences = [
        { name: "Sales", icon: "🏢" },
        { name: "Education", icon: "📚" },
        { name: "Finance", icon: "💰" },
        { name: "Government & Politics", icon: "⚖️" },
        { name: "Consulting", icon: "💼" },
        { name: "Recruiting", icon: "📄" },
        { name: "Tech", icon: "🖥️" },
        { name: "Marketing", icon: "🚀" },
      ];
      const [selected, setSelected] = useState([]);
const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
  , []);
   
    const handlechange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePreferenceClick = (preference) => {
      setSelected((prevSelected) => {
        if (prevSelected.includes(preference)) {
          return prevSelected.filter((item) => item !== preference); 
        } else {
          return [...prevSelected, preference];
        }
      });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data", formData);
    };
const handlefirststageofsubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setstateofsignup(2);


}
const handleSecondStageSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
    setFormData({ ...formData, preferences: selected });
    setTimeout(() => {
      console.log("Form Data", formData);
      handlefinalsubmit(e);
    }
    , 3000);
    setstateofsignup(1);
}
const handlefinalsubmit = async (e) => {
  e.preventDefault();
  
  console.log("🚀 Submitting Final Signup Data...");
  console.log("📌 Form Data Before Submit:", formData);

  if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || selected.length === 0) {
      console.error("❌ Missing Required Fields!", formData);
      alert("Please fill all required fields before submitting.");
      return;
  }

  try {
      console.log("📤 Sending Data to Backend...");

      const response = await axios.post('http://localhost:9000/user/signup', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          preferences: selected, 
      });

      console.log("✅ Signup Successful:", response.data);
       localStorage.setItem('userId', response.data._id);
      navigate('/UserDashboard');
      
      setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          preferences: [],
      });

      setstateofsignup(1);
  } catch (error) {
      console.error("❌ Signup Error:", error);
      if (error.response) {
          console.error("⚠️ Backend Response Error:", error.response.data);
      } else if (error.request) {
          console.error("⚠️ No Response from Backend:", error.request);
      } else {
          console.error("⚠️ Axios Request Setup Error:", error.message);
      }
  }
};

    
    return (
        <div className='container'>
            <div style={{  top: '11px', left: '10px', right: '0', height: '80px', padding: '20px', display: 'flex', fontFamily: 'Plus Jakarta Sans', fontSize: '24px', color: '#000000', fontWeight: '900', gap: '5px' }}>
            <img src='logo_1.png' className='logo_1'></img>   <h4 style={{backgroundColor:'transparent'}}>CNNCT</h4>
            </div>

            {stageofsignup === 1 ? (
                <>
                    <img src='image_1.png' alt='' height={'100%'} width={'40%'} style={{ float: 'right', position: 'fixed', left: '60%', top: '0', marginTop: '0' }} />
                    <h1 className='h1_1'>
      
       Sign in to your Spark
    
       </h1>
                    <h2 className='h2_1'>
                        Create an account
                    </h2>
                    <a href='/' className='link_1'>Sign in instead</a>

                    <form onSubmit={handleSubmit} className='form'>
                        <label htmlFor="firstName" className='label'>Firstname:</label>
                        <input type="text" id="firstName" name="firstName" placeholder="First name" className='inputFields' value={formData.firstName} onChange={handlechange} /><br />

                        <label htmlFor="lastName" className='label'>Lastname:</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Last name" className='inputFields' value={formData.lastName} onChange={handlechange} /><br />

                        <label htmlFor="email" className='label'>Email:</label>
                        <input type="email" id="email" name="email" placeholder="Email" className='inputFields' value={formData.email} onChange={handlechange} /><br />

                        <label htmlFor="password" className='label'>Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" className='inputFields' value={formData.password} onChange={handlechange} /><br />

                        <label htmlFor="confirmPassword" className='label'>Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className='inputFields' value={formData.confirmPassword} onChange={handlechange} /><br />
                        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
  <input 
    type="checkbox" 
    style={{ 
      width: "19px", 
      height: "19px", 
      accentColor: "black", 
      marginRight: "10px", 
      marginLeft: "40px", 
      marginTop: "5px",
    }} 
  />
  <p style={{ fontSize: "20px", color: "#525252", marginTop: "15px", marginLeft: "10px" }}>
    By creating an account, I agree to our 
    <span style={{ display:'inline-block', textDecoration: "underline" }}> Terms of use   </span> <br></br>
    &nbsp;&nbsp;&nbsp;   and  <span style={{ textDecoration: "underline",display:'inline-block' }}>Privacy Policy</span>
  </p>
</div>
                        <input type="submit" value="Create an account" className='submitButton' onClick={handlefirststageofsubmit} />
                        <p className='p2' >
    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
    </p>
                    </form>
                </>
            ) : (
             
                <div className='stage2Container'>
                    <div> 
                    <img src='image_1.png' alt='' height={'100%'} width={'40%'} style={{ float: 'right', position: 'fixed', left: '60%', top: '0', marginTop: '0' }} />

<h2>Your Preferences</h2>
<br></br>
<br></br>
<input type='text' placeholder='Tell us your username' name='username' value={formData.username} className='inputFields2' onChange={handlechange}></input>
<p className='prefernce_p1'> Select one category  that best describes your CNNCT</p>
<div className="preferences-container">
<div className="preferences-container">
  {preferences.map((pref) => (
    <div
      key={pref.name}
      className={`preference-item ${selected.includes(pref.name) ? "selected" : ""}`} 
      onClick={() => handlePreferenceClick(pref.name)}
    >
      <span className="icon">{pref.icon}</span>
      <span>{pref.name}</span> 
    </div>
  ))}
</div>

    </div>             </div>
                     <Buttons buttontext={isMobile?"Sign in":"Continue"} typeofstyle="btn_primary_continue" buttonactionfunction={handleSecondStageSubmit} />          
                </div>
            )}
        </div>

    );
};

export default Signup;
