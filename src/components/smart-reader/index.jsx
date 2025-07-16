import { Box, Typography, IconButton } from "@mui/material";
import { memo } from "react";
import SmartReaderIcon from "../../assets/icons/smart-read.svg"; 

const SmartReaderCard = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        px: 2,
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "400",
        }}
      >
        Click Here
      </Typography>

      <IconButton
        disableRipple
        aria-label="Open Smart Reader"
        sx={{
          p: 0,
          background: "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)",
          height: 46,
          width: 46,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={SmartReaderIcon}
          alt="Smart Reader Icon"
          loading="lazy"
          decoding="async"
          style={{ width: 19, height: 19 }}
        />
      </IconButton>

      <Typography variant="body2" sx={{ fontSize: "18px", fontWeight: "400" }}>
        Smart Reader
      </Typography>
    </Box>
  );
};

export default memo(SmartReaderCard);
