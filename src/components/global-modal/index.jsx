import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "../../assets/icons/cancel.svg";

const GlobalModal = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = "Submit",
  disableSubmit = false,
  width = "475px",
  height = "485px",
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: `${width} !important`,
          height,
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        color="#3F3F40"
        fontSize="30px"
        fontWeight="bold"
        sx={{
          position: "relative",
          pr: "48px",
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 12,
          }}
        >
          <img src={CloseIcon}></img>
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: "10px !important",
        }}
      >
        {children}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          sx={{
            width: "137px",
            height: "40px",
            fontSize: "12px",
          }}
          disabled={loading || disableSubmit}
          loading={loading}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalModal;
