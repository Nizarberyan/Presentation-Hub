# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (React + Vite)                    │
│                    http://localhost:5173                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │  Login   │  │ Register │  │Dashboard │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Admin     │  │   Teacher    │  │   Student    │     │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │           React Context (Auth State)             │      │
│  └──────────────────────────────────────────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │      Axios API Client (JWT Interceptor)          │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ Proxy: /api → :3000
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Server (Express.js)                         │
│                  http://localhost:3000                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              Middleware Layer                     │      │
│  │  • CORS                                          │      │
│  │  • JSON Parser                                   │      │
│  │  • Cookie Parser                                 │      │
│  │  • Authentication (JWT)                          │      │
│  │  • Authorization (Role-based)                    │      │
│  └──────────────────────────────────────────────────┘      │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Auth     │  │   Users    │  │Presentations│           │
│  │  Routes    │  │  Routes    │  │   Routes   │           │
│  │            │  │            │  │            │           │
│  │ • register │  │ • GET all  │  │ • GET all  │           │
│  │ • login    │  │ • DELETE   │  │ • POST     │           │
│  └────────────┘  └────────────┘  │ • GET :id  │           │
│                                   │ • PUT :id  │           │
│                                   │ • DELETE   │           │
│                                   └────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              Mongoose Models                      │      │
│  │  • User (name, email, password, role)            │      │
│  │  • Presentation (titre, binome, date, status)    │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ MongoDB Driver
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  MongoDB Database                            │
│                mongodb://localhost:27017                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐              ┌──────────────┐            │
│  │    Users     │              │Presentations │            │
│  │  Collection  │              │  Collection  │            │
│  └──────────────┘              └──────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
1. User enters credentials in Login page
   ↓
2. React form submits to /api/auth/login
   ↓
3. Express validates credentials
   ↓
4. JWT token generated and returned
   ↓
5. Token stored in localStorage
   ↓
6. Axios interceptor adds token to all requests
   ↓
7. Protected routes verify token
   ↓
8. User redirected to dashboard
```

### Authorization Flow
```
Request → JWT Verify → Role Check → Route Handler
                ↓
            (if fails)
                ↓
            401/403 Error
```

### Data Operations
```
React Component
    ↓ (useEffect/onClick)
API Call (axios)
    ↓ (with JWT token)
Express Route
    ↓ (validate & authorize)
Mongoose Model
    ↓ (query)
MongoDB
    ↓ (response)
Express Route
    ↓ (JSON response)
React Component
    ↓ (setState)
UI Update
```

## Security Features

### Authentication
- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **Token Storage**: localStorage (client-side)
- **Token Transmission**: Authorization header

### Authorization
- **Role-Based Access Control (RBAC)**
  - Student: Read-only access
  - Teacher: Create presentations, read all
  - Admin: Full CRUD access

### Middleware Chain
```
Request
  ↓
CORS Check
  ↓
JSON Parser
  ↓
Cookie Parser
  ↓
Route Handler
  ↓
authenticate() middleware
  ↓
authorize(roles...) middleware
  ↓
Controller Logic
  ↓
Response
```

## API Structure

### Endpoints by Feature

**Public Endpoints**
- `GET /api/presentations` - List all presentations
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

**Protected Endpoints (JWT Required)**
- `GET /api/users` - List users (Teacher/Admin)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/presentations` - Create (Teacher/Admin)
- `PUT /api/presentations/:id` - Update (Teacher/Admin)
- `DELETE /api/presentations/:id` - Delete (Admin only)

## Technology Stack

### Frontend
```
React 18.3.1
├── react-router-dom 6.26.0
├── axios 1.13.2
├── TypeScript 5.9.3
└── Tailwind CSS 4.1.17

Build Tool: Vite 7.1.10
```

### Backend
```
Express.js 4.18.2
├── mongoose 8.19.3
├── jsonwebtoken 9.0.2
├── bcrypt 6.0.0
├── cors 2.8.5
└── dotenv 17.2.3

Runtime: Node.js (ES Modules)
```

### Database
```
MongoDB
└── Collections
    ├── users
    └── presentations
```

## Development Workflow

```
┌─────────────────┐
│  npm run dev    │
└────────┬────────┘
         │
         ├──────────────────┬──────────────────┐
         ▼                  ▼                  ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  Server  │      │  Client  │      │ MongoDB  │
   │ :3000    │◄────►│  :5173   │      │ :27017   │
   └──────────┘      └──────────┘      └──────────┘
         │                  │
         └─────────┬────────┘
                   ▼
            Development Mode
            - Hot reload
            - Source maps
            - Error overlay
```

## Deployment Architecture (Production)

```
                    ┌──────────────┐
                    │   Nginx      │
                    │  Reverse     │
                    │   Proxy      │
                    └───────┬──────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
        ┌──────────────┐        ┌──────────────┐
        │    Static    │        │   Express    │
        │    Files     │        │   API Server │
        │ (React Build)│        │   :3000      │
        └──────────────┘        └──────┬───────┘
                                       │
                                       ▼
                                ┌──────────────┐
                                │   MongoDB    │
                                │   Atlas      │
                                └──────────────┘
```

## File Organization

```
presentation-hub/
│
├── client/                    # Frontend application
│   ├── src/
│   │   ├── pages/            # Route components
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context providers
│   │   ├── api.ts           # API client configuration
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   ├── vite.config.ts       # Vite configuration
│   └── package.json         # Frontend dependencies
│
├── server/                   # Backend application
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── presentations.js
│   │   └── seed.js
│   ├── models/              # Database models
│   │   ├── User.ts
│   │   └── Presentation.js
│   ├── middleware/          # Express middleware
│   │   └── auth.js
│   └── index.js            # Express server
│
├── .env                     # Environment variables
├── .env.example            # Environment template
├── package.json            # Root dependencies
└── README.md              # Documentation
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure
- ✅ Security best practices
- ✅ Easy to maintain
- ✅ Production-ready

