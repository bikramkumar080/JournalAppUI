import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [otp, setOtp] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !otp || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/api/public/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
      setSuccess('Password reset successful! Redirecting to sign in...');
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" mb={2}>Reset Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>{error}</Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" mt={1}>{success}</Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      </Card>
    </Box>
  );
}