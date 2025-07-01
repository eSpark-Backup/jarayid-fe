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
        columnGap: "100px",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          md: language === "ar" ? "row-reverse" : "row",
        },
      }}
    >
      {/* <img src={image} alt="News Image" style={{ width: "100%" }} /> */}
      <Box
        component={"img"}
        src={image}
        sx={{ width: { xs: "100%", md: "auto" } }}
        alt="News image"
      />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "22.49px", md: "18px", lg: "22.49px" },
            mb: "20px",
          }}
        >
          {t("newsHeadline")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "17.6px",
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
