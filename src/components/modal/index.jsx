import { Box, Modal } from "@mui/material";
import React from "react";

const DynamicModal = ({ open, handleClose, sx, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "95%",
            md: "70%",
            lg: "60%",
          },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "35px",
          padding: { xs: "15px", md: "25px", lg: "65px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "899px",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "calc(100% - 130px)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicModal;
