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
import { useLocation, useNavigate } from "react-router-dom";
import CountryMenu from "../country-menu";
import DynamicModal from "../modal";
import EditProfileModal from "../edit-profile-modal";
import AdvertiseModal from "../advertise-modal";
import SubscriptionModal from "../subscription-modal";
import ContactModal from "../contact-modal";
import ShareModal from "../share-modal";
import ConfirmModal from "../confirm-modal";
import EditSourceModal from "../edit-source-modal";

const MobileNavbar = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useLanguageSwitcher();
  const language = useSelector((state) => state.language);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [advertiseModal, setAdvertiseModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [editSource, setEditSource] = useState(false);

  const navigate = useNavigate();

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

  const handleChoice = (event) => {
    if (event === "Edit Profile") {
      setEditProfileModal(true);
      setAnchorEl(null);
    } else if (event === "Advertise here") {
      setAdvertiseModal(true);
      setAnchorEl(null);
    } else if (event === "Subscription Jarayid Plus") {
      setSubscriptionModal(true);
      setAnchorEl(null);
    } else if (event === "Contact Us") {
      setContactModal(true);
      setAnchorEl(null);
    } else if (event === "Share the App") {
      setShareModal(true);
      setAnchorEl(null);
    } else if (event === "Logout") {
      setLogoutModal(true);
      setAnchorEl(null);
    } else if (event === "FAQs") {
      navigate("/faq");
      setAnchorEl(null);
    } else if (event === "Terms of Use") {
      navigate("/terms-of-use");
      setAnchorEl(null);
    } else if (event === "Privacy Policy") {
      navigate("/privacy-policy");
      setAnchorEl(null);
    } else if (event === "Read Later") {
      navigate("/read-later");
      setAnchorEl(null);
    } else if (event === "Jarayid Social Media Accounts") {
      setSocialModal(true);
      setAnchorEl(null);
    } else if (event === "Edit New Source") {
      setEditSource(true);
      setAnchorEl(null);
    }
  };

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
            style={{
              cursor: "pointer",
              visibility: !user ? "hidden" : "visible",
            }}
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
            onClick={() => handleChoice(item?.heading)}
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
      <DynamicModal
        open={editProfileModal}
        handleClose={() => setEditProfileModal(false)}
      >
        <EditProfileModal handleClose={() => setEditProfileModal(false)} />
      </DynamicModal>
      <DynamicModal
        open={advertiseModal}
        handleClose={() => setAdvertiseModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <AdvertiseModal handleSubmit={() => setAdvertiseModal(false)} />
      </DynamicModal>
      <DynamicModal
        open={subscriptionModal}
        handleClose={() => setSubscriptionModal(false)}
        sx={{
          padding: {
            xs: "15px",
            md: "20px 40px 20px 20px",
            lg: "30px 45px 30px 30px",
          },
        }}
      >
        <SubscriptionModal />
      </DynamicModal>
      <DynamicModal
        open={contactModal}
        handleClose={() => setContactModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <ContactModal handleSubmit={() => setContactModal(false)} />
      </DynamicModal>
      <DynamicModal
        open={shareModal}
        handleClose={() => setShareModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <ShareModal heading={"Share Jarayid"} />
      </DynamicModal>
      <ConfirmModal
        open={logoutModal}
        handleClose={() => setLogoutModal(false)}
        heading={"Are you sure you want to Logout?"}
        handleAccept={() => setLogoutModal(false)}
        handleCancel={() => setLogoutModal(false)}
        button2Text={"Logout"}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "400", opacity: "56%" }}
        >
          Are you sure you want to Logout?
        </Typography>
      </ConfirmModal>
      <DynamicModal
        open={socialModal}
        handleClose={() => setSocialModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <ShareModal heading={"Jarayid Social Media"} />
      </DynamicModal>
      <DynamicModal
        open={editSource}
        handleClose={() => setEditSource(false)}
        sx={{
          padding: { xs: "15px", md: "20px", lg: "25px" },
          maxWidth: "910px",
        }}
      >
        <EditSourceModal />
      </DynamicModal>
    </>
  );
};

export default MobileNavbar;
