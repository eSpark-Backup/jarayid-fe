import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useLanguageSwitcher from "../../hooks/change-language";
import { useSelector } from "react-redux";
import { getFont } from "../../utils";

const LanguageToggler = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useLanguageSwitcher();
  const language = useSelector((state) => state.language);
  return (
    <Box
      onClick={() => switchLanguage(language === "en" ? "ar" : "en")}
      sx={{
        height: "38px",
        width: "110px",
        backgroundColor: "#ECECEC",
        border: "1px solid #E8E0E0",
        borderRadius: "21px",
        p: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "24px",
          height: "24px",
          border: "1px solid #004A99",
          background: "linear-gradient(180deg, #007BFF 32.36%, #004A99 97.76%)",
          borderRadius: "50%",
          position: "absolute",
          top: "7px",
          left: language === "ar" ? "5px" : "75px",
          transition: "left 0.3s ease",
        }}
      ></Box>

      <Typography
        sx={{
          color: "#4A4A4B",
          fontSize: getFont("17.36px"),
          fontWeight: "500",
          marginLeft: language === "ar" ? "30px" : "10px",
          transition: "margin 0.3s ease",
        }}
      >
        {language === "en" ? "English" : "Arabic"}
      </Typography>
    </Box>
  );
};

export default LanguageToggler;
