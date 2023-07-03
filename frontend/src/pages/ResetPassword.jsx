import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';

import authService from '../features/auth/authService';
import Header from '../components/Header';
import Spinner from '../components/Spinner'; 
import theme from '../components/helpers/themes';
import { Avatar } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(token, password);
      console.log(response);
      setError('Password reset successfully! Redirecting to login page...')
      setTimeout(()=> {
        navigate('/login');
      }, 1000)
    } catch (error) {
      setError('Failed to reset password');
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <Header />
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.violet.main }}>
              <LockOpenOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                autoFocus
                value={password}
                onChange={handlePasswordChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {error && (
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                style={{backgroundColor: theme.palette.violet.main, color: '#fff' }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ResetPasswordPage;
