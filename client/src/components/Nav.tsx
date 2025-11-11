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
} from "@mui/material";

const Nav: React.FC = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        // AppBar is the MUI equivalent of a nav bar
        <AppBar position="static">
            {/* Container sets the max-width, equivalent to max-w-7xl mx-auto */}
            <Container maxWidth="lg">
                {/* Toolbar handles the horizontal layout and padding */}
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    {/* Left Side: Brand/Title */}
                    <Typography
                        variant="h6"
                        component={Link} // Use React Router's Link
                        to="/"
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                            fontWeight: 700,
                        }}
                    >
                        Presentation Hub
                    </Typography>

                    {/* Right Side: Auth Links */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        {isLoggedIn ? (
                            <>
                                <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block'} }}>
                                    Welcome, {user?.name}
                                </Typography>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Button>
                                <Button
                                    color="inherit"
                                    variant="outlined" // Makes it stand out
                                    onClick={handleLogout}
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                        }
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
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    variant="outlined" // Makes it stand out
                                    component={Link}
                                    to="/register"
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                        }
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