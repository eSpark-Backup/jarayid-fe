import { Box, Paper, Typography } from "@mui/material";
import { news1 } from "../../assets";
import SocialBox from "../social-box";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ image, source, id }) => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${id}`)}
    >
      <Box
        component="img"
        src={image}
        alt="News image"
        sx={{
          width: { xs: "111px", md: "153px", lg: "180px" },
          objectFit: "cover",
          flexShrink: 0,
          height: "100px",
          borderRadius: { xs: "4.7px", md: "7px" },
        }}
        loading="lazy"
      />

      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "15.49px", md: "18px", lg: "22.49px" },
            mb: "20px",
            whiteSpace: {
              xs: "normal",
              md: "nowrap",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
          component={"h2"}
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
            fontSize: { xs: "8 px", md: "14px", lg: "17.6px" },
            color: "#007BFF",
            textAlign: {
              xs: "center",
              md: language === "ar" ? "left" : "right",
            },
          }}
          component={"h3"}
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
            display: { xs: "block", sm: "none" },
          }}
          component={"h2"}
        >
          {t("newsHeadline")}
        </Typography>
        <Typography
          sx={{
            mt: { xs: "0px", md: "5px" },
            color: "#8F8F8F",
            fontSize: { xs: "7px", sm: "14px", md: "9.82px", lg: "12px" },
            mb: { xs: "0px", md: "5px" },
            textAlign: {
              xs: "center",
              md: language === "ar" ? "left" : "right",
            },
          }}
          component={"h5"}
        >
          {t("date")}
        </Typography>
        <SocialBox newsCard={true} />
      </Box>
    </Paper>
  );
};

export default NewsCard;
