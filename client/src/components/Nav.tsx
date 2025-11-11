import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
} from "@mui/material";

const Nav: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #1565c0 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: 0.5,
              "&:hover": { opacity: 0.9 },
            }}
          >
            Presentation Hub
          </Typography>

          {/* Navigation & Auth */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 1,
                    borderRight: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "rgba(255,255,255,0.25)",
                      fontSize: 14,
                    }}
                  >
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {user?.name || "User"}
                  </Typography>
                </Box>

                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                    textTransform: "none",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    borderColor: "rgba(255,255,255,0.5)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: "none",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{
                    textTransform: "none",
                    borderColor: "rgba(255,255,255,0.5)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
