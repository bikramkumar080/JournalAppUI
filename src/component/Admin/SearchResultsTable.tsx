import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tooltip, Avatar
} from '@mui/material';
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function SearchResultsTable({ results }: { results: { entries: any[]; users: any[] } }) {
  if ((!results.entries || results.entries.length === 0) && (!results.users || results.users.length === 0)) return null;

  return (
    <Box sx={{ px: 4, py: 2 }}>
      {/* Journals Section */}
      {results.entries && results.entries.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "primary.main", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <BookIcon sx={{ mr: 1, color: "white" }} />
            <Typography variant="h6" sx={{ color: "white" }}>Journal Entries</Typography>
          </Box>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Content</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.entries.map((entry, idx) => (
                <TableRow
                  key={entry.id}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "grey.100" : "background.paper",
                    "&:hover": { bgcolor: "grey.200" }
                  }}
                >
                  <TableCell>{entry.id}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{entry.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={entry.content} arrow>
                      <Typography>{entry.content}</Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Users Section */}
      {results.users && results.users.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "primary.main", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <PeopleIcon sx={{ mr: 1, color: "white" }} />
            <Typography variant="h6" sx={{ color: "white" }}>Users</Typography>
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
              {results.users.map((user, idx) => (
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
                    <Typography fontWeight="bold">{user.username}</Typography>
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
      )}
    </Box>
  );
}