import { Box, Card, CardContent, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import rssIcon from "../../assets/images/ملخص RSS.png";
import logoImage from "../../assets/images/JARAYID.com.png";
import { logo } from "../../assets";
import { LanguageToggler } from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  const title =
    location.pathname === "/signup"
      ? "Create account"
      : location.pathname === "/login"
      ? "login heading"
      : "Forgot Password";

  const subtitle =
    location.pathname === "/login"
      ? "login description"
      : "Let’s get you started sharing your links!";

  return (
    <Box sx={{ backgroundColor: "#FAFAFA" }}>
      <Box sx={{ p: "25px", display: "flex", justifyContent: "flex-end" }}>
        <LanguageToggler />
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 90px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            rowGap: location.pathname === "/forget-password" ? "100px" : "35px",
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
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  textAlign: language === "ar" ? "right" : "left",
                  fontSize: { xs: "22.5px", md: "32px" },
                }}
              >
                {t(title)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#8F8F8F",
                  mb: 3,
                  fontSize: { xs: "11px", md: "16px" },
                  textAlign: language === "ar" ? "right" : "left",
                }}
              >
                {t(subtitle)}
              </Typography>
              <Outlet />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
