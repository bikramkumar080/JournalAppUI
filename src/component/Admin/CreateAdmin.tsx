import React, { useState } from 'react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {createAdminApi} from "../../util/adminApiCalls"

import {Box,
Button,
TextField,
Typography,
Paper,
Avatar,
} from '@mui/material';

const CreateAdmin: React.FC = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
    createAdminApi(email, password);
    // Handle success (show message, clear form, etc.)
    alert("Admin created successfully!");
    setEmail('');
    setPassword('');
  } catch (error) {
    alert("Failed to create admin.");
  }
};

return (
    <Box
        sx={{
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ffffffff 0%, #ffffff 100%)',
        }}
    >
        <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin Register
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Paper>
    </Box>
);
};

export default CreateAdmin;