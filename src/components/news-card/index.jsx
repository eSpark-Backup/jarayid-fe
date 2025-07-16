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
          xs: "row",
          md: language === "ar" ? "row-reverse" : "row",
        },
        px: { xs: "10px", md: "15px" },
      }}
    >
      <Box
        component="img"
        src={image}
        alt="News image"
        sx={{
          width: { xs: "111px", md: "180px" },
          objectFit: "cover",
          flexShrink: 0,
          height: "100px",
          borderRadius: { xs: "4.7px", md: "7px" },
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: { xs: "none", md: "block" },
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          alignItems: {
            xs: "center",
            md: language === "ar" ? "flex-start" : "flex-end",
          },
          rowGap: "2px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "8px", lg: "17.6px" },
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
            fontSize: { xs: "9px", md: "18px", lg: "22.49px" },
            whiteSpace: {
              xs: "normal",
              md: "nowrap",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            display: { xs: "block", md: "none" },
          }}
        >
          {t("newsHeadline")}
        </Typography>
        <Typography
          sx={{
            mt: { xs: "0px", md: "25px" },
            color: "#8F8F8F",
            fontSize: { xs: "7px", md: "12.07px" },
            mb: { xs: "0px", md: "15px" },
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
