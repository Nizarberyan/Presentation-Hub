# Presentation Hub

A presentation management system built with React, Express.js, and MongoDB.

## 🚀 Migration from SvelteKit to React + Express

This project has been migrated from SvelteKit to a React frontend with Express.js backend.

## 📁 Project Structure

```
presentation-hub/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── api.ts         # Axios API client
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── index.js          # Express server
└── package.json          # Root package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or remote instance
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm run install:all
   ```
   This will install dependencies for both root and client.

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=mongodb://localhost:27017/presentation-hub
   JWT_SECRET=your_secret_key_here
   PORT=3000
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   This runs both the Express server (port 3000) and React client (port 5173) concurrently.

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```
   This creates sample users and presentations:
   - Admin: admin@example.com / password123
   - Teacher: teacher@example.com / password123
   - Student: student@example.com / password123

## 🎯 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Role-Based Dashboards**:
  - Admin: Manage all presentations and users
  - Teacher: Create and manage presentations
  - Student: View presentations
- **Presentation Management**: CRUD operations for presentations
- **Responsive UI**: Built with Tailwind CSS

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Teacher/Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Presentations
- `GET /api/presentations` - Get all presentations
- `POST /api/presentations` - Create presentation (Teacher/Admin only)
- `GET /api/presentations/:id` - Get single presentation
- `PUT /api/presentations/:id` - Update presentation (Teacher/Admin only)
- `DELETE /api/presentations/:id` - Delete presentation (Admin only)

### Utility
- `POST /api/seed` - Seed database with sample data

## 🔧 Development

### Run server only
```bash
npm run server
```

### Run client only
```bash
npm run client
```

### Build for production
```bash
npm run build
```

## 🌐 Ports

- React Client: http://localhost:5173
- Express Server: http://localhost:3000
- API Base URL: http://localhost:3000/api

## 🔐 Authentication

The application uses JWT tokens stored in localStorage. The axios client automatically attaches the token to all API requests.

## 📦 Technologies Used

### Frontend
- React 18
- TypeScript
- React Router v6
- Axios
- Tailwind CSS 4
- Vite

### Backend
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## 🗂️ Old SvelteKit Files

The original SvelteKit files are still present in the `src/` directory. You can safely delete the following after confirming the migration works:

- `src/routes/` (SvelteKit routes)
- `src/lib/` (SvelteKit lib)
- `src/app.css`, `src/app.html`, `src/hooks.server.ts`
- `svelte.config.js`
- `vite.config.ts` (root)
- `tsconfig.json` (root)
- `tailwind.config.js` (root)
- `static/smui*.css` files

## 📝 Notes

- The React client proxies API requests to the Express server via Vite proxy
- CORS is configured to allow requests from http://localhost:5173
- Authentication state is managed via React Context
- All routes are protected based on user roles

## 🐛 Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string in `.env` is correct
2. **Port Already in Use**: Change the PORT in `.env` or kill the process using the port
3. **CORS Issues**: Verify the CORS origin in `server/index.js` matches your client URL
4. **Module Not Found**: Run `npm run install:all` to ensure all dependencies are installed

## 📄 License

MIT

