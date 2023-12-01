# message-board
Simple JS FireBase Message Board Project
- This application allows to post messages anonymously and display all previously posted messages
- Messages are displayed chronologically from most to least recent
- Just for fun I display messages in 2 ways, but in the final product we need to pick one way
- Only non-empty messages not exceeding 128 characters can be posted


## Pre-reqs
- Create a new Firebase Project in Google Portal https://console.firebase.google.com/ or get credentials how to connect to an existing project

## Technology Used
- Project is written using Javascript
- Data is stored in the Google Firebase in the Cloud
- Bootstrap library is used for styling

### Application Components
- index.html - main HTML file containing UI
- db.js - Google Firebase Database Configuration and initialization
- app.js - Application Logic to add a new message and display it, inlcuding storing and retrieving from the database
- app.css - CSS Styling

### Installation Instructions to run in Visual Studio Code
- Open Visual Studio
- Use git/clone command
- Copy Github project URL and paste it into the above command prompt
- Make sure that you see all files listed in this read.me
- Update db.js with Firebase database configuration info
- Open index.html and click F5 to run the project.  Select debugger-Webbapp (chrome)
