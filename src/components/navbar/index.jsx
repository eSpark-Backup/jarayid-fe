import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import SocialBox from "../social-box";
import { downArrow, login, logo, message } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggler from "../lang-toggler";
import { useState } from "react";
import { otherSettings, otherSettingsNavbarItems } from "../../constant";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

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
                    cursor: "pointer",
                    // height: "35px",
                  }}
                  onClick={handleClick}
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#fff",
            borderRadius: "0px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3) !important",
            width: "400px",
            maxHeight: "85vh !important",
            overflowY: "auto",
            position: "fixed",
          },
        }}
      >
        <Typography
          sx={{
            color: "#004A99",
            fontSize: "23.67px",
            textAlign: "center",
            pb: "20px",
          }}
        >
          Other Settings
        </Typography>
        {otherSettingsNavbarItems?.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                color: "#383535",
                fontSize: "15.7px",
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {t(item)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Navbar;
