import React from "react";
import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";

const GreenSpinner: React.FC<CircularProgressProps> = (props) => {
  return <CircularProgress sx={{ color: "green" }} {...props} />;
};

export default GreenSpinner;
