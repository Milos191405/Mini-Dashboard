import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <Box textAlign="center" mt={5}>
    <Typography color="error">{message}</Typography>
    <Button
      variant="contained"
      onClick={onRetry}
      sx={{ mt: 2, backgroundColor: "green" }}
    >
      Retry
    </Button>
  </Box>
);

export default ErrorState;
