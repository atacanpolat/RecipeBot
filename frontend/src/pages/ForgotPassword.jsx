import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/helpers/themes';
import React, { useState } from 'react';
import authService from '../features/auth/authService';
import Avatar from '@mui/material/Avatar';
import Header from '../components/Header';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:theme.palette.violet.main}}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            {message && <Typography variant="body2">{message}</Typography>}
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2" style={{color: theme.palette.violet.main}}>
                  Back to Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default ForgotPassword;
