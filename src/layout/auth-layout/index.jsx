import { Box, Card, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import rssIcon from "../../assets/images/ملخص RSS.png";
import logoImage from "../../assets/images/JARAYID.com.png";
import { logo } from "../../assets";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 476,
          width: "100%",
          minHeight: { xs: "45vh", lg: "60vh" },
          rowGap: "25px",
        }}
      >
        <Box
          component={"img"}
          src={logo}
          sx={{
            width: { xs: "200px", lg: "auto" },
            height: { xs: "67px", lg: "auto" },
          }}
          alt="Logo"
        />

        <Card
          sx={{ maxWidth: 476, width: "100%", borderRadius: 2, boxShadow: 3 }}
        >
          <CardContent
            sx={{
              py: "30px !important",
              px: { xs: "25px !important", md: "40px !important" },
            }}
          >
            <Outlet />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthLayout;
