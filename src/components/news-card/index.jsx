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
        // alignItems: "center",
        justifyContent: "space-between",
        flexDirection: {
          // xs: "row",
          xs: language === "ar" ? "row-reverse" : "row",
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
      <Box sx={{ flex: 1 }}>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: language === "ar" ? "flex-start" : "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "8 px", md: "14px", lg: "17.6px" },
              color: "#007BFF",
              textAlign: {
                // : "center",
                xs: language === "ar" ? "left" : "right",
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
            }}
            title={source}
            component={"h3"}
          >
            {`${t("Source")}: ${source}`}
          </Typography>
        </Box> */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: "100%",
            flexDirection: {
              xs: "column",
              // md: language === "ar" ? "row-reverse" : "row",
            },
            // gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "15.49px", md: "18px", lg: "22.49px" },
              whiteSpace: "normal",
              fontWeight: "600",
              maxWidth: "100%",
              [language === "ar" ? "marginRight" : "marginLeft"]: "10px",
              textAlign: language === "ar" ? "right" : "left",
              alignSelf: {
                xs: language === "ar" ? "flex-end" : "flex-start",
                md: "flex-start",
              },
            }}
            component={"h2"}
            title={headline}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {headline}
          </Typography>
          {/* <Typography
            sx={{
              width: { xs: "max-content", md: "200px" },
              mt: { xs: "0px", md: "5px" },
              color: "#8F8F8F",
              fontSize: { xs: "7px", sm: "14px", md: "9.82px", lg: "12px" },
              mb: { xs: "0px", md: "5px" },
              alignSelf: {
                xs: language === "ar" ? "flex-start" : "flex-end",
                md: "flex-start",
              },
              textAlign: {
                xs: language === "ar" ? "left" : "right",
              },
            }}
            component={"h5"}
          >
            {dayjs(date)
              .locale(language === "ar" ? "ar" : "en")
              .fromNow()}
          </Typography> */}
          <Box
            sx={{
              px: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SocialBox newsCard={true} shareLinks={shareLinks} id={id} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "8 px", md: "12px" },
                  color: "#007BFF",
                  textAlign: {
                    // : "center",
                    // xs: language === "ar" ? "left" : "right",
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
                }}
                title={source}
                component={"h3"}
              >
                {`${source}`}
              </Typography>
              <Typography
                sx={{
                  // width: { xs: "max-content", md: "200px" },
                  mt: { xs: "0px", md: "5px" },
                  color: "#8F8F8F",
                  fontSize: { xs: "7px", sm: "14px", md: "9.82px", lg: "12px" },
                  mb: { xs: "0px", md: "5px" },
                  alignSelf: {
                    // xs: language === "ar" ? "flex-start" : "flex-end",
                    // md: "flex-start",
                  },
                  textAlign: {
                    // xs: language === "ar" ? "left" : "right",
                  },
                }}
                component={"h5"}
              >
                {dayjs(date)
                  .locale(language === "ar" ? "ar" : "en")
                  .fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: language === "ar" ? "flex-start" : "flex-end",
          }}
        >
          <SocialBox newsCard={true} shareLinks={shareLinks} id={id} />
        </Box> */}
      </Box>

      {/* <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "15.49px", md: "18px", lg: "22.49px" },
            whiteSpace: "normal",
            fontWeight: "600",
            maxWidth: "100%",
            [language === "ar" ? "marginRight" : "marginLeft"]: "10px",
            textAlign: language === "ar" ? "right" : "left",
          }}
          component={"h2"}
          title={headline}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {headline}
        </Typography>
      </Box> */}

      {/* <Box
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
          {`${t("Source")}: ${source}`}
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
      </Box> */}
    </Paper>
  );
};

export default NewsCard;
