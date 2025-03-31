import React, { useState, useEffect } from "react";
import Sidebar from "../Components(Reuseable)/Sidebar";
import Buttons from "../Components(Reuseable)/Buttons";
import UserAvailabiltySlotsStyles from "./UserAvailabiltySlots.module.css";
import Heading from "../Components(Reuseable)/Heading";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const UserAvailabiltySlots = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [typeofview, settypeofview] = useState("Availability");
  const [copied, setCopied] = useState(false);
  const [copiedIndexvalue, setCopiedIndexvalue] = useState(null);
  const [view, setView] = useState("week");
  const [events, setEvents] = useState([]);
  const showSuccessToast = () => {
    toast.success("Successfully saved!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Function to show error toast
  const showErrorToast = () => {
    toast.error("Failed to save!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };
  const [timeslots, setTimeslots] = useState({
    Sun: [{ start: "", end: "" }],
    Mon: [{ start: "", end: "" }],
    Tue: [{ start: "", end: "" }],
    Wed: [{ start: "", end: "" }],
    Thu: [{ start: "", end: "" }],
    Fri: [{ start: "", end: "" }],
    Sat: [{ start: "", end: "" }],
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const localizer = momentLocalizer(moment);

  // Helper function to parse time strings
  const parseTime = (timeStr) => {
    if (!timeStr) return [NaN, NaN];
    
    // Handle 24-hour format
    if (timeStr.includes(':')) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      if (!isNaN(hours)) {
        return [hours % 24, isNaN(minutes) ? 0 : minutes];
      }
    }
    
    // Handle AM/PM format
    const timeLower = timeStr.toLowerCase();
    const isPM = timeLower.includes('pm');
    const numStr = timeStr.replace(/[^0-9]/g, '');
    const num = parseInt(numStr, 10);
    
    if (isNaN(num)) return [NaN, NaN];
    
    let hours = num;
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    return [hours, 0];
  };

  // Fetch time slots from API
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/user/timeslotavailabilty/getuseravailabilitytimeslot/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const availabilityData = response.data.availability || [];

        const transformedData = availabilityData.reduce((acc, slot) => {
          const day = slot.UserAvaiabilityday.slice(0, 3);
          const [start, end] = slot.UserAvailabilityTimeSlot?.split("-").map(s => s.trim()) || ["", ""];

          if (!acc[day]) acc[day] = [];
          acc[day].push({ start, end });
          return acc;
        }, {});

        const defaultTimeslots = {
          Sun: [{ start: "", end: "" }],
          Mon: [{ start: "", end: "" }],
          Tue: [{ start: "", end: "" }],
          Wed: [{ start: "", end: "" }],
          Thu: [{ start: "", end: "" }],
          Fri: [{ start: "", end: "" }],
          Sat: [{ start: "", end: "" }],
        };

        setTimeslots(prev => ({ ...defaultTimeslots, ...prev, ...transformedData }));
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimeSlots();
  }, [userId, token]);

  // Convert timeslots to calendar events
  useEffect(() => {
    const timeSlotEvents = Object.entries(timeslots).flatMap(([day, slots]) => 
      slots
        .filter(slot => slot.start && slot.end)
        .map((slot, index) => {
          const dayIndex = days.findIndex(d => d === day);
          if (dayIndex === -1) return null;
          
          const now = new Date();
          const daysToAdd = (dayIndex - now.getDay() + 7) % 7;
          const slotDate = new Date(now);
          slotDate.setDate(now.getDate() + daysToAdd);
          
          const [startHour, startMinute] = parseTime(slot.start);
          const [endHour, endMinute] = parseTime(slot.end);
          
          if (isNaN(startHour) || isNaN(endHour)) return null;
          
          const startTime = new Date(slotDate);
          startTime.setHours(startHour, startMinute, 0);
          
          const endTime = new Date(slotDate);
          endTime.setHours(endHour, endMinute, 0);
          
          return {
            title: `${slot.start} - ${slot.end}`,
            start: startTime,
            end: endTime,
            resource: {
              day,
              index,
              isTimeSlot: true
            }
          };
        })
        .filter(Boolean)
    );

    setEvents(timeSlotEvents);
  }, [timeslots]);

  const updateTimeSlots = async () => {
    try {
      const daysMap = {
        Sun: "Sunday",
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
      };

      const backendFormattedSlots = Object.entries(timeslots)
        .flatMap(([day, slots]) =>
          slots
            .filter(slot => slot.start.trim() !== "" && slot.end.trim() !== "")
            .map(slot => ({
              user_id: userId,
              UserAvaiabilityday: daysMap[day] || day,
              UserAvailabilityTimeSlot: `${slot.start} - ${slot.end}`,
              UserAvailabilitydate: new Date().toISOString(),
              EventActivityType: "Meeting",
              TimeZone: "UTC+5:30",
            }))
        )
        .filter(slot => slot.UserAvaiabilityday !== "Sunday");

      if (backendFormattedSlots.length === 0) {
        toast.error("No valid time slots to update!");
        return;
      }

      const response = await axios.put(
        `http://localhost:9000/user/timeslotavailabilty/updateuseravailabilitytimeslot/${userId}`,
        backendFormattedSlots,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
       showSuccessToast();
      } else {
        showErrorToast();
        console.error("Error updating time slots:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating time slots:", error);
      toast.error("Error updating time slots!");
    }
  };

  const handleAddTimeSlot = (day) => {
    setTimeslots(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "", end: "" }],
    }));
  };

  const handleDeleteTimeSlot = (day, index) => {
    setTimeslots(prev => {
      const updatedSlots = { ...prev };
      updatedSlots[day] = updatedSlots[day].filter((_, i) => i !== index);
      return updatedSlots;
    });
  };

  const handleTimeChange = (day, index, field, value) => {
    setTimeslots(prev => {
      const updatedSlots = { ...prev };
      updatedSlots[day] = updatedSlots[day].map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );
      return updatedSlots;
    });
  };

  const handleSelectSlot = ({ start, end }) => {
    const day = moment(start).format('ddd');
    const timeString = `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`;
    
    // Check if this slot already exists
    const exists = timeslots[day]?.some(
      slot => `${slot.start} - ${slot.end}` === timeString
    );
    
    if (exists) {
      toast.info('This time slot already exists');
      return;
    }
    
    setTimeslots(prev => ({
      ...prev,
      [day]: [
        ...(prev[day] || []),
        {
          start: moment(start).format('h:mm A'),
          end: moment(end).format('h:mm A')
        }
      ]
    }));
  };

  const handleSelectEvent = (event) => {
    if (event.resource?.isTimeSlot) {
      const confirmDelete = window.confirm(
        `Delete this time slot: ${event.title}?`
      );
      
      if (confirmDelete) {
        const { day, index } = event.resource;
        handleDeleteTimeSlot(day, index);
      }
    } else {
      alert(`Event: ${event.title}`);
    }
  };

  const handleCopyToClipboard = async (day, index) => {
    const timeSlot = timeslots[day]?.[index];
    if (!timeSlot || !timeSlot.start || !timeSlot.end) {
      toast.error("Time slot is empty or not found!");
      return;
    }

    try {
      await navigator.clipboard.writeText(`${timeSlot.start} - ${timeSlot.end}`);
      setCopiedIndexvalue(index);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setCopiedIndexvalue(null);
      }, 2000);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.resource?.isTimeSlot ? "#3174ad" : "#6c757d",
      borderRadius: "4px",
      color: "white",
      border: "none",
      padding: "2px 5px",
      fontSize: "0.8em"
    }
  });

  return (
    <div>
      <Sidebar />
      <Heading
        heading1text={"Availability"}
        paragraph1text={"Configure times when you are available for bookings"}
      />
      
      <div className={UserAvailabiltySlotsStyles.view_toggle_container}>
        <button
          className={`${UserAvailabiltySlotsStyles.view_toggle} ${
            typeofview === "Availability" ? UserAvailabiltySlotsStyles.active : ""
          }`}
          onClick={() => settypeofview("Availability")}
        >
          Availability
        </button>
        <button
          className={`${UserAvailabiltySlotsStyles.view_toggle} ${
            typeofview === "Calendar View" ? UserAvailabiltySlotsStyles.active : ""
          }`}
          onClick={() => settypeofview("Calendar View")}
        >
          Calendar View
        </button>
      </div>

      {typeofview === "Availability" ? (
        <div className={UserAvailabiltySlotsStyles.user_availability_slots_container}>
          <div className={UserAvailabiltySlotsStyles.user_availability_slots_container_header}>
            <div className={UserAvailabiltySlotsStyles.header_item}>
              <label>Activity</label>
              <div className={UserAvailabiltySlotsStyles.slotsgroup}>
                <select>
                  <option value="">Event type</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Appointment">Appointment</option>
                </select>
              </div>

              <label>Time Zone</label>
              <div className={UserAvailabiltySlotsStyles.slotsgroup}>
                <select>
                  <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={UserAvailabiltySlotsStyles.user_time_day_slots}>
            {days.map((day, index) => (
              <div key={index} className={UserAvailabiltySlotsStyles.checkbox_container}>
                <input type="checkbox" defaultChecked={index === 0} disabled={index === 0} />
                <label>{day}</label>
                {index === 0 ? (
                  <p>Unavailable</p>
                ) : (
                  <>
                    <div className={UserAvailabiltySlotsStyles.time_slots_wrapper}>
                      {timeslots[day]?.map((time, timeindex) => (
                        <div key={`${day}-${timeindex}`} className={UserAvailabiltySlotsStyles.time_slot_pair}>
                          <input 
                            type="text" 
                            value={time.start}  
                            onChange={(e) => handleTimeChange(day, timeindex, "start", e.target.value)}
                            placeholder="Start time"
                          />
                          <span>-</span>
                          <input 
                            type="text" 
                            value={time.end}  
                            onChange={(e) => handleTimeChange(day, timeindex, "end", e.target.value)}
                            placeholder="End time"
                          />
                          <button 
                            className={UserAvailabiltySlotsStyles.icon_button}
                            onClick={() => handleDeleteTimeSlot(day, timeindex)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.64623 3.64665C3.73998 3.55302 3.86706 3.50043 3.99956 3.50043C4.13206 3.50043 4.25914 3.55302 4.35289 3.64665L12.3529 11.6467C12.402 11.6924 12.4414 11.7476 12.4687 11.809C12.4961 11.8703 12.5108 11.9365 12.512 12.0036C12.5131 12.0708 12.5008 12.1375 12.4756 12.1997C12.4505 12.262 12.4131 12.3185 12.3656 12.366C12.3181 12.4135 12.2615 12.4509 12.1993 12.4761C12.137 12.5012 12.0703 12.5136 12.0032 12.5124C11.9361 12.5112 11.8699 12.4965 11.8085 12.4692C11.7472 12.4418 11.692 12.4024 11.6462 12.3533L3.64623 4.35332C3.55259 4.25957 3.5 4.13249 3.5 3.99999C3.5 3.86749 3.55259 3.7404 3.64623 3.64665Z" fill="black" fillOpacity="0.5"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M12.3526 3.64665C12.4462 3.7404 12.4988 3.86749 12.4988 3.99999C12.4988 4.13249 12.4462 4.25957 12.3526 4.35332L4.35258 12.3533C4.2578 12.4416 4.13243 12.4897 4.0029 12.4874C3.87336 12.4852 3.74977 12.4327 3.65817 12.3411C3.56656 12.2495 3.51408 12.1259 3.5118 11.9963C3.50951 11.8668 3.55759 11.7414 3.64591 11.6467L11.6459 3.64665C11.7397 3.55302 11.8667 3.50043 11.9992 3.50043C12.1317 3.50043 12.2588 3.55302 12.3526 3.64665Z" fill="black" fillOpacity="0.5"/>
                            </svg>
                          </button>
                          <button 
                            className={UserAvailabiltySlotsStyles.icon_button}
                            onClick={() => handleAddTimeSlot(day)}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.5 12.5H6.50001C6.35801 12.5 6.23934 12.452 6.14401 12.356C6.04867 12.26 6.00067 12.141 6.00001 11.999C5.99934 11.857 6.04734 11.7383 6.14401 11.643C6.24067 11.5477 6.35934 11.5 6.50001 11.5H11.5V6.50001C11.5 6.35801 11.548 6.23934 11.644 6.14401C11.74 6.04867 11.859 6.00067 12.001 6.00001C12.143 5.99934 12.2617 6.04734 12.357 6.14401C12.4523 6.24067 12.5 6.35934 12.5 6.50001V11.5H17.5C17.642 11.5 17.7607 11.548 17.856 11.644C17.9513 11.74 17.9993 11.859 18 12.001C18.0007 12.143 17.9527 12.2617 17.856 12.357C17.7593 12.4523 17.6407 12.5 17.5 12.5H12.5V17.5C12.5 17.642 12.452 17.7607 12.356 17.856C12.26 17.9513 12.141 17.9993 11.999 18C11.857 18.0007 11.7383 17.9527 11.643 17.856C11.5477 17.7593 11.5 17.6407 11.5 17.5V12.5Z" fill="black" fillOpacity="0.55"/>
                            </svg>
                          </button>
                          <button 
                            className={UserAvailabiltySlotsStyles.icon_button}
                            onClick={() => handleCopyToClipboard(day, timeindex)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 5V14H5V5H14ZM14 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V14C4 14.2652 4.10536 14.5196 4.29289 14.7071C4.48043 14.8946 4.73478 15 5 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4Z" fill="black" fillOpacity="0.55"/>
                              <path d="M2 9H1V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H9V2H2V9Z" fill="black" fillOpacity="0.55"/>
                            </svg>          
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={UserAvailabiltySlotsStyles.calendar_wrapper}>
          <div className={UserAvailabiltySlotsStyles.calendar_header}>
            <div className={UserAvailabiltySlotsStyles.calendar_header_left}>
              <span className={UserAvailabiltySlotsStyles.header_title}>Activity</span>
              <select className={UserAvailabiltySlotsStyles.header_select}>
                <option>Event type</option>
                <option value="Meeting">Meeting</option>
                <option value="Appointment">Appointment</option>
              </select>
            </div>
            <div className={UserAvailabiltySlotsStyles.calendar_header_right}>
              <span className={UserAvailabiltySlotsStyles.header_title}>Time Zone</span>
              <select className={UserAvailabiltySlotsStyles.header_select}>
                <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
              </select>
            </div>
          </div>

          <div className={UserAvailabiltySlotsStyles.calendar_container}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView={view}
              views={["day", "week", "month"]}
              step={15}
              selectable={true}
              timeslots={4}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              onView={setView}
              style={{ height: "70vh" }}
              eventPropGetter={eventStyleGetter}
              components={{
                toolbar: (props) => (
                  <div className="rbc-toolbar">
                    <span className="rbc-btn-group">
                      <button
                        type="button"
                        onClick={() => props.onView('day')}
                        className={view === 'day' ? 'rbc-active' : ''}
                      >
                        Day
                      </button>
                      <button
                        type="button"
                        onClick={() => props.onView('week')}
                        className={view === 'week' ? 'rbc-active' : ''}
                      >
                        Week
                      </button>
                      <button
                        type="button"
                        onClick={() => props.onView('month')}
                        className={view === 'month' ? 'rbc-active' : ''}
                      >
                        Month
                      </button>
                    </span>
                    <span className="rbc-toolbar-label">{props.label}</span>
                  </div>
                ),
              }}
            />
          </div>
        </div>
      )}
      
      <div className={UserAvailabiltySlotsStyles.save_button_container}>
        <button 
          className={UserAvailabiltySlotsStyles.save_button}
          onClick={updateTimeSlots}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserAvailabiltySlots;