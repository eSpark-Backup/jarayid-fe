import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const NavLink = ({ img, name, type, link, handleClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = `/${pathname?.split("/")[1]}/${pathname?.split("/")[2]}`;
  return (
    <Box
      onClick={link ? () => navigate(link) : handleClick}
      sx={{
        cursor: "pointer",
        padding:
          type === "logout" ? "14px 14px 14px 45px" : "14px 14px 14px 41px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: type === "logout" ? "20px" : "13px",
        background: path === link ? "#3281CA" : "tranparent",
        borderRight: path === link ? "7px solid #004A99" : "none",
      }}
    >
      <img
        style={{
          width: "19px",
          height: "19px",
          filter:
            path === link
              ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7492%) hue-rotate(184deg) brightness(95%) contrast(105%)"
              : "",
        }}
        src={img}
        alt="sidebar-nav"
      />
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: type === "logout" ? "20px" : "16px",
          color:
            path === link ? "#FFF" : type === "logout" ? "#DF1C41" : "#6E6F70",
          fontFamily: "Gilroy-SemiBold",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default NavLink;
