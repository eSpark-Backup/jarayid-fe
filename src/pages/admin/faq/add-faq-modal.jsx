import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { Button } from "../../../components";

const AddFAQModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    onSubmit(formData); 
    setFormData({ question: "", answer: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New FAQ</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              color: "#0056b3",
            },
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="gradient">
          Add FAQ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFAQModal;
