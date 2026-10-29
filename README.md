# 🌿 JungleMahal — Environmental Awareness Platform

**Protect the land. Empower the people.**

JungleMahal is a full-stack web application focused on environmental awareness and community participation in the Jungle Mahal region of West Bengal, India. It provides a platform for people to explore environmental issues, learn about conservation, and submit reports about environmental concerns.

> **Disclaimer:** JungleMahal is an environmental awareness project, not an official government complaint portal.

## ✨ Features

- 🌳 **Environmental Awareness:** Learn about environmental challenges and conservation.
- 📝 **Environmental Reporting:** Submit reports about issues such as deforestation and other environmental concerns.
- 📍 **Location Details:** Include district and location information in a report.
- 📷 **Supporting Photographs:** Select an optional image when preparing a report. Image upload and storage depend on the implemented backend functionality.
- 🔎 **Environmental Issues:** Browse submitted reports and explore reported concerns.
- 🔐 **Admin Authentication:** Secure admin login for authorized report management.
- 📊 **Admin Dashboard:** View reports and manage their status.
- 📱 **Responsive Interface:** Access the website from desktop and mobile devices.
- 🗄️ **MongoDB Integration:** Store and retrieve application data through the backend.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build tool | Vite |
| Styling | CSS |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs, HTTP-only cookies |
| API communication | Axios / Fetch |
| Frontend hosting | Vercel |
| Backend hosting | Vercel |
| Version control | Git and GitHub |

## 🌐 Live Demo

- **Website:** https://junglemahal-development.vercel.app
- **Backend API:** https://junglemahal-backend.vercel.app
- **API Health Check:** https://junglemahal-backend.vercel.app/api/health

## 📁 Project Structure

```text
JUNGAL_MAHAL_DEVELOPMENT/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Issues.jsx
│   │   │   └── Report.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

*The structure above summarizes the main folders and files; additional files may exist in the repository.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project locally:

- Node.js and npm
- Git
- A MongoDB database, such as MongoDB Atlas
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone https://github.com/rikichandra2002/junglemahal-development.git
cd junglemahal-development
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Configure the frontend

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

The local value assumes that the backend is running on port `5000`. For production, configure `VITE_API_URL` in the frontend hosting environment to point to the deployed backend.

### 4. Install backend dependencies

Open another terminal from the repository root:

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own configuration. Generate a bcrypt password hash for the admin password, and use a strong, randomly generated JWT secret.

**Security:** Never commit `.env` files, real credentials, database connection strings, or authentication secrets to GitHub.

### 5. Start the backend

From the `server/` directory:

```bash
npm run dev
```

If you prefer the production start script:

```bash
npm start
```

### 6. Start the frontend

From a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, usually:

http://localhost:5173

## 🔌 API Endpoints

The backend exposes the following primary endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/api/health` | Check server and database status |
| `/` | `/api/reports` | Environmental report operations |
| `/` | `/api/admin` | Admin authentication and management |

The report and admin route groups support operations according to the methods defined in their respective route files.

### Admin Authentication

The admin API includes these endpoints:

- `POST /api/admin/login` — Authenticate an administrator.
- `GET /api/admin/me` — Check the authenticated admin session.
- `POST /api/admin/logout` — Log out the administrator.

Admin authentication uses an HTTP-only cookie. Production cookie and CORS settings must be configured correctly for cross-origin requests.

## 🚀 Deployment

### Frontend

1. Import the GitHub repository into Vercel.
2. Configure the frontend project to use the `client` directory as its root directory.
3. Set the production environment variable:

   ```env
   VITE_API_URL=https://junglemahal-backend.vercel.app
   ```

4. Deploy the project and verify the production URL.

### Backend

1. Create a separate Vercel project for the backend using the same GitHub repository.
2. Configure the backend project root and entry point according to its deployment configuration.
3. Add the required environment variables in the backend project's Vercel settings.
4. Set `CLIENT_URL` to the exact production frontend origin.
5. Deploy and verify the health endpoint.

The backend deployment must use a Vercel-compatible serverless entry point. Ensure the project's routing configuration directs API requests to the Express application.

## 🔒 Security Considerations

- Keep credentials and private keys in environment variables.
- Use bcrypt to verify stored admin password hashes.
- Use HTTP-only cookies for the admin authentication token.
- Validate and sanitize incoming report data.
- Configure CORS to allow only trusted frontend origins.
- Use HTTPS for production traffic.
- Avoid including sensitive personal information in environmental reports.

## 🎯 Project Goals

JungleMahal aims to:

- Encourage environmental awareness and responsible community participation.
- Make it easier to document local environmental concerns.
- Provide a central place to explore reported issues.
- Support the management of submitted reports through an administrative interface.

## 🔮 Future Improvements

- Actual image upload and secure image storage.
- Interactive map-based reporting.
- Email notifications for report updates.
- Search, filtering, and analytics for environmental issues.
- Report status tracking for contributors.
- More educational resources about biodiversity and conservation.

## 👨‍💻 Author

**Ritwik Chandra**

GitHub: [@rikichandra2002](https://github.com/rikichandra2002)

## 📄 License

Choose and add a license before distributing this project for reuse. Until then, no open-source
