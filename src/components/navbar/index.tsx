import {
  Avatar,
  Box,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SocialBox from "../social-box";
import { blueSearch, downArrow, login, logo, message } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggler from "../lang-toggler";
import { useEffect, useState, useRef } from "react";
import { otherSettingsNavbarItems } from "../../constant";
import DynamicModal from "../modal";
import EditProfileModal from "../edit-profile-modal";
import AdvertiseModal from "../advertise-modal";
import SubscriptionModal from "../subscription-modal";
import ContactModal from "../contact-modal";
import ShareModal from "../share-modal";
import ConfirmModal from "../confirm-modal";
import QRModal from "../qr-modal";
import CustomInput from "../input";
import { logout } from "../../store/slices/auth";
import { useAuth0 } from "@auth0/auth0-react";
import EditSourceModal from "../edit-source-modal";
import { useSoicalLinksQuery } from "../../services/feed";
import { addLinks } from "../../store/slices/social.js";
import { addSearch } from "../../store/slices/chatbot.js";
import FontSizeModal from "../font-size-modal/index.jsx";
import { getFont } from "../../utils/index.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout: logoutAsGoogle } = useAuth0();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [fontSizeModal, setFontSizeModal] = useState(false);
  const [advertiseModal, setAdvertiseModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const [editSource, setEditSource] = useState(false);
  const value = useSelector((state) => state.chatbot.value);
  const location = useLocation();
  const { fontType } = useSelector((state) => state?.font);

  const { data: socialLinks, isLoading: socailLinksLoading } =
    useSoicalLinksQuery({ page: 1, limit: 10 });

  const navigate = useNavigate();

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
      setAnchorEl(null);
    } else if (event === "Advertise Here") {
      setAdvertiseModal(true);
      setAnchorEl(null);
    } else if (event === "Subscription") {
      setSubscriptionModal(true);
      setAnchorEl(null);
    } else if (event === "Contact Us") {
      // setContactModal(true);
      navigate("/contact-us");
      setAnchorEl(null);
    } else if (event === "Share Jarayid") {
      setShareModal(true);
      setAnchorEl(null);
    } else if (event === "Logout") {
      setLogoutModal(true);
      setAnchorEl(null);
    } else if (event === "Smart QR Code To Download The App") {
      setQrModal(true);
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
    } else if (event === "Jarayid Social Media") {
      setSocialModal(true);
      setAnchorEl(null);
    } else if (event === "Edit New Source") {
      setEditSource(true);
      setAnchorEl(null);
    } else if (event === "Font Size") {
      setFontSizeModal(true);
    }
  };

  const [chatAi, setChatAi] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setChatAi(false);
      }
    };
    if (chatAi) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatAi]);

  useEffect(() => {
    if (socialLinks) {
      dispatch(addLinks(socialLinks?.data?.socialMediaLinks));
    }
  }, [socialLinks]);

  useEffect(() => {
    if (value) {
      if (location?.search === "") {
        navigate("/");
      }
    }
  }, [value]);

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "90%",
            py: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <SocialBox />

          <Box
            component={"img"}
            alt="Logo"
            loading="lazy"
            src={logo}
            sx={{
              width: { md: "170px", lg: "auto" },
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => navigate("/")}
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
              {token && user ? (
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
                    height: fontType === "regular" ? "35px" : "40px",
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
                    <Avatar
                      src={user?.image}
                      sx={{ width: "24px", height: "24px" }}
                      alt="profile"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        // rowGap: "2px",
                        rowGap: "0px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: getFont("15.51px"),
                          fontWeight: "500",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "70px",
                          whiteSpace: "nowrap",
                          lineHeight: "unset",
                          // lineHeight: "10px",
                        }}
                      >
                        {user?.name?.slice(0, 5) || "Name"}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: getFont("7.89px"),
                          fontWeight: "500",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "70px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user?.email}
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
                      fontSize: { md: getFont("13px"), lg: getFont("17px") },
                      fontWeight: "500",
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
              onClick={() => setChatAi(true)}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
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
            fontSize: getFont("23.67px"),
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
                fontSize: getFont("15.7px"),
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
        <SubscriptionModal onClose={() => setSubscriptionModal(false)} />
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
        handleAccept={() => {
          dispatch(logout());
          isAuthenticated &&
            logoutAsGoogle({ returnTo: window.location.origin });
          setLogoutModal(false);
        }}
        handleCancel={() => setLogoutModal(false)}
        button2Text={"Logout"}
      >
        <Typography
          sx={{
            fontSize: getFont("16px"),
            fontWeight: "400",
            opacity: "56%",
            textAlign: language === "ar" ? "right" : "left",
          }}
        >
          {t("Are you sure you want to Logout?")}
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
      <DynamicModal
        open={fontSizeModal}
        handleClose={() => setFontSizeModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <FontSizeModal />
      </DynamicModal>
      <Box
        ref={boxRef}
        sx={{
          transition: "top 1s ease-in-out",
          position: "absolute",
          top: chatAi ? 0 : "-60vh",
          left: 0,
          width: "100%",
          height: "60vh",
          background: "#C8C7C799",
          backdropFilter: "blur(12.699999809265137px)",
          borderRadius: "0 0 50px 50px",
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "> div": { width: "70%" },
        }}
      >
        <CustomInput
          modal
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <img
                  src={blueSearch}
                  alt=""
                  style={{ width: 26, height: 26 }}
                />
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={(e) => dispatch(addSearch(e.target.value))}
          placeholder="Search here..."
          sx={{
            width: "100%",
            height: "71px",
            color: "#A098AE",
            padding: "12px",
            input: {
              height: "100%",
              padding: 0,
              color: "#A098AE",
              fontSize: getFont("14.7px"),
              fontWeight: 700,
            },
            ".MuiInputBase-root": {
              height: "100%",
            },
            borderRadius: "11px",
            background: "#DBEDFF",
            boxShadow: "0px 0px 19px 0px #00000040",
            fieldset: {
              borderRadius: "11px",
              border: "none",
              outline: "none",
            },
            border: "none",
            outline: "none",
          }}
        />
      </Box>
    </>
  );
};

export default Navbar;
