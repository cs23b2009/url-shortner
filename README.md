

# 🔗 URL Shortener (MERN + JWT)

A simple full-stack app to shorten URLs.  
✅ One free URL shortening without login  
🔐 Login/signup for unlimited usage  
📜 View your own shortened URL history after login

---

## 🚀 Live Demo

Coming soon...  
Frontend → Vercel  
Backend → Render or Railway  
Database → MongoDB Atlas

---

## 📦 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + ShadCN-UI  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (Mongoose)  
- **Auth**: JWT (JSON Web Tokens)  
- **Routing**: React Router DOM

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
````

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env  # Add your Mongo URI and JWT secret
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🗂 Folder Structure

```
url-shortener/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── vite.config.js
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── README.md
```

---

## 🔐 Authentication Flow

* JWT issued on login/signup
* Stored in `localStorage`
* Sent in `Authorization` header to backend
* Backend validates token using middleware

---

## ✨ Features

| Feature               | Login Required |
| --------------------- | -------------- |
| Shorten 1 URL         | ❌ No           |
| Login/Signup          | ✅ Yes          |
| Unlimited shorten     | ✅ Yes          |
| View URL history      | ✅ Yes          |
| Redirect by short URL | ❌ No           |

---

## 🌍 Deployment

| Platform         | Used For          |
| ---------------- | ----------------- |
| Vercel           | Frontend (React)  |
| Render / Railway | Backend (Express) |
| MongoDB Atlas    | Database          |

---

## 📌 .env.example (server)

```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

---

## 🔧 Extras to Add (Optional)

* [ ] Copy to clipboard button
* [ ] QR code generator
* [ ] Link expiration or deletion
* [ ] Click analytics
* [ ] Custom aliases (e.g., /myname)

---
