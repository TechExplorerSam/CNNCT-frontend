import React, { useState,useEffect} from "react";
import Sidebar from "../Components(Reuseable)/Sidebar";
import Heading from "../Components(Reuseable)/Heading";
import UserBookingTable from "../Components(Reuseable)/UserBookingTable";
import Buttons from "../Components(Reuseable)/Buttons";
import "./Userbooking.css";
import axios from "axios";

const UserBookings = () => {
  const [showPopup, setShowPopup] = useState(true);
  const userId=localStorage.getItem("userId");

  

  return (
    <div>
      <Sidebar />
      <Heading
        heading1text="Booking"
        paragraph1text="See upcoming and past events booked through your event type links."
      />
      <UserBookingTable  userId={userId}/>

     
     
    </div>
  );
};

export default UserBookings;
