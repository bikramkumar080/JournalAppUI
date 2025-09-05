import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import EmailIcon from "@mui/icons-material/Email";
import { sendMail } from "../../util/apiCalls";

function Home(props: {showUsers: boolean; setShowUsers: (show: boolean) => void; showJournals: boolean; setShowJournals: (show: boolean) => void; CreateAdminOpen: boolean; setCreateAdminOpen: (open: boolean) => void; setSearchResults: ( results: { entries: any[]; users: any[] } ) => void; setShowUserInfo: (show: boolean) => void;}) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage users, journals, and admin tasks from your dashboard.
      </Typography>
      <Box sx={{ display: "flex", gap: 4, mt: 2, flexWrap: "wrap" }}>
        <Card sx={{ textAlign: "center", py: 3, flex: "1 1 220px", minWidth: 220 }} onClick={() => { props.setCreateAdminOpen(!props.CreateAdminOpen); props.setShowUsers(false); props.setShowJournals(false); props.setSearchResults({ entries: [], users: [] }); props.setShowUserInfo(false); }}>
          <CardContent>
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Admin Tools
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create new admins and manage admin privileges.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: "center", py: 3, flex: "1 1 220px", minWidth: 220 }} onClick={() => { props.setShowUsers(!props.showUsers); props.setShowJournals(false); props.setCreateAdminOpen(false); props.setSearchResults({ entries: [], users: [] }); props.setShowUserInfo(false); }}>
          <CardContent>
            <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View, edit, and manage all registered users.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: "center", py: 3, flex: "1 1 220px", minWidth: 220 }} onClick={() => { props.setShowJournals(!props.showJournals); props.setShowUsers(false); props.setCreateAdminOpen(false); props.setSearchResults({ entries: [], users: [] }); props.setShowUserInfo(false); }}>
          <CardContent>
            <BookIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Journals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access and review all submitted journals.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: "center", py: 3, flex: "1 1 220px", minWidth: 220 }} onClick={() => { sendMail().then(() => alert("Emails sent successfully!")).catch(() => alert("Failed to send emails.")) }}>
          <CardContent>
            <EmailIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Send Email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send last 7 days sentimentAnalysis
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
export default Home;