import React, { useState, useEffect } from 'react';
import Sidebar from '../Components(Reuseable)/Sidebar';
import Heading from '../Components(Reuseable)/Heading';
import './UserProfile.css';
import Buttons from '../Components(Reuseable)/Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [prevData, setPrevData] = useState({
    email: '',
    password: '',
  });
const navigate = useNavigate();
  const [hasEmailOrPasswordChanged, setHasEmailOrPasswordChanged] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://cnnct-backend-oaje.onrender.com/user/getUserDetails/${userId}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const { firstName, lastName, email } = response.data;
      setFormData({
        firstName,
        lastName,
        email,
        password: '',
        confirmPassword: ''
      });

      setPrevData({ email, password: '' });
      setHasEmailOrPasswordChanged(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email' || name === 'password' || name === 'confirmPassword') {
      setHasEmailOrPasswordChanged(true);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = formData;

    try {
      await axios.put(`https://cnnct-backend-oaje.onrender.com/user/update/${userId}`, { firstName, lastName }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (hasEmailOrPasswordChanged) {
        await updateEmailOrPassword();
      } else {
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  const updateEmailOrPassword = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const credentials = {
      email: formData.email !== prevData.email ? formData.email : undefined,
      password: formData.password.length > 0 ? formData.password : undefined
    };

    try {
      await axios.put(`https://cnnct-backend-oaje.onrender.com/user/updateemailpassowrdorboth/${userId}`, credentials, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      alert('Email and/or password updated successfully. You will be logged out.');
      
     

      setPrevData({ email: formData.email, password: formData.password });
      setFormData({ ...formData, password: '', confirmPassword: '' }); 
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/'); 
      setHasEmailOrPasswordChanged(false);
    } catch (error) {
      console.error(error);
      alert('Error updating email or password');
    }
  };

  return (
    <div>
      <Sidebar />
      <Heading heading1text={'Profile'} paragraph1text={'Manage settings for your profile'} />

      <div className='user_edit_profile_container'>
        <div className='user_edit_profile_name_container'>
          <h3>Edit Profile</h3>
        </div>

        <form className='user_edit_profile_details_form' onSubmit={updateUserDetails}>
          <div>
            <label>First Name</label>
            <input type='text' name='firstName' value={formData.firstName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
          </div>
          <Buttons buttontext='Save Profile' typeofstyle='btn_user_edit_profile_save' buttonactionfunction={updateUserDetails} />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
