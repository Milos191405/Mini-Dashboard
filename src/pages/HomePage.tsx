import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const goToProducts = (q?: string) => {
    const url = q ? `/products?q=${encodeURIComponent(q)}` : '/products';
    navigate(url);
  };

  return (
    <Box sx={{ textAlign: 'center', mt:8 }}>
      <Typography variant="h3" gutterBottom>
        Mini Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        I used some dummy data 
      </Typography>

      <Paper sx={{ display: 'inline-block', p: 3, mt: 3 }}>
        <Stack direction={{xs: 'column', md:'row'}} spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="contained" sx={{backgroundColor: 'green'}} onClick={() => goToProducts(query)}>
            Search
          </Button>
          <Button variant="outlined" sx={{color:'green'}} onClick={() => goToProducts()}>
            View all products
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default HomePage;
