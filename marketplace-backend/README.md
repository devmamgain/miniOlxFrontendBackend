# 🛠️ Used Goods Marketplace Backend

This is the backend service for a lightweight Used Goods Marketplace platform (similar to OLX/eBay). It provides APIs for authentication, listings, search, filtering, image handling, and pagination.

---

## 🚀 Features

- User authentication (JWT-based)
- Create / update / delete listings
- Multi-image upload support
- Advanced filtering (category, price, condition, location)
- Debounced search support
- Pagination & infinite scroll support
- Soft delete for sold items
- Input validation & sanitization
- RESTful API architecture

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB / MySQL
- Multer (file uploads)
- JWT Authentication
- dotenv

---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/marketplace-backend.git
cd marketplace-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=5000

DB_PASS=Link

JWT_SECRET=your_jwt_secret_key

NODE_ENV=development
```

---

### 4. Run the server

```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Listings

- GET /api/listings
- POST /api/listings
- GET /api/listings/:id
- PUT /api/listings/:id
- DELETE /api/listings/:id

---

## 🔎 Query Parameters

GET /api/listings?search=phone&category=electronics&page=1&limit=10

---

## 🧠 Architecture

- URL-based filtering
- Debounced search
- Pagination
- Soft delete
- Modular structure

---

## 📂 Folder Structure

src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── utils/
├── server.js

---

## 🧑‍💻 Author

Dev Mamgain
