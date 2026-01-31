import { Box, Typography } from "@mui/material";
import { bell, bellActive, chatbot, chatbotActive, home } from "../../assets";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MobileFooter = ({ handleClick }) => {
  const [activeItem, setActiveItem] = useState("home");
  const { t } = useTranslation();

  const handleItemClick = (item) => {
    if (item === "notification") {
      setActiveItem("bell");
    } else {
      setActiveItem(item);
    }
    handleClick(item);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        backgroundColor: "#FFFFFF",
        zIndex: 999,
        width: "100%",
        // py: "20px",
        // px: "20px",
        p: "20px 40px",
        display: { xs: "flex", md: "none" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "6px",
          alignItems: "center",
        }}
        onClick={() => handleItemClick("notification")}
      >
        <Box
          component={"img"}
          src={activeItem === "bell" ? bellActive : bell}
          sx={{ width: "24px", height: "24px" }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            color: activeItem === "bell" ? "#007BFF" : "#484C52",
          }}
        >
          {t("Notification")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "6px",
          pb: "45px",
          alignItems: "center",
        }}
        onClick={() => handleItemClick("home")}
      >
        <Box
          sx={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background:
              activeItem === "home"
                ? "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)"
                : "#484C52",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            src={home}
            alt="Icon"
            sx={{ width: "24px", height: "24px" }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#484C52",
            textAlign: "center",
          }}
        >
          {t("home")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "6px",
          alignItems: "center",
        }}
        onClick={() => handleItemClick("chatbot")}
      >
        <Box
          component={"img"}
          src={activeItem === "chatbot" ? chatbotActive : chatbot}
          sx={{ width: "24px", height: "24px" }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            color: activeItem === "chatbot" ? "#007BFF" : "#484C52",
          }}
        >
          {t("Chatbot")}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileFooter;
