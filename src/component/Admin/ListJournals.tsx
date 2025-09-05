import React from "react";
import { allJournalsApi } from "../../util/adminApiCalls";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tooltip
} from '@mui/material';
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function ListJournals() {
  const [journals, setJournals] = React.useState<any[]>([]);

  React.useEffect(() => {
    allJournalsApi().then((data) => {
      setJournals(data);
    });
  }, []);

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <TableContainer component={Paper} sx={{ mt: 1, boxShadow: 2, borderRadius: 3, maxHeight: 450 , overflow: 'auto' }}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "primary.main", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
          <BookIcon color="inherit" sx={{ mr: 1, color: "white" }} />
          <Typography variant="h6" sx={{ color: "white" }}>All Journals</Typography>
        </Box>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Content</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                Date
              </TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                Username
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journals.map((journal, idx) => (
              <TableRow
                key={journal.id}
                sx={{
                  bgcolor: idx % 2 === 0 ? "grey.100" : "background.paper",
                  "&:hover": { bgcolor: "grey.200" }
                }}
              >
                <TableCell>{journal.id}</TableCell>
                <TableCell>
                  <Typography fontWeight="bold">{journal.title}</Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title={journal.content} arrow>
                    <Typography>{journal.content}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{journal.date}</TableCell>
                <TableCell>{journal.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListJournals;