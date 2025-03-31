import React, { useState, useEffect } from 'react';
import Sidebar from '../Components(Reuseable)/Sidebar';
import Heading from '../Components(Reuseable)/Heading';
import EventCard from '../Components(Reuseable)/EventCard';
import UserDashboardStyles from './Userdashboard.module.css';
import Buttons from '../Components(Reuseable)/Buttons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
   
  ]);
  const [hostname, setHostname] = useState('');

  const token = localStorage.getItem('token');
  console.log(token);
  const userId = localStorage.getItem('userId');

 

  useEffect(() => {
    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]); 

  const fetchUser = async () => {
    try {
      console.log(`Fetching user details for user ID: ${userId}`);
      const response = await axios.get(`https://cnnct-backend-oaje.onrender.com/user/getUserDetails/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setHostname(response.data.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (hostname) {
      console.log(`Fetching events for user: ${hostname}`);
      fetchUserEvents();
    }
  }, [hostname]); 
const currentUser=localStorage.setItem("user",JSON.stringify(hostname))
  const fetchUserEvents = async () => {
    try {
      const response = await axios.get(`https://cnnct-backend-oaje.onrender.com/user/events/getanevent/${hostname}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const NavigatetoCreateEvent = () => {
    navigate('/UserEventCreation');
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://cnnct-backend-oaje.onrender.com/user/events/deleteanevent/${eventId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <Sidebar   />
      <Heading heading1text="Event types" paragraph1text="Create events to share for people to book on your calendar." />
      <div className={UserDashboardStyles.user_dashboard_events_container}>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} {...event} onDelete={handleDelete} />
          ))
        ) : (
          <p>No events found. Create a new event to get started!</p>
        )}
      </div>
      <Buttons
        buttontext='Add New Event'
        typeofstyle='btn_userdashboard_add_new_events'
        buttonactionfunction={NavigatetoCreateEvent}
      />
    </div>
  );
};

export default UserDashboard;
