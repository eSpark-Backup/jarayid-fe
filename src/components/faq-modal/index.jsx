import React from "react";
import { TextField } from "@mui/material";
import GlobalModal from "../global-modal";

const FAQModal = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  title,
  buttonText,
}) => {
  const isFormValid = formData.question && formData.answer;

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={() => {
        if (isFormValid) onSubmit();
      }}
      title={title}
      submitText={buttonText}
      disableSubmit={!isFormValid}
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
        onChange={(e) =>
          setFormData({ ...formData, answer: e.target.value })
        }
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
    </GlobalModal>
  );
};

export default FAQModal;
