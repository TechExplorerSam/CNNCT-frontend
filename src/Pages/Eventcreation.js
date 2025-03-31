import React, { useState } from "react";
import Heading from "../Components(Reuseable)/Heading";
import Sidebar from "../Components(Reuseable)/Sidebar";
import TimezoneSelect from "react-timezone-select";
import "./Eventcreation.css";
import Buttons from "../Components(Reuseable)/Buttons";
import axios from "axios";

const Eventcreation = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  );
  const [stage, setStage] = useState(1);
  const [colorCode, setColorCode] = useState("#EF6500");
  const [bannerBackgroundColor, setBannerBackgroundColor] = useState("#342B26");

  // Form state
  const [eventData, setEventData] = useState({
    Eventtopic: "",
    password: "",
    description: "",
    Hostname: localStorage.getItem("username"),
    date: "",
    time: "",
    period: "AM",
    duration: "30 minutes",
    link: "",
    emails: "",
    bannerColor: colorCode,
    timezone: selectedTimezone,
  });

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFirstStageFormSubmission = (e) => {
    e.preventDefault();
    setStage(2);
  };

  const handleSecondStageFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post(
        "https://cnnct-backend-oaje.onrender.com/user/events/createanevent",
        {
          ...eventData,
          banner: {
            backgroundColour: colorCode,
          },
          timezone: selectedTimezone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Event Created Successfully:", response.data);
      alert("Event Created Successfully!");

      setEventData({
        Eventtopic: "",
        password: "",
        description: "",
        date: "",
        time: "",
        period: "AM",
        duration: "30 minutes",
        link: "",
        emails: "",
        banner: {backgroundColour: colorCode},
        timezone: selectedTimezone,
      });

      setStage(1);
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Failed to create event!");
    }
  };

  function setColor(color) {
    setColorCode(color);
    setBannerBackgroundColor(color);
  }

  return (
    <div>
      <Sidebar />
      <Heading heading1text={"Create Event"} paragraph1text={"Create events to share for people to book on your calendar."} />

      <div className="event_creation_container">
        <div className="event_creation_form_header">
          <h3>Add Events</h3>
        </div>

        {stage === 1 && (
          <form className="event_creation_form_container" onSubmit={handleFirstStageFormSubmission}>
            <div className="event_creation_input_group">
              <label>Event Topic <span>*</span></label>
              <input type="text" name="topic" value={eventData.topic} onChange={handleInputChange} placeholder="Set a conference topic" required />
            </div>

            <div className="event_creation_input_group">
              <label>Password</label>
              <input type="password" name="password" value={eventData.password} onChange={handleInputChange} placeholder="Password" />
            </div>

            <div className="event_creation_input_group">
              <label>Description</label>
              <textarea name="description" value={eventData.description} onChange={handleInputChange} placeholder="Add a description of the event" />
            </div>
            <div className="event_creation_input_group">
              <label>Hostname <span>*</span></label>
              <input type="text" name="topic" value={eventData.Hostname}  placeholder="" required readOnly/>
            </div>
            <div className="event_creation_form_container_date_time">
              <div className="event_creation_input_group">
                <label>Date and time <span>*</span></label>
                <input type="date" name="date" value={eventData.date} onChange={handleInputChange} required />
                <input type="time" name="time" value={eventData.time} onChange={handleInputChange} required />
                <select name="period" value={eventData.period} onChange={handleInputChange}>
                  <option>AM</option>
                  <option>PM</option>
                </select>
                <div className="time-zone-select">
                  <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
                </div>
              </div>

              <div className="event_creation_input_group">
                <label>Set Duration <span>*</span></label>
                <select name="duration" value={eventData.duration} onChange={handleInputChange}>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>3 hours</option>
                </select>
              </div>
            </div>

            <div className="event_creation_form_buttons">
              <Buttons buttontext={'Cancel'} typeofstyle={'cancel'} />
              <Buttons buttontext={'Next'} typeofstyle={'save'} buttonactionfunction={handleFirstStageFormSubmission} />
            </div>
          </form>
        )}

        {stage === 2 && (
          <form className="event_creation_form_container" onSubmit={handleSecondStageFormSubmission}>
            <div className="event_creation_input_group2">
              <label>Banner</label>
              <div className="banner_background_container" style={{ backgroundColor: bannerBackgroundColor }}>
                <div className="userprofileimage">
                  <img src="Userprofile.png" alt="Avatar" />
                </div>
              </div>

              <label>Custom Background Color</label>
              <div className="color_container">
                <div className="color_circle" style={{ backgroundColor: '#EF6500' }} onClick={() => setColor('#EF6500')}></div>
                <div className="color_circle" style={{ backgroundColor: "#FFFFFF" }} onClick={() => setColor('#FFFFFF')}></div>
                <div className="color_circle" style={{ backgroundColor: '#000000' }} onClick={() => setColor('#000000')}></div>
              </div>

              <div className="color_cube" style={{ backgroundColor: colorCode }}>
                <input type="text" value={colorCode} readOnly />
              </div>

              <div className="links_and_email_container">
                <div className="link_email_group">
                  <label>Add link <span>*</span></label>
                  <input type="text" name="link" value={eventData.link} onChange={handleInputChange} placeholder="Enter URL Here" required />
                </div>

                <div className="link_email_group">
                  <label>Add Emails <span>*</span></label>
                  <input type="text" name="emails" value={eventData.emails} onChange={handleInputChange} placeholder="Add member Emails" required />
                </div>
              </div>
            </div>

            <div className="event_creation_form_buttons">
              <Buttons buttontext={'Cancel'} typeofstyle={'cancel'} />
              <Buttons buttontext={'Create Event'} typeofstyle={'save'} buttonactionfunction={handleSecondStageFormSubmission} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Eventcreation;
