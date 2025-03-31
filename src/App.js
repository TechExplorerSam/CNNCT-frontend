import React from 'react';
import {BrowserRouter,Route,Routes }from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LandingPage from './Pages/LandingPage';
import UserDashboard from './Pages/UserDashboard';
import UserBookings from './Pages/UserBookings';
import UserAvailabiltySlots from './Pages/UserAvailabiltySlots';
import Eventcreation from './Pages/Eventcreation';
import UserProfile from './Pages/UserProfile';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/UserBookings' element={<UserBookings/>}/>
      <Route path='/UserEventCreation' element={<Eventcreation/>}/>
      <Route path='/LandingPage' element={<LandingPage/>}/>
      <Route path='/UserProfile' element={<UserProfile/>}/>
      <Route path='/UserAvailability' element={<UserAvailabiltySlots/>} />
      <Route path='/Home' element={<LandingPage />} />
      <Route path='/UserDashboard' element={<UserDashboard/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
