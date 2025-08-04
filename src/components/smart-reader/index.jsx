import { Box, Typography, IconButton } from "@mui/material";
import { memo } from "react";
import SmartReaderIcon from "../../assets/icons/smart-read.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useTTS from "../../hooks/useTTS";

const SmartReaderCard = ({ paragraphs }) => {
  const { speak, stop, isSpeaking } = useTTS();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

   const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(paragraphs, language === "ar" ? "ar-SA" : "en-US");
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "400",
          textAlign: language === "ar" ? "right" : "center",
        }}
      >
        {t("Click Here")}
      </Typography>

      <IconButton
        onClick={handleClick}
        disableRipple
        aria-label={t("Open Smart Reader")}
        sx={{
          p: 0,
          background: "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)",
          height: 46,
          width: 46,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={SmartReaderIcon}
          alt={t("Smart Reader Icon")}
          loading="lazy"
          decoding="async"
          style={{ width: 19, height: 19 }}
        />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          fontSize: "18px",
          fontWeight: "400",
          textAlign: language === "ar" ? "right" : "center",
        }}
      >
        {t("Smart Reader")}
      </Typography>
    </Box>
  );
};

export default memo(SmartReaderCard);
