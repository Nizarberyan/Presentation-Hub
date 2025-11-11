import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Paper,
} from "@mui/material";
import { CalendarMonth, Group } from "@mui/icons-material";
import type { Presentation } from "../types/Presentation.type";
import api from "../api";
import { StatusBadge } from "../components/StatusBadge.tsx";
import { PresentationSkeleton } from "../components/PresentationSkeleton.tsx";

// Main Home Component
const Home: React.FC = () => {
    const [presentations, setPresentations] = useState<Presentation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPresentations = async () => {
            try {
                const response = await api.get("/presentations");
                const rawData = response.data;
                const data = Array.isArray(rawData) ? rawData : rawData?.data || [];
                setPresentations(data);
            } catch (error) {
                console.error("Error loading presentations:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPresentations();
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                py: 5,
                px: 2,
            }}
        >
            <Container maxWidth="xl"> {/* Changed to xl to fit more items comfortably */}
                {/* Header Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: 2,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                component="h1"
                                fontWeight={700}
                                color="primary"
                                gutterBottom
                            >
                                Presentations Overview
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                A comprehensive look at all student assignments and their
                                statuses.
                            </Typography>
                        </Box>
                        {!loading && (
                            <Chip
                                label={`Total Presentations: ${presentations.length}`}
                                color="primary"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    py: 2.5,
                                    px: 1,
                                }}
                            />
                        )}
                    </Box>
                </Paper>

                {/* Content Grid */}
                {loading ? (
                    <Grid container spacing={3}>
                        {[...Array(8)].map((_, i) => (
                            // FIX: Use 'size' prop instead of 'item xs={...}'
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                                <PresentationSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : presentations.length === 0 ? (
                    <Paper
                        elevation={3}
                        sx={{
                            py: 10,
                            textAlign: "center",
                            border: "2px dashed",
                            borderColor: "primary.main",
                            bgcolor: "background.paper",
                        }}
                    >
                        <Typography variant="h5" color="primary" fontWeight={500}>
                            No presentations found. Time to create some!
                        </Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {presentations.map((presentation) => (
                            // FIX: Use 'size' prop instead of 'item xs={...}'
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={presentation._id}>
                                <Card
                                    elevation={3}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: 8,
                                        },
                                    }}
                                >
                                    {/* Card Content Code (unchanged) */}
                                    <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            mb={2}
                                        >
                                            <StatusBadge status={presentation.status} />
                                            <Box display="flex" alignItems="center" gap={0.5}>
                                                <CalendarMonth
                                                    sx={{ fontSize: 18, color: "text.secondary" }}
                                                />
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(presentation.date).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            fontWeight={700}
                                            color="primary"
                                            gutterBottom
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {presentation.titre}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                mb: 2,
                                            }}
                                        >
                                            {presentation.description || "No description provided."}
                                        </Typography>
                                    </CardContent>

                                    <Divider />
                                    <Box
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            bgcolor: "action.hover",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Group sx={{ fontSize: 20, color: "primary.main" }} />
                                        {presentation.assignedTo.length > 0 ? (
                                            <Typography
                                                variant="body2"
                                                color="primary"
                                                fontWeight={500}
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {presentation.assignedTo.map((s) => s.name).join(", ")}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                fontStyle="italic"
                                            >
                                                Unassigned
                                            </Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Home;