import { Avatar, Box, Typography } from "@mui/material";
import SocialBox from "../social-box";
import { downArrow, login, logo, message } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggler from "../lang-toggler";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  return (
    <>
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

          <Box
            component={"img"}
            alt="Logo"
            loading="lazy"
            src={logo}
            sx={{ width: { md: "170px", lg: "auto" } }}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <Box
              sx={{
                display: "flex",
                columnGap: { md: "20px", lg: "45px" },
                alignItems: "center",
              }}
            >
              {user ? (
                <Box
                  sx={{
                    backgroundColor: "#053E7C",
                    borderRadius: "5px",
                    p: "5px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "136px",
                    // height: "35px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ width: "24px", height: "24px" }} alt="" />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "2px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "15.51px",
                          fontWeight: "500",
                        }}
                      >
                        John
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "7.89px",
                          fontWeight: "500",
                        }}
                      >
                        John@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  <img src={downArrow} alt="Icon" />
                </Box>
              ) : (
                <Link
                  to={"/signup"}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    columnGap: "3px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#007BFF",
                      fontSize: { md: "13px", lg: "17px" },
                    }}
                  >
                    {t("signup")}
                  </Typography>
                  <img src={login} alt="Icon" />
                </Link>
              )}

              <LanguageToggler />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: language === "ar" ? "flex-start" : "flex-end",
                width: "100%",
              }}
            >
              <img src={message} alt="" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
