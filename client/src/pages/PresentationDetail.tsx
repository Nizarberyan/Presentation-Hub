import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    Box,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Grid,
    Tooltip,
} from "@mui/material";
import {
    CalendarMonth,
    Person,

    Group,
    AccessTime,
    Update,
} from "@mui/icons-material";
import api from "../api";
import {StatusBadge} from "../components/StatusBadge.tsx";


// +++ Add new UserInfo interface +++
interface UserInfo {
    _id: string;
    email: string;
    name: string;
}

// This type is based on the JSON response you provided
interface Presentation {
    _id: string;
    date: string;
    titre: string;
    description: string;
    status: PresentationStatus;
    assignedTo: UserInfo[]; // Array of UserInfo objects
    createdBy: UserInfo; // Single UserInfo object
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// A simple status type
type PresentationStatus = "pending" | "approved" | "rejected" | "presented";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};


// Main Presentation Detail Component
const PresentationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [presentation, setPresentation] = useState<Presentation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPresentation = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/presentations/${id}`);
                setPresentation(response.data);
            } catch (err) {
                console.error("Error loading presentation:", err);
                setError("Failed to load presentation details.");
            } finally {
                setLoading(false);
            }
        };

        loadPresentation().then(() => {console.log("Presentation loaded:", presentation);});
    }, [id]);

    if (loading) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!presentation) {
        return (
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Alert severity="info">No presentation found.</Alert>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                py: 5,
                px: 2,
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        background: "#ffffff",
                    }}
                >
                    {/* Header: Title and Status */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={2}
                        mb={3}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            fontWeight={700}
                            color="primary.main"
                            sx={{ flexGrow: 1, pr: 2 }}
                        >
                            {presentation.titre}
                        </Typography>
                        <StatusBadge status={presentation.status} />
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Main Content: Description */}
                    <Box mb={4}>
                        <Typography
                            variant="h5"
                            component="h2"
                            fontWeight={600}
                            color="text.primary"
                            gutterBottom
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
                        >
                            {presentation.description}
                        </Typography>
                    </Box>

                    {/* Metadata Section */}
                    <Typography
                        variant="h5"
                        component="h2"
                        fontWeight={600}
                        color="text.primary"
                        gutterBottom
                        mb={3}
                    >
                        Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Presentation Date */}
                        <Grid item xs={12} sm={6}>
                            <Chip
                                icon={<CalendarMonth />}
                                label={`Date: ${new Date(presentation.date).toLocaleDateString()}`}
                                color="primary"
                                variant="outlined"
                                sx={{ p: 2, fontSize: "1rem" }}
                            />
                        </Grid>
                        {/* Created By */}
                        <Grid item xs={12} sm={6}>
                            <Tooltip title={presentation.createdBy.email} arrow>
                                <Chip
                                    icon={<Person />}
                                    label={`Created by: ${presentation.createdBy.name}`}
                                    color="default"
                                    variant="outlined"
                                    sx={{ p: 2, fontSize: "1rem" }}
                                />
                            </Tooltip>
                        </Grid>
                        {/* Assigned To */}
                        <Grid item xs={12}>
                            <Chip
                                icon={<Group />}
                                label={`Assigned to: ${presentation.assignedTo.map((user) => user.name).join(", ")}`}
                                color="default"
                                variant="outlined"
                                sx={{ p: 2, fontSize: "1rem" }}
                            />
                        </Grid>
                        {/* Created At */}

                        {/* Updated At */}

                    </Grid>
                    <Grid spacing={2} container justifyContent="space-between" mt={2} mb={2}>
                        <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                            <AccessTime fontSize="small" />
                            <Typography variant="body2">
                                Created: {formatDate(presentation.createdAt)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                            <Update fontSize="small" />
                            <Typography variant="body2">
                                Updated: {formatDate(presentation.updatedAt)}
                            </Typography>
                        </Box>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default PresentationDetail;