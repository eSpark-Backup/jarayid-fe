import { Box, Button, Modal, Typography } from "@mui/material";
import { deleteInfo, modalClose } from "../../assets";

const ConfirmModal = ({
  open,
  handleClose,
  sx,
  children,
  handleCancel,
  handleAccept,
  heading,
  button2Text,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        sx: {
          backdropFilter: "blur(0.5px)",
          backgroundColor: "#da2c2c29",
        },
      }}
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
            lg: "40%",
          },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "35px",
          padding: "20px 20px 50px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "640px",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <img
            src={modalClose}
            alt="Icon"
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
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
            width: { xs: "100%" },
          }}
        >
          <img src={deleteInfo} alt="" />
          <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
            {heading}
          </Typography>
          {children}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: "15px",
            mt: "30px",
            flexDirection: { xs: "column", md: "row" },
            rowGap: "10px",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "47%" }, height: "44px" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                height: "44px",
                color: "#454545",
                border: "1px solid #373838",
                fontSize: "16px",
                my: "0px",
                textTransform: "none", // optional: to prevent uppercase text
              }}
              disableRipple
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "47%" }, height: "44px" }}>
            <Button variant="delete" disableRipple onClick={handleAccept}>
              {button2Text}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
