import { Box, Card, CardContent, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import rssIcon from "../../assets/images/ملخص RSS.png";
import logoImage from "../../assets/images/JARAYID.com.png";

const AuthLayout = () => {
  const isLogin = location.pathname.includes("login");
  const isSignup = location.pathname.includes("signup");
  const isChangePassword = location.pathname.includes("change-password");

  let title = "";
  let subtitle = "";

  if (isLogin) {
    title = "Login";
    subtitle = "Add your details below to get back into the app";
  } else if (isSignup) {
    title = "Create account";
    subtitle = "Let’s get you started sharing your links!";
  } else if (isChangePassword) {
    title = "Forgot Password";
    subtitle = "Let's get you started sharing your links";
  }

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
        <img
          src={rssIcon}
          alt="rss"
          style={{ display: "block", marginBottom: 8 }}
        />
        <img src={logoImage} alt="logo" />
      </Box>

      <Card
        sx={{ maxWidth: 476, width: "100%", borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#8F8F8F", mb: 3, fontSize: "16px" }}
          >
            {subtitle}
          </Typography>

          <Outlet />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthLayout;
