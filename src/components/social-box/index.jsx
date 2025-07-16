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
  youtube,
} from "../../assets";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SocialBox = ({ newsCard }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: { xs: newsCard ? "2px" : "10px", md: "10px" },
      }}
    >
      <Box sx={{ display: "flex", columnGap: { xs: "3px", md: "9px" } }}>
        {newsCard ? (
          <>
            <Box
              component={"img"}
              src={youtube}
              sx={{
                display: { xs: "block", md: "none" },
                width: "12px",
                height: "12px",
              }}
            />
            <Box
              component="img"
              src={comment}
              alt="Comment"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
            />
            <Box
              component="img"
              src={save}
              alt="Save"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
            />
            <Box
              component="img"
              src={like}
              alt="Like"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
            />
            <Box
              component="img"
              src={twitter}
              alt="Twitter"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
            />
            <Box
              component="img"
              src={facebook}
              alt="Facebook"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
            />
            <Box
              component="img"
              src={whatsapp}
              alt="WhatsApp"
              sx={{
                width: { xs: "12px", md: "21px" },
                height: { xs: "12px", md: "21px" },
              }}
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
            fontSize: { xs: "7px", md: "12px" },
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
