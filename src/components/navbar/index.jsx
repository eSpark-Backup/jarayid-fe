import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import SocialBox from "../social-box";
import { downArrow, login, logo, message } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggler from "../lang-toggler";
import { useState } from "react";
import { otherSettingsNavbarItems } from "../../constant";
import DynamicModal from "../modal";
import EditProfileModal from "../edit-profile-modal";
import AdvertiseModal from "../advertise-modal";
import SubscriptionModal from "../subscription-modal";
import ContactModal from "../contact-modal";
import ShareModal from "../share-modal";
import ConfirmModal from "../confirm-modal";
import QRModal from "../qr-modal";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [advertiseModal, setAdvertiseModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    if (event === "Edit Profile") {
      setEditProfileModal(true);
    } else if (event === "Advertise Here") {
      setAdvertiseModal(true);
    } else if (event === "Subscription") {
      setSubscriptionModal(true);
    } else if (event === "Contact Us") {
      setContactModal(true);
    } else if (event === "Share Jarayid") {
      setShareModal(true);
    } else if (event === "Logout") {
      setLogoutModal(true);
    } else if (event === "Smart QR Code To Download The App") {
      setQrModal(true);
    }
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
            onClick={() => handleMenuClick(item)}
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
        <ShareModal />
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </Typography>
      </ConfirmModal>
      <DynamicModal
        open={qrModal}
        handleClose={() => setQrModal(false)}
        sx={{
          padding: { xs: "25px 15px 15px 15px", lg: "35px 20px 20px 20px" },
          maxWidth: "636px",
        }}
      >
        <QRModal />
      </DynamicModal>
    </>
  );
};

export default Navbar;
