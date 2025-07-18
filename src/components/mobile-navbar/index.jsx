import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  backArrow,
  forwardArrow,
  logo,
  menu,
  settings,
  userBlack,
} from "../../assets";
import { countries, otherSettings, settingsMenuItems } from "../../constant";
import CustomSwitch from "../custom-switch";
import useLanguageSwitcher from "../../hooks/change-language";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import CountryMenu from "../country-menu";

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

  const handleClose2 = () => {
    setAnchorEl2(null);
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
            src={userBlack}
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
      <CountryMenu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        navbar={true}
      />
    </>
  );
};

export default MobileNavbar;
