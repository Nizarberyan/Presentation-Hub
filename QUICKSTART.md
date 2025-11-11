# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env and add your MongoDB URI
```

### Step 3: Start Development
```bash
npm run dev
```

Visit http://localhost:5173

## 📊 Default Test Accounts

After running `npm run seed`:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Teacher | teacher@example.com | password123 |
| Student | student@example.com | password123 |

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start both client and server
npm run server       # Start server only (port 3000)
npm run client       # Start client only (port 5173)

# Database
npm run seed         # Seed database with test data

# Production
npm run build        # Build client for production

# Installation
npm run install:all  # Install all dependencies
```

## 📁 Project Structure

```
presentation-hub/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── context/    # React contexts
│   └── package.json
├── server/              # Express backend
│   ├── routes/         # API endpoints
│   ├── models/         # Mongoose models
│   └── middleware/     # Auth middleware
└── package.json        # Root package
```

## 🌐 URLs

- **Client**: http://localhost:5173
- **API**: http://localhost:3000/api
- **Server**: http://localhost:3000

## 🔑 Key Features by Role

### Admin
- View/delete all presentations
- View/delete all users
- Access to statistics
- Full CRUD operations

### Teacher
- Create presentations
- View all presentations
- Manage own content

### Student
- View presentations
- Read-only access

## 📚 Documentation

- `MIGRATION.md` - Complete migration guide
- `MIGRATION_SUMMARY.md` - What changed
- `CHECKLIST.md` - Post-migration tasks
- `README.md` - Full documentation

## 🐛 Common Issues

**MongoDB Connection Failed**
```bash
# Start MongoDB
sudo systemctl start mongodb
```

**Port Already in Use**
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9
```

**Module Not Found**
```bash
# Reinstall dependencies
npm run install:all
```

## 💡 Tips

1. Make sure MongoDB is running before starting the server
2. The client proxies API requests to port 3000
3. JWT tokens are stored in localStorage
4. Check the browser console for errors
5. Check the terminal for server errors

## 🎯 Next Steps

1. Update `.env` with your configuration
2. Run `npm run seed` to populate test data
3. Test all features with different roles
4. Read `CHECKLIST.md` for production deployment

---

Need help? Check the documentation files or the terminal output for errors.

