import React from "react";
import { allJournalsApi } from "../../util/adminApiCalls";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tooltip
} from '@mui/material';
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import JournalDialog from "../User/JournalDialogProps";
import {addJournal} from "../../util/userApiCalls";
import {editJournal} from "../../util/userApiCalls";
import { deleteJournal } from "../../util/userApiCalls";

function ListJournals() {
  const [journals, setJournals] = React.useState<any[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

  const handleAdd = () => { setEditData(null); setOpenDialog(true); };
  const handleEdit = (journal: any) => { setEditData(journal); setOpenDialog(true); };
  const handleDelete = async (id: number) => {
    await deleteJournal(id);
    setJournals(journals.filter(j => j.id !== id));
  };

  React.useEffect(() => {
    allJournalsApi().then((data) => {
      setJournals(data);
    });
  }, []);

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
          <AddIcon />
        </button>
      </Box>
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
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Actions</TableCell>
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
                <TableCell>
                  <EditIcon sx={{ cursor: "pointer", mr: 1 }} onClick={() => handleEdit(journal)} />
                  <DeleteIcon sx={{ cursor: "pointer", color: "error.main" }} onClick={() => handleDelete(journal.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Box>
  );
}

export default ListJournals;