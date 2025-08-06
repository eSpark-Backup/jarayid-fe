import { Box, Button, Modal, Typography } from "@mui/material";
import { deleteInfo, modalClose } from "../../assets";
import { getFont } from "../../utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ConfirmModal = ({
  open,
  handleClose,
  sx,
  children,
  handleCancel,
  handleAccept,
  heading,
  button2Text,
  isAdmin,
}) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
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
            // justifyContent: language === "ar" ? "flex-start" : "flex-end",
            justifyContent:
              isAdmin || language !== "ar" ? "flex-end" : "flex-start",
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
            display: "flex",
            flexDirection: "column",
            // alignItems: language === "ar" ? "flex-end" : "flex-start",
            alignItems:
              isAdmin || language !== "ar" ? "flex-start" : "flex-end",
          }}
        >
          <img
            src={deleteInfo}
            alt=""
            style={{ width: "75px", height: "75px" }}
          />
          <Typography
            sx={{
              fontSize: getFont("24px"),
              fontWeight: "600",
              textAlign: language !== "ar" || isAdmin ? "left" : "right",
            }}
          >
            {isAdmin ? heading : t(heading)}
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
                fontSize: getFont("16px"),
                my: "0px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#454545",
                  boxShadow: "none",
                },
              }}
              disableRipple
              onClick={handleCancel}
            >
              {isAdmin ? "Cancel" : t("Cancel")}
            </Button>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "47%" }, height: "44px" }}>
            <Button variant="delete" disableRipple onClick={handleAccept}>
              {isAdmin ? button2Text : t(button2Text)}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
