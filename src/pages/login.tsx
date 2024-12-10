import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      alert('Login Successful');
      console.log(response.data);
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }
  };

  return (
    <Box style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        style={{ marginBottom: '1rem' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: '1rem' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
