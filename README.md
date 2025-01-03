# LMS [Learning Management System]

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-orange)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## Overview

The **LMS (Learning Management System)** is a full-stack web application designed to streamline the process of learning and teaching. It provides secure user authentication, course management, role-based access control, and a seamless payment gateway for subscriptions.

---

## Features

- **User Authentication & Authorization**:
  - Secure login/logout functionality
  - Role-based access control (Admin & Student)
  - Password reset and profile management

- **Course Management**:
  - Admins can add, update, and remove courses
  - Students can view and subscribe to courses

- **Payment Gateway**:
  - Integrated Razorpay for secure course subscriptions

- **Content Upload**:
  - Courses can have lectures uploaded to the platform using Cloudinary

- **Email Notifications**:
  - SMTP integration for sending account-related emails

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Other Tools**: Cloudinary, Razorpay, Nodemailer

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KunalPusdekar/Coursify.git
   cd Coursify
   ```

2. Install dependencies for both the client and server:

   ```bash
   # Navigate to the client folder
   cd client
   npm install

   # Navigate to the server folder
   cd ../server
   npm install
   ```

3. Start the development server:

   ```bash
   # Start the frontend
   cd ../client
   npm start

   # Start the backend
   cd ../server
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the `server/` directory based on the `.env.example` file. Below are the required environment variables:

```env
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb://127.0.0.1:27017/lms

JWT_SECRET = <YOUR_LONG_JWT_SECRET>
JWT_EXPIRY = <JWT_EXPIRY>

CLOUDINARY_CLOUD_NAME = <YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY = <YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET = <YOUR_CLOUDINARY_API_SECRET>

SMTP_HOST = <YOUR_SMTP_HOST>
SMTP_PORT = <YOUR_SMTP_POST>
SMTP_USERNAME = <YOUR_SMTP_USERNAME>
SMTP_PASSWORD = <YOUR_SMTP_PASSWORD>
SMTP_FROM_EMAIL = <YOUR_SMTP_FROM_EMAIL>

RAZORPAY_KEY_ID = <YOUR_RAZORPAY_KEY>
RAZORPAY_SECRET = <YOUR_RAZORPAY_SECRET>
RAZORPAY_PLAN_ID = <YOUR_RAZORPAY_PLAN_ID>

FRONTEND_URL = <YOUR_FRONTEND_WEBSITE_URL>

CONTACT_US_EMAIL = <YOUR_CONTACT_US_EMAIL>
```

---

## Usage

1. **Start the Application**:
   - The frontend will be available at `http://localhost:3000`
   - The backend will run at `http://localhost:5000`

2. **Navigate the Platform**:
   - Create an account and log in
   - Explore available courses and subscribe
   - Admins can manage courses and users

---

## Screenshots

### 1. Landing Page
![Landing Page](https://via.placeholder.com/800x400.png?text=Landing+Page)

### 2. Course Dashboard
![Dashboard](https://via.placeholder.com/800x400.png?text=Dashboard)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any improvements or suggestions.

---

## Contact

For any questions or feedback, please email [CONTACT_US_EMAIL].
