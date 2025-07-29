import { useEffect, useState } from "react";
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

const EditFAQModal = ({ open, onClose, onSubmit, faq }) => {
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (faq) setFormData(faq);
  }, [faq]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    onSubmit(formData); 
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit FAQ</DialogTitle>
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

        <Button onClick={handleSave} variant="gradient">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFAQModal;
