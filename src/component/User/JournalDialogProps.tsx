import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

interface JournalDialogProps {
  open: boolean;
  onClose: () => void;
  journal?: { title: string; content: string };
  onSave: (data: { title: string; content: string }) => void;
}

const JournalDialog: React.FC<JournalDialogProps> = ({ open, onClose, journal, onSave }) => {
  const [title, setTitle] = React.useState(journal?.title || "");
  const [content, setContent] = React.useState(journal?.content || "");

  React.useEffect(() => {
    setTitle(journal?.title || "");
    setContent(journal?.content || "");
  }, [journal, open]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ title, content });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{journal ? "Edit Journal" : "Add Journal"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {journal ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JournalDialog;