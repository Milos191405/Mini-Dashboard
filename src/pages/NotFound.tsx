import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound: React.FC = () => (
  <Box textAlign="center" mt={8}>
    <Typography variant="h4" gutterBottom>
      404 — Page not found
    </Typography>
    <Typography variant="body1" gutterBottom>
      The page you're looking for doesn't exist.
    </Typography>
    <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
      Go home
    </Button>
  </Box>
);

export default NotFound;
