import { Box, Typography } from "@mui/material";
import SocialBox from "../social-box";
import { login, logo } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LanguageToggler from "../lang-toggler";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/login" || pathname === "/signup" ? (
        <Box
          sx={{
            p: "20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <LanguageToggler />
        </Box>
      ) : (
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              py: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <SocialBox />
            {/* <img src={logo} alt="Logo" /> */}
            <Box
              component={"img"}
              src={logo}
              sx={{ width: { md: "170px", lg: "auto" } }}
            />
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
            >
              <Box
                sx={{ display: "flex", columnGap: { md: "20px", lg: "45px" } }}
              >
                {user ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#007BFF" }}>
                      {t("signup")}
                    </Typography>
                    <img src={login} alt="Icon" />
                  </Box>
                )}

                <LanguageToggler />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar;
