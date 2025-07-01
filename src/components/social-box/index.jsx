import { Box, Typography } from "@mui/material";
import {
  comment,
  facebook,
  instagram,
  like,
  save,
  tiktok,
  twitter,
  whatsapp,
} from "../../assets";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SocialBox = ({ newsCard }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Box sx={{ display: "flex", columnGap: "9px" }}>
        {newsCard ? (
          <>
            <img
              src={comment}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
            <img
              src={save}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
            <img
              src={like}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
            <img
              src={twitter}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
            <img
              src={facebook}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
            <img
              src={whatsapp}
              alt="Icon"
              style={{ width: "21px", height: "21px" }}
            />
          </>
        ) : (
          <>
            <img src={facebook} alt="Icon" />
            <img src={instagram} alt="Icon" />
            <img src={tiktok} alt="Icon" />
            <img src={twitter} alt="Icon" />
            <img src={whatsapp} alt="Icon" />
          </>
        )}
      </Box>
      {newsCard ? (
        <Typography
          sx={{
            textAlign: {
              xs: "center",
              md: language === "ar" ? "left" : "right",
            },
          }}
        >
          {t("shareNews")}
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              textAlign: language === "ar" ? "right" : "left",
              color: language === "ar" ? "#8F8F8F" : "black",
            }}
          >
            {t("followUs")}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#8F8F8F",
              textAlign: language === "ar" ? "right" : "left",
            }}
          >
            {t("date")}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SocialBox;
