import React, { useState } from "react";
import { Menu, Box, Typography, MenuItem } from "@mui/material";
import { countries, settingsMenuItems } from "../../constant";
import { backArrow, forwardArrow } from "../../assets";
import CustomSwitch from "../custom-switch";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CountryMenu = ({ anchorEl, open, onClose, navbar }) => {
  const [showCountries, setShowCountries] = useState(false);
  const [state, setState] = useState({});
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  const handleToggle = (item) => {
    setState((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleCountryClick = () => {
    setShowCountries(true);
  };

  const handleCloseWithBack = () => {
    if (showCountries) {
      setShowCountries(false);
    } else {
      onClose();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseWithBack}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#fff",
          color: "#fff",
          borderRadius: "0px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3) !important",
          width: "340px",
          maxHeight: "85vh !important",
          overflowY: "auto",
          position: "fixed",
          ...(navbar && {
            // left: `10% !important`,
            top: "5%",
            transform: "translate(-50%, -50%)",
          }),
          // left: `10% !important`,
          top: "5%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      {showCountries ? (
        <Box>
          <Box
            sx={{
              //   pt: "15px",
              display: "flex",
              columnGap: "15px",
              justifyContent: "center",
            }}
          >
            {!navbar && (
              <img
                src={backArrow}
                alt="Back Arrow"
                style={{ cursor: "pointer" }}
                onClick={() => setShowCountries(false)}
              />
            )}
            <Typography
              sx={{
                fontSize: "23.67px",
                color: "#004A99",
                textAlign: "center",
              }}
            >
              {t("Country Categories")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {countries?.slice(0, 17)?.map((item, index) => (
              <MenuItem
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography>{t(item)}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              height: "40px",
              width: "100%",
              background: "linear-gradient(180deg, #007BFF 33%, #004A99 100%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "8.98px 11.2px",
              mb: "15px",
              flexDirection: language === "ar" ? "row-reverse" : "row",
              cursor: "pointer",
            }}
            onClick={handleCountryClick}
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
                  mt: index > 0 ? "20px" : "0px",
                  fontFamily: "Gilroy-Heavy",
                  fontWeight: "400",
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
                  <Typography
                    fontWeight={500}
                    fontSize="20px"
                    color="black"
                    sx={{ fontFamily: "Gilroy-Medium", fontWeight: "400" }}
                  >
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
  );
};

export default CountryMenu;
