import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography } from "@mui/material";
import ConfirmModal from "../../components/confirm-modal";
import NavLink from "./navlink";
import { adminSidebarNavs } from "../../constant";
import { logout } from "../../store/slices/auth";
import { adminLogo, adminLogout } from "../../assets";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, logout: logoutAsGoogle } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    isAuthenticated &&
      logoutAsGoogle({ returnTo: window.location.origin + "/login" });
    navigate("/login");
  };

  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <Box
        ref={sidebarRef}
        sx={{
          position: { xs: "absolute", lg: "relative" },
          background: "#FFF",
          zIndex: 999,
          left: { xs: sidebarOpen ? 0 : "-268px", lg: 0 },
          transition: "left 0.5s ease-in-out",
          minWidth: "268px",
          width: "268px",
          height: "100vh",
          padding: "8px 0px 16px 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <img
            style={{
              width: "180px",
              height: "auto",
              paddingLeft: "41px",
            }}
            src={adminLogo}
            alt="logo"
          />
          <Box
            sx={{
              marginY: "22px",
              height: "calc(100vh - 180px)",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {adminSidebarNavs?.map((nav) => (
              <NavLink
                key={nav?.title}
                img={nav?.icon}
                name={nav?.title}
                link={nav?.link}
              />
            ))}
          </Box>
        </Box>
        <NavLink
          type="logout"
          img={adminLogout}
          name="Logout"
          handleClick={() => setOpen(true)}
        />
      </Box>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        heading={"Are you sure you want to Logout?"}
        handleAccept={handleLogout}
        handleCancel={() => setOpen(false)}
        button2Text={"Logout"}
        isAdmin={true}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "400", opacity: "56%" }}
        >
          Are you sure you want to Logout?
        </Typography>
      </ConfirmModal>
    </>
  );
};

export default Sidebar;
