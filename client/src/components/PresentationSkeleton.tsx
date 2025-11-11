import { Box, Card, CardContent, Divider, Skeleton } from "@mui/material";
import React from "react";

export const PresentationSkeleton: React.FC = () => (
    <Card elevation={2}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Skeleton variant="rectangular" width={80} height={24} />
                <Skeleton variant="rectangular" width={100} height={24} />
            </Box>
            <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="60%" />
        </CardContent>
        <Divider />
        <Box px={2} py={1.5}>
            <Skeleton variant="text" width="50%" />
        </Box>
    </Card>
);