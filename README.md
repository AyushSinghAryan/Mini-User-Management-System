
````md
# 👤 User Management System

A full-stack **User Management System** built with the MERN stack, featuring secure authentication, role-based access control, and complete user lifecycle management.

---

## 📌 Project Overview

The **User Management System** is designed to handle user authentication, authorization, and administration in a secure and scalable way. It supports two roles: **Admin** and **User**, each with clearly defined permissions.

### ✨ Key Features
- 🔐 **Authentication** — Secure signup and login using JWT (JSON Web Tokens)
- 🛂 **Role-Based Access Control (RBAC)** — Admin vs User permissions
- 👥 **User Management** — Admins can view, activate, and deactivate users
- 🧑‍💼 **Profile Management** — Users can update profile and change passwords
- 🛡️ **Security** — Bcrypt password hashing, validation, Helmet security headers

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT, Bcrypt.js  
- **Validation:** Express Validator  
- **Security:** Helmet, CORS  
- **Testing:** Jest, Supertest, MongoDB Memory Server  

### Frontend
- **Framework:** React (Vite)  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM  
- **HTTP Client:** Axios  
- **State Management:** React Context API  
- **Notifications:** React Hot Toast  
- **Icons:** Lucide React  

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally.

### ✅ Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas URI)
- Git

---

### 📥 Clone the Repository
```bash
git clone [<repository_url>](https://github.com/AyushSinghAryan/Mini-User-Management-System)
````

---

### 🔙 Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
touch .env
```

3. Add environment variables (see below).

4. Start the backend server:

1. Navigate to the backend folder:

```bash
cd backend
```

```bash
npm install

```

```bash
npm start
```

Backend will run on:

```
http://localhost:5000
```

---

### 🎨 Frontend Setup

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in the **root (backend)** directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user_mgmt_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

> ⚠️ If you change the backend port, update the `baseURL` in
> `client/src/api/axios.js`

---

## 🚀 Deployment Guide

This project can be deployed on **Render**, **Vercel**, or **Heroku**.

### 🌐 Render Deployment

#### Backend

1. Connect GitHub repo to Render
2. Choose **Web Service**
3. Root Directory: `.`
4. Build Command:

```bash
npm install
```

5. Start Command:

```bash
npm start
```

6. Add environment variables in Render dashboard

#### Frontend

1. Choose **Static Site**
2. Root Directory: `client`
3. Build Command:

```bash
npm run build
```

4. Publish Directory:

```bash
dist
```

5. Update frontend API URL to deployed backend URL

---

## 📡 API Documentation

### 🔐 Authentication Routes

| Method | Endpoint             | Description        | Auth |
| ------ | -------------------- | ------------------ | ---- |
| POST   | `/api/auth/register` | Register new user  | ❌    |
| POST   | `/api/auth/login`    | Login & get token  | ❌    |
| GET    | `/api/auth/me`       | Get logged-in user | ✅    |

**Register Request Example**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 👤 User Routes

| Method | Endpoint                    | Description     | Auth |
| ------ | --------------------------- | --------------- | ---- |
| PUT    | `/api/users/updateprofile`  | Update profile  | ✅    |
| PUT    | `/api/users/updatepassword` | Change password | ✅    |

**Update Password Example**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

---

### 🛠️ Admin Routes

| Method | Endpoint                      | Description              | Auth      |
| ------ | ----------------------------- | ------------------------ | --------- |
| GET    | `/api/admin/users`            | Get all users            | ✅ (Admin) |
| PUT    | `/api/admin/users/:id/status` | Activate/Deactivate user | ✅ (Admin) |

**Get Users Response**

```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  },
  "data": []
}
```

---

## 🧪 Testing

Backend tests are written using **Jest** and **Supertest**.

Run tests with:

```bash
npm test
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

```


