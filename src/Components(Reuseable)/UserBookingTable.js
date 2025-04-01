import React, { useState, useEffect } from "react";
import UserTableStyles from "./Usertable.module.css";
import axios from "axios";
import Buttons from "./Buttons";
import { toast } from "react-toastify";

const UserBookingTable = ({ userId }) => {
  const [bookings, setBookings] = useState({
    upcoming: [],
    pending: [],
    cancelled: [],
    past: [],
  });

  const [participants, setParticipants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const token = localStorage.getItem("token");
  
  const fetchUserBookings = () => {
    axios
      .get(`https://cnnct-backend-oaje.onrender.com/user/bookings/getbookings/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Response Data:", response.data);
        setBookings({
          upcoming: response.data.Upcoming || [],
          pending: response.data.Pending || [],
          cancelled: response.data.Cancelled || [],
          past: response.data.Past || [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchParticipants = (Bookingname, booking) => {
    setSelectedBooking(booking);
    axios
      .get(`https://cnnct-backend-oaje.onrender.com/user/events/geteventparticipants/${Bookingname}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Participants Data got:", response.data);
  
        if (Array.isArray(response.data)) {
          setParticipants(response.data);
        } else {
          setParticipants([]);
          console.error("Unexpected response format:", response.data);
        }
  
        setShowPopup(true);
      })
      .catch((error) => {
        console.log("Error fetching participants:", error);
        setParticipants([]);
      });
  };

  const handleAcceptBooking = async () => {
    if (!selectedBooking) return;
    
    try {
      const bookingId = selectedBooking._id; 
      console.log("Accepting booking with ID:", bookingId);
  
      const response = await axios.put(
        `https://cnnct-backend-oaje.onrender.com/user/bookings/createabooking/${bookingId}`,
        { status: "Accepted" }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        toast.success("Booking accepted successfully!");
        fetchUserBookings();
        closeParticipantsPopup();
      } else {
        toast.error("Failed to accept booking.");
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Something went wrong.");
    }
  };
  
  const handleRejectBooking = async () => {
    if (!selectedBooking) return;
    
    try {
      const bookingId = selectedBooking._id; 
      console.log("Rejecting booking with ID:", bookingId);
  
      const response = await axios.delete(
        `https://cnnct-backend-oaje.onrender.com/user/bookings/accept/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        toast.success("Booking rejected successfully!");
        fetchUserBookings();
        closeParticipantsPopup();
      } else {
        toast.error("Failed to reject booking.");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      toast.error("Something went wrong.");
    }
  };

  const closeParticipantsPopup = () => {
    setShowPopup(false);
    setParticipants([]);
    setSelectedEventName('');
    setSelectedBooking(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className={UserTableStyles.booking_container}>
      <div className={UserTableStyles.tabs}>
        {["Upcoming", "Pending", "Cancelled", "Past"].map((category) => (
          <button
            key={category}
            className={
              activeTab === category.toLowerCase() ? UserTableStyles.activeTab : ""
            }
            onClick={() => setActiveTab(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={UserTableStyles.booking_list}>
        {bookings[activeTab]?.length > 0 ? (
          bookings[activeTab].map((booking) => (
            <div key={booking._id} className={UserTableStyles.booking_card}>
              <div className={UserTableStyles.booking_date_time}>
                <span className={UserTableStyles.date}>{formatDate(booking.Bookingdate)}</span>
                <span className={UserTableStyles.time}>{booking.BookingTimeDuration}</span>
              </div>
              <div className={UserTableStyles.booking_info}>
                <h4 className={UserTableStyles.event_name}>{booking.Bookingname}</h4>
                <p className={UserTableStyles.event_desc}>You and team {booking.BookingNumberOfPersons}</p>
              </div>
              <div className={UserTableStyles.booking_status}>
                <span className={`${UserTableStyles.status} ${UserTableStyles[booking.BookingStatus.toLowerCase()]}`}>
                  {booking.BookingStatus}
                </span>
                <span
                  className={UserTableStyles.people_count}
                  onClick={() => fetchParticipants(booking.Bookingname, booking)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.07 10.41C13.6774 9.56127 14.0041 8.54372 14.0041 7.50001C14.0041 6.45629 13.6774 5.43874 13.07 4.59001C13.6388 4.20254 14.3118 3.99681 15 4.00001C15.9283 4.00001 16.8185 4.36876 17.4749 5.02513C18.1313 5.68151 18.5 6.57175 18.5 7.50001C18.5 8.42826 18.1313 9.3185 17.4749 9.97488C16.8185 10.6313 15.9283 11 15 11C14.3118 11.0032 13.6388 10.7975 13.07 10.41ZM5.5 7.50001C5.5 6.80777 5.70527 6.13108 6.08986 5.55551C6.47444 4.97994 7.02107 4.53133 7.66061 4.26643C8.30015 4.00152 9.00388 3.93221 9.68282 4.06726C10.3617 4.20231 10.9854 4.53565 11.4749 5.02513C11.9644 5.51462 12.2977 6.13826 12.4327 6.81719C12.5678 7.49612 12.4985 8.19986 12.2336 8.8394C11.9687 9.47894 11.5201 10.0256 10.9445 10.4102C10.3689 10.7947 9.69223 11 9 11C8.07174 11 7.1815 10.6313 6.52513 9.97488C5.86875 9.3185 5.5 8.42826 5.5 7.50001ZM7.5 7.50001C7.5 7.79668 7.58797 8.08669 7.7528 8.33336C7.91762 8.58003 8.15189 8.77229 8.42597 8.88583C8.70006 8.99936 9.00166 9.02906 9.29264 8.97118C9.58361 8.91331 9.85088 8.77045 10.0607 8.56067C10.2704 8.35089 10.4133 8.08361 10.4712 7.79264C10.5291 7.50167 10.4994 7.20007 10.3858 6.92598C10.2723 6.65189 10.08 6.41762 9.83335 6.2528C9.58668 6.08798 9.29667 6.00001 9 6.00001C8.60218 6.00001 8.22064 6.15804 7.93934 6.43935C7.65804 6.72065 7.5 7.10218 7.5 7.50001ZM16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM14 17C13.86 16.22 12.67 15 9 15C5.33 15 4.07 16.31 4 17M15.95 13C16.5629 13.4767 17.064 14.0819 17.4182 14.7729C17.7723 15.4639 17.9709 16.2241 18 17V19H22V17C22 17 22 13.37 15.94 13H15.95Z" fill="#616161"/>
                  </svg>
                  {booking.BookingTotalCountOfPersons} People
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className={UserTableStyles.no_bookings}>No {activeTab} bookings found.</p>
        )}
      </div>

      {showPopup && (
        <div className={UserTableStyles.participants_display_popup}>
          <div className={UserTableStyles.participants_display_popup_content}>
            <h4>
              Participants ({participants.length})
              <span className={UserTableStyles.close_btn} onClick={closeParticipantsPopup}>✖</span>
            </h4>

            <div className={UserTableStyles.participant_list}>
              {participants.map((participant) => (
                <div key={participant.id} className={UserTableStyles.participant_item}>
                  <img src='Userprofile2.png' alt={participant.username} className={UserTableStyles.participant_img} />
                  <span>{participant.username}</span>
                  <input type="checkbox" />
                </div>
              ))}
            </div>

            <div className={UserTableStyles.button_container}>
              {selectedBooking?.BookingStatus === "Pending" && (
                <>
                  <Buttons 
                    buttontext="Reject" 
                    typeofstyle="btn_reject_button" 
                    buttonactionfunction={handleRejectBooking} 
                  />
                  <Buttons 
                    buttontext="Accept" 
                    typeofstyle="btn_accept_button" 
                    buttonactionfunction={handleAcceptBooking}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookingTable;