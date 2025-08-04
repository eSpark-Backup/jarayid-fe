import { Box, Paper, Typography } from "@mui/material";
import { news1 } from "../../assets";
import SocialBox from "../social-box";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

dayjs.extend(relativeTime);

const NewsCard = ({ image, source, id, headline, date, shareLinks }) => {
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
        borderBottom: "1px solid #5c5c5c !important",
        borderRadius: "0px !important",
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
            fontWeight: "700",
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            fontFamily: "Gilroy-Bold",
          }}
          component={"h2"}
          title={headline}
        >
          {headline?.length > 25 ? `${headline.substring(0, 25)}...` : headline}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          alignItems: {
            xs: "flex-end",
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
            whiteSpace: {
              xs: "normal",
              md: "nowrap",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textAlignLast: { xs: "right", lg: "unset" },
          }}
          title={source}
          component={"h3"}
        >
          {language === "ar" ? (
            <>
              {source?.length > 30 ? `${source.substring(0, 30)}...` : source}
              {":" + t("Source")}
            </>
          ) : (
            <>
              {t("Source") + ": "}
              {source?.length > 30 ? `${source.substring(0, 30)}...` : source}
            </>
          )}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "9px", md: "18px", lg: "22.49px" },
            display: { xs: "block", sm: "none" },
            whiteSpace: {
              xs: "normal",
              md: "nowrap",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            fontWeight: "700",
            maxWidth: "100%",
            WebkitLineClamp: 1, // Show only 1 line
            WebkitBoxOrient: "vertical",
            fontFamily: "Gilroy-Bold",
          }}
          component={"h2"}
        >
          {headline?.length > 25 ? `${headline.substring(0, 25)}...` : headline}
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
          {dayjs(date)
            .locale(language === "ar" ? "ar" : "en")
            .fromNow()}
        </Typography>
        <SocialBox newsCard={true} shareLinks={shareLinks} id={id} />
      </Box>
    </Paper>
  );
};

export default NewsCard;
