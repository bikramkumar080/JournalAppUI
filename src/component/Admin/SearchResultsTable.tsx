import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tooltip, Avatar
} from '@mui/material';
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import JournalDialog from "../User/JournalDialogProps";
import { addJournal, editJournal, deleteJournal } from "../../util/userApiCalls";

export default function SearchResultsTable({ results }: { results: { entries: any[]; users: any[] } }) {
  const [journals, setJournals] = React.useState<any[]>(results.entries || []);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

  React.useEffect(() => {
    setJournals(results.entries || []);
  }, [results.entries]);

  if ((!results.entries || results.entries.length === 0) && (!results.users || results.users.length === 0)) return null;

  const handleAdd = () => { setEditData(null); setOpenDialog(true); };
  const handleEdit = (journal: any) => { setEditData(journal); setOpenDialog(true); };
  const handleDelete = async (id: number) => {
    await deleteJournal(id);
    setJournals(journals.filter(j => j.id !== id));
  };

  return (
    <Box sx={{ px: 4, py: 2 }}>
      {/* Journals Section */}
      {results.entries && results.entries.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "primary.main", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <BookIcon sx={{ mr: 1, color: "white" }} />
            <Typography variant="h6" sx={{ color: "white" }}>Journal Entries</Typography>
            <Box sx={{ flex: 1 }} />
            <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
              <AddIcon />
            </button>
          </Box>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Content</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journals.map((entry, idx) => (
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
                   <TableCell>
                    <EditIcon sx={{ cursor: "pointer", mr: 1 }} onClick={() => handleEdit(entry)} />
                    <DeleteIcon sx={{ cursor: "pointer", color: "error.main" }} onClick={() => handleDelete(entry.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* JournalDialog for Add/Edit */}
      {openDialog && (
        <JournalDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          journal={editData}
          onSave={async (data) => {
            if (editData) {
              const updated = await editJournal(editData.id, data);
              setJournals(journals.map(j => j.id === editData.id ? { ...j, ...updated } : j));
            } else {
              const newJournal = await addJournal(data);
              setJournals([...journals, newJournal]);
            }
            setOpenDialog(false);
          }}
        />
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