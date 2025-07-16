import { Box, Paper, Typography } from "@mui/material";
import { news1 } from "../../assets";
import SocialBox from "../social-box";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NewsCard = ({ image, source }) => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          md: language === "ar" ? "row-reverse" : "row",
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt="News image"
        sx={{
          width: { xs: "100%", md: "180px" },
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Headline */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "22.49px", md: "18px", lg: "22.49px" },
            mb: "20px",
            whiteSpace: {
              xs: "normal",
              md: "nowrap",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
        >
          {t("newsHeadline")}
        </Typography>
      </Box>

      {/* Right Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          alignItems: {
            xs: "center",
            md: language === "ar" ? "flex-start" : "flex-end",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "14.35px", lg: "17.6px" },
            color: "#007BFF",
            textAlign: {
              xs: "center",
              md: language === "ar" ? "left" : "right",
            },
          }}
        >
          Source: {source}
        </Typography>
        <Typography
          sx={{
            mt: "25px",
            color: "#8F8F8F",
            fontSize: "12.07px",
            mb: "15px",
            textAlign: {
              xs: "center",
              md: language === "ar" ? "left" : "right",
            },
          }}
        >
          {t("date")}
        </Typography>
        <SocialBox newsCard={true} />
      </Box>
    </Paper>
  );
};

export default NewsCard;
