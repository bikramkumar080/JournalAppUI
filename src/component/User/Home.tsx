import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getUsernameFromToken } from "../../util/username";

const Home: React.FC = () => {
    const username = getUsernameFromToken();
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", boxShadow: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to Your Dashboard!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Hello, {username ? username : "User"}!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Here you can view your journals, update your profile, and explore new features.
        </Typography>
        {/* Add more user-specific content/components here */}
      </Paper>
    </Box>
  );
};

export default Home;