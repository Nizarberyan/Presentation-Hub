import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./root";
import Home from "./home";
import { LoginRoute, RegisterRoute } from "./auth";
import DashboardRoutes from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginRoute /> },
      { path: "register", element: <RegisterRoute /> },
      {
        path: "dashboard",
        element: <DashboardRoutes.Dashboard />,
        children: [
          { path: "admin", element: <DashboardRoutes.AdminDashboard /> },
          { path: "teacher", element: <DashboardRoutes.TeacherDashboard /> },
          { path: "student", element: <DashboardRoutes.StudentDashboard /> },
        ],
      },
    ],
  },
]);

export default router;
