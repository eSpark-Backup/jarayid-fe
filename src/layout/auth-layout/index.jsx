import { Box, Card, CardContent, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import rssIcon from "../../assets/images/ملخص RSS.png";
import logoImage from "../../assets/images/JARAYID.com.png";
import { logo } from "../../assets";
import { LanguageToggler } from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getFont } from "../../utils";

const AuthLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  const titleArr = [
    { pathname: "/signup", title: "Create account" },
    { pathname: "/login", title: "login heading" },
    { pathname: "/verify-email", title: "Forgot Password" },
    { pathname: "/reset-password", title: "Forgot Password" },
  ];

  const title = titleArr.find(
    (item) => item?.pathname === location?.pathname
  ).title;

  const subTitleArr = [
    {
      pathname: "/signup",
      subtitle: "Let’s get you started sharing your links!",
    },
    { pathname: "/login", subtitle: "login description" },
    {
      pathname: "/verify-email",
      subtitle: "Let’s get you started sharing your links!",
    },
    {
      pathname: "/reset-password",
      subtitle: "Let’s get you started sharing your links!",
    },
  ];

  const subtitle = subTitleArr.find(
    (item) => item?.pathname === location?.pathname
  ).subtitle;

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
            sx={{
              maxWidth: 476,
              width: "100%",
              borderRadius: 2,
              boxShadow:
                "0px 0.9px 3.6px 0.9px #0000001F, 0px 2.7px 2.92px -1.35px #00000040 !important",
            }}
          >
            <CardContent
              sx={{
                py: "30px !important",
                px: { xs: "25px !important", md: "40px !important" },
              }}
            >
              <Typography
                sx={{
                  mb: 1,
                  textAlign: language === "ar" ? "right" : "left",
                  fontSize: { xs: getFont("22.5px"), md: getFont("32px") },
                  fontFamily: "Gilroy-Bold",
                  fontWeight: "400",
                }}
              >
                {t(title)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#8F8F8F",
                  mb: 3,
                  fontSize: { xs: getFont("11px"), md: getFont("16px") },
                  textAlign: language === "ar" ? "right" : "left",
                  fontFamily: "Gilroy-Regular",
                  fontWeight: 400,
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
