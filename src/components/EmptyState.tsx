import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface EmptyStateProps {
  message: string;
  onBack: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, onBack }) => (
  <Box textAlign="center" mt={5}>
    <Typography>{message}</Typography>
    <Button
      variant="outlined"
      onClick={onBack}
      sx={{ mt: 2, color: "green", borderColor: "green" }}
    >
      Back
    </Button>
  </Box>
);

export default EmptyState;
