# Jersey Shop Server

This is the backend server for the Jersey Shop web application. It handles user registration and login, product management, order processing, and notification services (Email, SMS, and WhatsApp).

## 🔧 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (for auth)
* Twilio (SMS and WhatsApp messaging)
* Resend (Email via API)
* Dotenv for environment configuration

---

## 📁 Folder Structure

```
server/
├── config/            # Database connection
├── controllers/       # Route logic (orders, users, products)
├── middleware/        # Auth middleware (JWT)
├── models/            # Mongoose models
├── routes/            # API route definitions
├── services/          # Messaging/email logic (WhatsApp, SMS, Email)
├── utils/             # Utility functions (if needed)
├── .env               # Environment variables
├── server.js          # App entry point
└── package.json
```

---

## 🛠️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/Morg3an/jersey-shop-server.git
cd jersey-shop-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth
TWILIO_PHONE_SMS=your_twilio_sms_number
TWILIO_PHONE_WHATSAPP=your_twilio_whatsapp_number
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
SHOP_EMAIL=your_email@gmail.com
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm run dev
```

---

## 🚀 API Endpoints

### Users

* `POST /api/users/register` - Register new user
* `POST /api/users/login` - Login and receive JWT token
* `GET /api/users/me` - Get current logged in user

### Products

* `POST /api/products/` - Add new product (Admin)
* `GET /api/products/` - List all products

### Orders

* `POST /api/orders/` - Place new order
* `GET /api/orders/` - List all orders (Admin)
* `GET /api/orders/me` - Get user’s own orders
* `PATCH /api/orders/:id/status` - Update status (Admin)
* `PATCH /api/orders/:id/cancel` - Cancel order (User)
* `DELETE /api/orders/:id` - Delete order (Admin only)

---

## ✉️ Notification Services

* WhatsApp using Twilio
* SMS using Twilio
* Email using Resend API

Each order triggers a message to the customer using all three channels.

---

## ✅ To Do

* Email notifocations to shop owner
* Rate limiting / throttling
* Add product image upload
* Frontend integration
* Deployment (Render / Railway)

---

## 📄 License

MIT License