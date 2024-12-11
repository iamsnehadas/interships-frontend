import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode'; // Ensure this is correctly imported

export const AuthenticatedNavbar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { name?: string; email?: string } = jwtDecode(token); // Decodes the JWT token
        if (decodedToken.name) {
          setUserName(decodedToken.name); // Use 'name' if available
        } else if (decodedToken.email) {
          setUserName(decodedToken.email.split('@')[0]); // Fallback to part of the email
        }
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
    <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
          
        </Typography>

        <Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Typography variant="subtitle1">Welcome, {userName}!</Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
