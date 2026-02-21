import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingState: React.FC = () => (
  <Box display="flex" justifyContent="center" mt={5}>
    <CircularProgress />
  </Box>
);

export default LoadingState;