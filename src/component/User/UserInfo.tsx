import React from "react";
import { Box, Typography, Paper, Avatar, CircularProgress, Chip, Divider, FormControlLabel, Switch } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import EmailIcon from "@mui/icons-material/Email";
import { getInfo } from "../../util/userApiCalls";
import { updateSentimentPreference } from "../../util/userApiCalls";

export default function UserInfo() {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [sentimentEnabled, setSentimentEnabled] = React.useState(false);
  const [toggleLoading, setToggleLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getInfo()
      .then(data => {
        setUser(data);
        setSentimentEnabled(data.sentimentAnalysis);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load user info.");
        setLoading(false);
      });
  }, []);

  const handleToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setToggleLoading(true);
    await updateSentimentPreference(enabled);
    setSentimentEnabled(enabled);
    setUser((prev: any) => ({ ...prev, sentimentAnalysis: enabled }));
    setToggleLoading(false);
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return null;

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 10, boxShadow: 8, borderRadius: 4, border: "2px solid",borderColor: "primary.main"}}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56, fontSize: 32 }}>
          {user.username ? user.username[0].toUpperCase() : "U"}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">{user.username}</Typography>
          <Chip
            icon={<VerifiedUserIcon />}
            label={user.roles}
            color={user.roles === "ADMIN" ? "success" : "primary"}
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <EmailIcon color="action" sx={{ mr: 1 }} />
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {user.sentimentAnalysis ? (
          <SentimentSatisfiedAltIcon color="success" sx={{ mr: 1 }} />
        ) : (
          <SentimentDissatisfiedIcon color="error" sx={{ mr: 1 }} />
        )}
        <Typography variant="body1">
          <strong>Sentiment Analysis:</strong> {user.sentimentAnalysis ? "Yes" : "No"}
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={sentimentEnabled}
            onChange={handleToggle}
            color="primary"
            disabled={toggleLoading}
          />
        }
        label={sentimentEnabled ? "Disable Sentiment Analysis" : "Enable Sentiment Analysis"}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
}