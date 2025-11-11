import { Pending, CheckCircle, Cancel } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig = {
    pending: { label: "Pending", color: "warning", icon: <Pending /> },
    completed: { label: "Completed", color: "success", icon: <CheckCircle /> },
    cancelled: { label: "Cancelled", color: "error", icon: <Cancel /> },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};
