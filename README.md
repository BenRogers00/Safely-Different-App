# S2 - People As Solutions, Not Problems

S2 is a proof of concept, designed to streamline Health & Safety collaboration by consolidating the key features you need into one easy-to-use community driven platform. Whether you're posting about questions how to install a door, 
or going about DIY at home jobs, or planning to share your ideas with the community, S2 has you covered.
Main Technologies: JavaScript, React, Firebase

Note: This project is currently a proof of concept. Key features are being actively developed and refined.

# Getting Started
Follow these instructions to set up S2 on your local machine for development and testing purposes.

# Prerequisites
 - Node.js: Download and install from Node.js Official Site.
 - npm: Typically comes with Node.js. Verify installation with ```npm -v.```
 - Visual Studio Code: https://code.visualstudio.com/download [After downloading & installing Visual Studio Code] - Make sure to install TailwindCSS from VSC Extentions 
   
# Installation
1. Clone the repository: git clone [https://github.com/your-username/tripago.git](https://github.com/BenRogers00/Safely-Different-App.git)
2. Navigate to the project directory: cd Safely-Different-App/safely-different
3. Install dependancies: npm i
4. Create environmental variables: You'll need to create .env files for both the frontend and backend. See the Environment Variables section for more details.
5. Start the server with a split console window:
   ```bash
    - frontend: npm run dev
   ```
   ```bash
    - backend: npm run firebase
   ```
7. Access the app: Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

# :link: Navigation
As the navigation is full functional, you may use these direct links to access the respective pages:
```bash
 0. Home: http://localhost:3000
 1. Admin: http://localhost:3000/admin
 2. Login: http://localhost:3000/login
 3. Subscribe: http://localhost:3000/price
 4. About: http://localhost:3000/about%20us
 5. Make Post: http://localhost:3000/blogWriter
 6. View Posts: http://localhost:3000/blogPosts
 7. My Profile: http://localhost:3000/profile
 8. Template: http://localhost:3000/PDF%20template
 9. Sign Out: http://localhost:3000/signout
```
# :hammer_and_wrench: Built With
 - Next.js - Frontend framework for React-based apps.
 - Node.js - Backend runtime for JavaScript.
 - Express - Web framework for Node.js.
 - Firebase - Backend services for authentication and data storage.
 - Tailwind CSS - Utility-first CSS framework for styling.
 - QuillJS API - For textbox editor
 - Paypal API - For payment processing.

We are using external API services (Paypal, QuillJS, Firebase, etc.). In order for the pages to work you would need access keys. Please, create .env files
for both frontend and backend and populate them with the following:
.env are used to put sensitive data that you do not wish to make public, aka your API keys

# Environmental Variables
⚠️ Important: Ensure that the .env files are correctly set up before running the application to prevent any issues.
To run S2, you'll need to set up the following environment variables in .env files for both the frontend and backend.

Sign up to get your own API key: 
 - https://firebase.google.com/products/auth
 - https://quilljs.com/
 - https://developer.paypal.com/api/rest/
 - 




# 🚧 Features
### 🌐 International Payments
### 👌 User authentication
### 🚨 Making Posts
### 🖼️ Viewing Posts
### ⭐ Commenting on Posts
### 🪄 Uploading & Downloading PDF Templates
### 🖼️ Drawing on the existing posts & adding as comments
### 🖼️ Flexible & Many options to edit existing posts 
### 🖼️ Allowing the upload of images and existing video links
### 🔐 Logged in users are able to update their password


# 📧 Contact
### Project Link: https://github.com/BenRogers00/Safely-Different-App 
### Email:xdk9837@autuni.ac.nz (Ben) | yfp1726@autuni.ac.nz (Andrew) | ngd3273@autuni.ac.nz (Elena) 

# 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
