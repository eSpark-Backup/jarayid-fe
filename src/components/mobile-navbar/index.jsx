import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { backArrow, forwardArrow, logo, menu, settings } from "../../assets";
import { countries, otherSettings, settingsMenuItems } from "../../constant";
import CustomSwitch from "../custom-switch";
import useLanguageSwitcher from "../../hooks/change-language";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useLanguageSwitcher();
  const language = useSelector((state) => state.language);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const [showCountries, setShowCountries] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);

    setTimeout(() => {
      setShowCountries(false);
    }, 300);
  };

  const [state, setState] = useState({
    Riyada: false,
    Taba: true,
    iktisad: false,
    mal: false,
  });

  const handleToggle = (name) => {
    setState((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/login" && pathname !== "/signup" && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            p: "28px 20px",
          }}
        >
          <img
            src={settings}
            alt="Icon"
            style={{ cursor: "pointer" }}
            onClick={handleClick2}
          />
          <img
            src={logo}
            alt="Logo"
            style={{ width: "124px", height: "42px" }}
          />
          <img
            src={menu}
            alt="Icon"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorReference="none"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#fff",
            borderRadius: "0px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3) !important",
            width: "80vw",
            maxHeight: "85vh !important",
            overflowY: "auto",
            position: "fixed",
            left: "10% !important",
            top: "5%",
            transform: "translate(-50%, -50%)",
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
        {otherSettings?.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              display: "flex",
              flexDirection: language === "ar" ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: language === "ar" ? "end" : "flex-start",
              gap: "8px",
            }}
          >
            <img src={item?.icon} alt="Icon" />
            <Typography
              sx={{
                color: "#383535",
                fontSize: "15.7px",
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {t(item?.heading)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        anchorReference="none"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#fff",
            borderRadius: "0px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3) !important",
            width: "80vw",
            maxHeight: "85vh !important",
            overflowY: "auto",
            position: "fixed",
            left: "10% !important",
            top: "5%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {showCountries ? (
          <Box>
            <Box sx={{ pt: "15px", display: "flex", columnGap: "15px" }}>
              <Typography sx={{ fontSize: "23.67px", color: "#004A99" }}>
                Country Categories
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {countries?.slice(0, 17)?.map((item, index) => (
                <MenuItem key={index}>{t(item)}</MenuItem>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                height: "40px",
                width: "100%",
                background:
                  "linear-gradient(180deg, #007BFF 33%, #004A99 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "8.98px 11.2px",
                mb: "15px",
                flexDirection: language === "ar" ? "row-reverse" : "row",
              }}
              onClick={() => setShowCountries(true)}
            >
              <Typography sx={{ color: "white", fontSize: "17.96px" }}>
                {t("Lebanon")}
              </Typography>
              <img
                src={forwardArrow}
                alt="Icon"
                style={{
                  transform:
                    language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Box>

            {settingsMenuItems?.map((item, index) => (
              <Box key={index}>
                <Typography
                  sx={{
                    fontSize: "17.96px",
                    color: "#004A99",
                    textAlign: "center",
                    mt: index > 0 ? "20px" : "0px", // Add margin-top except for first item
                  }}
                >
                  {t(item.heading)}
                </Typography>
                {item.items.map((checkItem) => (
                  <Box
                    key={checkItem}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="2px solid #1976d2"
                    px={2}
                    py={1.5}
                    flexDirection={language === "ar" ? "row-reverse" : "row"}
                  >
                    <Typography fontWeight={500} fontSize="20px" color="black">
                      {checkItem}
                    </Typography>
                    <CustomSwitch
                      checked={state[checkItem]}
                      onToggle={() => handleToggle(checkItem)}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Menu>
    </>
  );
};

export default MobileNavbar;
