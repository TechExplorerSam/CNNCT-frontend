# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)




### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# CNNCT-frontend

DEMO CREDENTIALS 
{
    "username":"michael_smith9071",
    "password":"Michael@2024"
} 
 if you want to create a new user just signup

FEATURES IMPLEMENTED
1. Landing Page
A public-facing landing page.
Ensure it is responsive for all devices.
2. Signup and Login Page
Signup:
Input fields for email, password, and username.
Basic validations (e.g., unique email, password strength).
Secure password hashing (e.g., using bcrypt).
Login:
Input fields for email and password.
Login authentication using JWT or session-based authentication.
3. Event & Meeting Management
Create & Manage Meetings
Users can schedule meetings.
Ability to edit, delete, activate, and deactivate meetings.
Users can view meeting schedules categorized as:
Upcoming Meetings
Pending Meetings
Canceled Meetings
4. Users can set their availability (like Calendly), specifying when they are available or unavailable & Conflict Handling
Users can configure availability settings for meetings and events.
Real-time conflict detection:
If an event is already scheduled for a time slot, the system prevents overlapping meetings.
Conflict alerts appear when a user tries to schedule an event at the same time as an existing one.
5. Event Creation & Customization
Events require essential details such as:
Event title, description, and date/time.
Manually added event link (Google Meet, Zoom, etc.).
Banner image and background color customization.
Password protection for events:
Users can set a password for an event.
Participants must enter the password to join.
6. Event Participation & Approval
Users can share event links with attendees.
6. Settings Page
Options for users to manage their account:
Update basic information (e.g., name, email, password).
On email and password updation the user should be logged out
7. Logout Feature
Provide a Logout button to securely end the user session.
8. Mobile Responsive Public Link Page
The public-facing sharable event/meeting page should
Be fully responsive, optimized for mobile viewing.
Use adaptive designs for different screen sizes.


Two display views

Add availability view: User can add there availability for the entire day
Calendar View: Similar to Google Calendar, showing all scheduled meetings.

