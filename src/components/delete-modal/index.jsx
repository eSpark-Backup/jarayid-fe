import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../assets/icons/cancel.svg";

const DeleteModal = ({
  open,
  handleClose,
  handleCancel,
  handleConfirm,
  heading = "Are you sure you want to Delete ?",
  desc = "Deleting is permanent and your Article will automatically be deleted after 30 days if you do not log in again.",
  confirmText = "Delete",
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "640px",
          height: "240px",
          borderRadius: "10px",
          position: "relative",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <img src={CloseIcon}></img>
      </IconButton>

      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          {heading}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography color="textSecondary">{desc}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          sx={{
            width: "280px",
            height: "48px",
            borderRadius: "8px",
            border: "1px solid #6E6F70",
            color: "#000000",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000000",
            },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          sx={{
            width: "280px",
            height: "48px",
            borderRadius: "8px",
            color: "#fff",
            backgroundColor: "#FF0000",
            "&:hover": {
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
            },
          }}
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
