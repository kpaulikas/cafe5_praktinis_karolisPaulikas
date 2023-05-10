GeekyGains Membership Management App

This app is designed for gym administrators to manage gym memberships for their clients.

The app considers the following member details:

- Name
- Surname
- Email
- Membership start date
- Membership end date

The app uses MongoDB for data storage and retrieval.

Installation
To install and run the app, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js if you haven't already.
3. In the project directory, run npm install to install the necessary dependencies.
4. Set up a MongoDB database and make note of the connection URI.
5. Update the .env file in the project directory and add the following environment variables:

PORT=your-desired-port
MONGODB_URI=your-mongodb-uri-here

6. Run the app with the command "npm run build".
   Open your web browser and navigate to http://localhost:your-port to access the app.

Usage

1. Add new members by clicking the "New Member" button in the header.
2. Click on the existing members in the member table to update or delete the member data.
