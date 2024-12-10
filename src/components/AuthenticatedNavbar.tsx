import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

export const AuthenticatedNavbar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodes the JWT token
        setUserName(decodedToken.name || decodedToken.email); // Use 'name' if available, otherwise 'email'
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('User');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    router.push('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1976d2', color: '#fff' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
          Internship Platform
        </Typography>

        <Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Typography variant="subtitle1">Welcome, {userName}!</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
