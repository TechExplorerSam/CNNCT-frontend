import React, { useState } from "react";
import axios from "axios";
import "./Card.css";

const EventCard = ({
  _id,
  EventTopic,
  description,
  date,
  time,
  duration,
  durationmeriadian,
  banner,
  link,
  timezone,
  startTime,
  endTime,
  Eventtype,
  attendees,
  isActive,
  Hostname,
  onDelete
}) => {
  const [isActivated, setIsActivated] = useState(isActive);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    EventTopic,
    description,
    date,
    time,
    duration
  });

  const token = localStorage.getItem("auth-token");

  const handleToggle = async () => {
    const newStatus = !isActivated;
    setIsActivated(newStatus);

    try {
      await axios.put(
        `https://cnnct-backend-oaje.onrender.com/user/events/updateanevent/${_id}`,
        { isActive: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Event status updated successfully");
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const enableEditing = () => setIsEditing(true);

  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const saveEdits = async () => {
    try {
      const response=await axios.put(
        `https://cnnct-backend-oaje.onrender.com/user/events/updateanevent/${_id}`,
        editedEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
    setEditedEvent(response.data);
    
      setIsEditing(false);
      console.log("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="card">
      <div className={`activity-bar ${isActivated ? "active" : "disabled"}`}></div>

      <div className="card-header">
        {isEditing ? (
          <input type="text" name="EventTopic" value={editedEvent.EventTopic} onChange={handleChange} />
        ) : (
          <h3 className="card-title">{EventTopic}</h3>
        )}

        <span className="edit-icon" onClick={isEditing ? saveEdits : enableEditing}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.799805 15.2H15.1998" stroke="#676B5F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 12V8.79999L12 0.799988L15.2 3.99999L7.2 12H4Z" stroke="#676B5F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.59961 3.19998L12.7996 6.39998" stroke="#676B5F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </span>
      </div>

      {isEditing ? (
        <textarea name="description" value={editedEvent.description} onChange={handleChange} />
      ) : (
        <p className="event-description">{description}</p>
      )}

      {isEditing ? (
        <input type="date" name="date" value={editedEvent.date} onChange={handleChange} />
      ) : (
        <p className="event-date"><strong>Date:</strong> {new Date(date).toDateString()}</p>
      )}

      {isEditing ? (
        <input type="text" name="time" value={editedEvent.time} onChange={handleChange} />
      ) : (
        <p className="event-time"><strong>Time:</strong> {startTime} - {endTime} {durationmeriadian}</p>
      )}

      {isEditing ? (
        <input type="number" name="duration" value={editedEvent.duration} onChange={handleChange} />
      ) : (
        <p className="event-duration"><strong>Duration:</strong> {duration} minutes</p>
      )}

      <p className="event-type"><strong>Type:</strong> {Eventtype}</p>

     


      <div className="card-footer-content">
        <label className="switch">
          <input type="checkbox" checked={isActivated} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>

        <span className="footer-icon" onClick={() => navigator.clipboard.writeText(link)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12_1193)">
<path d="M14.5775 15.1111H5.86634C5.72489 15.1111 5.58924 15.0549 5.48922 14.9549C5.3892 14.8549 5.33301 14.7192 5.33301 14.5778V5.86668C5.33301 5.72523 5.3892 5.58957 5.48922 5.48955C5.58924 5.38953 5.72489 5.33334 5.86634 5.33334H14.5775C14.7189 5.33334 14.8546 5.38953 14.9546 5.48955C15.0546 5.58957 15.1108 5.72523 15.1108 5.86668V14.5778C15.1108 14.7192 15.0546 14.8549 14.9546 14.9549C14.8546 15.0549 14.7189 15.1111 14.5775 15.1111Z" stroke="#676B5F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6664 5.33333V1.42222C10.6664 1.28077 10.6103 1.14511 10.5102 1.0451C10.4102 0.945076 10.2746 0.888885 10.1331 0.888885H1.42201C1.28056 0.888885 1.1449 0.945076 1.04488 1.0451C0.944862 1.14511 0.888672 1.28077 0.888672 1.42222V10.1333C0.888672 10.2748 0.944862 10.4104 1.04488 10.5105C1.1449 10.6105 1.28056 10.6667 1.42201 10.6667H5.33312" stroke="#676B5F" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_12_1193">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

        </span>
        <span className="footer-icon" onClick={() => onDelete(_id)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12_1187)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.56648 -0.000488281L6.22674 0.140237L4.94549 1.42149L4.80476 1.76123V2.88279H0.480469H0V3.84373H0.480469H1.92189L1.92195 14.894L2.40242 15.3745H12.9728L13.4532 14.894L13.4531 3.84373H14.8945H15.375V2.88279H14.8945H10.5704V1.76123L10.4296 1.42149L9.14841 0.140237L8.80867 -0.000488281H6.56648ZM9.60947 2.88279V1.96025L8.60965 0.960449H6.7655L5.7657 1.96025V2.88279H9.60947ZM4.80476 3.84373H2.88283L2.88289 14.4136H12.4923L12.4922 3.84373H10.5704H9.60947H5.7657H4.80476ZM6.72656 6.72654V7.20701V11.0508V11.5312H5.76562V11.0508V7.20701V6.72654H6.72656ZM9.60938 7.20701V6.72654H8.64844V7.20701V11.0508V11.5312H9.60938V11.0508V7.20701Z" fill="#676B5F"/>
</g>
<defs>
<clipPath id="clip0_12_1187">
<rect width="15.375" height="15.375" fill="white"/>
</clipPath>
</defs>
</svg>

        </span>
      </div>
    </div>
  );
};

export default EventCard;
