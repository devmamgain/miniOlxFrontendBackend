# 🚀 MERN Stack Project

This is a full-stack web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.

---

## 📁 Project Structure

```
project-root/
│
├── MiniOlx/     # React (Vite / CRA)
├── marketplace-backend/      # Node.js + Express + MongoDB
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone (https://github.com/devmamgain/miniOlxFrontendBackend.git)
cd miniOlxFrontendBackend
```

---

## 🖥️ Frontend Setup

```bash
cd MiniOlx
npm install
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

## 🛠️ Backend Setup

```bash
cd marketplace-backend
npm install
npm run dev
```

Backend will run on:
```
http://localhost:5000
```

---

## 🔐 Environment Variables (Backend)

Create a `.env` file inside the `backend/` folder and add:

```
PORT=5000
DB_PASS=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

⚠️ Replace all values with your actual credentials.

---

## 🔗 API Base URL

```
http://localhost:5000/api
```

---

## 📦 Tech Stack

- Frontend: React, Vite, TailwindCSS 
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT 

---

## ▶️ Run Project (Both Servers)

Open two terminals:

### Terminal 1 (Backend)
```bash
cd marketplace-backend
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd MiniOlx
npm run dev
```

---

## 🧠 Notes

- Make sure MongoDB is running locally or use MongoDB Atlas.
- Ensure `.env` file is properly configured before running backend.
- CORS must be enabled for frontend-backend communication.

---

## 📄 License

This project is for educational / personal use.
