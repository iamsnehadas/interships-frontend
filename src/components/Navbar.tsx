import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar position="static" style={{ backgroundColor: '#f8f8f8', color: '#000' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
          Internship Platform
        </Typography>

        <Box style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outlined" onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={() => router.push('/signup-student')}>
            Student Sign-Up
          </Button>
          <Button variant="contained" color="primary" onClick={() => router.push('/signup-employer')}>
            Employer Sign-Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
