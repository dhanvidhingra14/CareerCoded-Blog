# CareerCoded Blog Management Platform

A Full Stack Blog Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

This project allows users to register, login, create blogs, view blogs, update blogs, delete blogs, and like blogs.

---

# Features

## User Features

- User Registration
- User Login
- JWT Authentication
- View All Blogs
- Like Blogs

## Admin Features

- Create Blog
- Update Blog
- Delete Blog
- Manage Blogs

---

# Tech Stack

## Frontend

- React.js
- Axios
- CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas

## Authentication

- JWT Authentication
- bcryptjs Password Hashing

---

# API Endpoints

## Authentication APIs

### Register User

POST `/api/auth/register`

### Login User

POST `/api/auth/login`

---

## Blog APIs

### Get All Blogs

GET `/api/blogs`

### Get Single Blog

GET `/api/blogs/:id`

### Create Blog

POST `/api/blogs`

### Update Blog

PUT `/api/blogs/:id`

### Delete Blog

DELETE `/api/blogs/:id`

### Like Blog

PUT `/api/blogs/:id/like`

### Unlike Blog

PUT `/api/blogs/:id/unlike`

---

# Project Structure

```bash
CareerCoded-Blog
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── middleware
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md

---

# Installation Steps

## Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5175
```

---

# Environment Variables

Create a `.env` file inside the server folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Main Functionalities

- Authentication System
- Blog CRUD Operations
- Like/Unlike Feature
- Responsive UI
- REST API Integration
- MongoDB Database Integration

---

# Future Improvements

- Admin Dashboard
- Search Blogs
- Filter Blogs
- Comments System
- Dark Mode
- Cloudinary Image Upload

---

# Author

Dhanvi Dhingra

---

# Internship Assignment

This project was developed as part of the CareerCoded Internship Assignment Test.