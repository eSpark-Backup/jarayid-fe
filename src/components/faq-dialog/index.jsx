import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const FAQFormDialog = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  dialogTitle,
  buttonText,
}) => {
  const isFormValid = formData.question && formData.answer;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "475px !important",
          height: "485px",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle color="#3F3F40" fontSize="30px" fontWeight="bold">
        {dialogTitle}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: "10px !important",
        }}
      >
        <TextField
          label="Question"
          placeholder="Write Down Your Question Here"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
            sx: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#121826",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#6C727F",
              fontSize: "12px",
            },
          }}
        />

        <TextField
          label="Answer"
          placeholder="Write Down Your Answer Here"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          multiline
          minRows={7}
          fullWidth
          InputLabelProps={{
            shrink: true,
            sx: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#3F3F40",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#888",
              fontSize: "14px",
            },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            if (isFormValid) {
              onSubmit();
            }
          }}
          variant="contained"
          color="primary"
          sx={{ width: "137px", height: "40px", fontSize: "12px" }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FAQFormDialog;
