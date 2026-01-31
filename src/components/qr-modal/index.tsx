import { Box, Typography } from "@mui/material";
import { qr } from "../../assets";
import { getFont } from "../../utils";

const QRModal = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "15px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: getFont("32px"),
          fontWeight: "600",
        }}
      >
        Scan QR Code To Download App
      </Typography>
      <Box component={"img"} src={qr} alt="Qr Code" loading="lazy" />
      {/* <Typography sx={{ fontSize: "14px", color: "#8F96A3" }}>
        Scan the QR code to Download the App
      </Typography> */}
    </Box>
  );
};

export default QRModal;
