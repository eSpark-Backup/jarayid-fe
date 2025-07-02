import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import rssIcon from "../../assets/images/ملخص RSS.png";
import logoImage from "../../assets/images/JARAYID.com.png";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        p: 2,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, textAlign: "start" }}
        >
          <img src={rssIcon} alt="rss" />
        </Typography>
        <img src={logoImage} alt="logo" />
      </Box>

      <Outlet />
    </Box>
  );
};

export default AuthLayout;
