import React from "react";
import { Box } from "@mui/material";
import GreenSpinner from "./GreenSpinner";

const LoadingState: React.FC = () => (
  <Box display="flex" justifyContent="center" mt={5}>
    <GreenSpinner />
  </Box>
);

export default LoadingState;
