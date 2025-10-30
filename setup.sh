#!/bin/bash


# ============================================
# BACKEND STRUCTURE
# ============================================
mkdir -p backend/src/{controllers,models,routes,middleware,config,types}

# Create backend files
touch backend/src/server.ts
touch backend/src/controllers/{presentationController.ts,authController.ts}
touch backend/src/models/{Presentation.ts,User.ts}
touch backend/src/routes/{presentations.ts,auth.ts}
touch backend/src/middleware/{auth.ts,validation.ts}
touch backend/src/config/database.ts
touch backend/src/types/index.ts
touch backend/{package.json,tsconfig.json,.env,.gitignore}

# ============================================
# FRONTEND STRUCTURE
# ============================================
mkdir -p frontend/src/lib/{components,stores,services,types}
mkdir -p frontend/src/routes/{submit,teacher,login}
mkdir -p frontend/static

# Create frontend files
touch frontend/src/lib/components/{PresentationList.svelte,PresentationForm.svelte,PresentationCard.svelte,TeacherPanel.svelte,GradeModal.svelte,Header.svelte}
touch frontend/src/lib/stores/{presentations.ts,auth.ts}
touch frontend/src/lib/services/api.ts
touch frontend/src/lib/types/index.ts
touch frontend/src/routes/{+page.svelte,+layout.svelte}
touch frontend/src/routes/submit/+page.svelte
touch frontend/src/routes/teacher/+page.svelte
touch frontend/src/routes/login/+page.svelte
touch frontend/src/{app.html,app.css}
touch frontend/{svelte.config.js,vite.config.ts,package.json,tsconfig.json,.env,.gitignore}

# ============================================
# SHARED TYPES
# ============================================
mkdir -p shared/types
touch shared/types/index.ts

# ============================================
# ROOT FILES
# ============================================
touch {README.md,.gitignore,docker-compose.yml}

echo "✅ Project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. cd presentation-manager"
echo "2. Initialize backend: cd backend && bun install"
echo "3. Initialize frontend: cd ../frontend && bun install"
echo "4. Start MongoDB locally or use Docker"
echo "5. Configure .env files in both backend and frontend"
