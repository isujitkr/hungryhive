# Food Delivery App - HungryHive

Welcome to the Food Delivery App built on the MERN stack! This project consists of three main folders: Admin, Frontend, and Backend.
Below you'll find a comprehensive guide on setting up, running, and understanding each component of the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible via a remote server.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isujitkr/hungryhive.git

2. Navigate to the project directory:
   ```bash
   cd food_delivery_mern
3. Set up environment variables in the .env file for MongoDB connection string , jwt key and Stripe API keys.
   ```bash
   MONGODB_URI=
   JWT_SECRET = 
   STRIPE_SECRET_KEY=
4. Install dependencies for frontend, backend and admin:
   ```bash
   cd client
   npm install

   cd ../server
   npm install

   cd ../admin
   npm install
   
5. Run both the client and server:
   ```bash
   # From the backend directory
   npm run server

   # From the frontend directory
   npm run dev
   
   # From the admin directory
   npm run dev

6. Access the application through the provided URL (typically http://localhost:5173)

   




