import React from "react";
import { allUsersApi } from "../../util/adminApiCalls";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Avatar, Tooltip
} from '@mui/material';
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

function ListUsers() {
  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    allUsersApi().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box sx={{ px: 4, py: 2 }}>
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 3, maxHeight: 450 , overflow: 'auto' }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "primary.main", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <PeopleIcon color="inherit" sx={{ mr: 1, color: "white" }} />
        <Typography variant="h6" sx={{ color: "white" }}>All Users</Typography>
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Avatar</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Username</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <VerifiedUserIcon fontSize="small" sx={{ mr: 0.5 }} />
              Role
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <SentimentSatisfiedAltIcon fontSize="small" sx={{ mr: 0.5 }} />
              Sentiment
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow
              key={user.id}
              sx={{
                bgcolor: idx % 2 === 0 ? "grey.100" : "background.paper",
                "&:hover": { bgcolor: "grey.200" }
              }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                  {user.username ? user.username[0].toUpperCase() : "U"}
                </Avatar>
              </TableCell>
              <TableCell>
                <Typography>{user.username}</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title={user.email} arrow>
                  <Typography>{user.email}</Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Typography color={user.roles === "ADMIN" ? "success.main" : "text.secondary"}>
                  {user.roles}
                </Typography>
              </TableCell>
              <TableCell>
                {user.sentimentAnalysis ? (
                  <Typography color="success.main">Yes</Typography>
                ) : (
                  <Typography color="error.main">No</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default ListUsers;