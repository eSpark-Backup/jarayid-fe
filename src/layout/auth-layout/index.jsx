import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
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
          <img src="/images/ملخص RSS.png" alt="rss" />
        </Typography>
        <img src="/images/JARAYID.com.png" alt="logo" />
      </Box>

      <Outlet />
    </Box>
  );
};
