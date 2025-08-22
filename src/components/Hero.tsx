import React from 'react';
import { Box, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h2">Welcome to My Portfolio</Typography>
    </Box>
  );
};

export default Hero;
