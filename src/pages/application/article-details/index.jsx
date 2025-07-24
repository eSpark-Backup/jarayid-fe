import { lazy } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { SocialBox, CustomSwiper, NewsCard } from "../../../components";
const SmartReaderCard = lazy(() => import("../../../components/smart-reader"));
import { relativeNews } from "../../../constant";
import { image1, image2, sideImage, newsIcon } from "../../../assets";
import CommentBox from "../../../components/comments";

const ArticleDetails = () => {
  const isTablet = useMediaQuery("(max-width:800px)");
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);

  return (
    <Stack direction="row" justifyContent="center" alignItems="flex-start">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ width: { xs: "90%", sm: "80%", lg: "786px" } }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "738px" },
            height: "134px",
            borderRadius: "6px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={image1}
            alt="ad"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "500px", lg: "738px" }, my: 2 }}>
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <img
              style={{ width: "152px", height: "86px" }}
              src={newsIcon}
              alt="news-logo"
            />
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "16px" },
                color: "#3835357A",
                ml: "40px",
                mt: "-10px",
              }}
            >
              Time: 10:00 pm
            </Typography>
          </Stack>
          <Typography
            mt={2}
            padding="0px 16px"
            lineHeight="114.99999999999999%"
            textAlign="center"
            fontWeight={800}
            fontFamily="Mondia"
            sx={{
              letterSpacing: "0.7px",
              fontSize: { xs: "18px", sm: "35px" },
            }}
          >
            {t("article_detail_title")}
          </Typography>
        </Box>
        <CustomSwiper />
        <Box
          sx={{
            width: { xs: "100%", md: "500px", lg: "738px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ padding: "0px 8px" }}>
            <Typography
              mt={2}
              textAlign="center"
              fontWeight={400}
              sx={{ fontSize: { xs: "12px", sm: "20px" } }}
            >
              {t("para1")}
            </Typography>
            <Typography
              mt={2}
              textAlign="center"
              fontWeight={400}
              sx={{ fontSize: { xs: "12px", sm: "20px" } }}
            >
              {t("para2")}
            </Typography>
            <Typography
              textAlign="center"
              mt={4}
              sx={{
                padding: { xs: "0px 22px", sm: "22px" },
                fontSize: { xs: "10px", sm: "18px" },
              }}
              fontWeight={700}
            >
              {t("notice")}
            </Typography>
          </Box>
          <Button
            variant="gradient"
            sx={{
              my: 2,
              padding: "0px",
              borderRadius: { xs: "5.14px", sm: "10.08px" },
              fontSize: { xs: "9.14px", sm: "17.92px" },
              width: { xs: "102px", sm: "200px" },
              height: { xs: "20px", sm: "40px" },
            }}
          >
            {t("article_details_button")}
          </Button>
          <SocialBox detailPage />
          <Typography
            sx={{ cursor: "pointer" }}
            mt={1}
            textAlign="center"
            fontSize="12px"
            fontWeight={600}
          >
            {t("share_news")}
          </Typography>
          <CommentBox />
          <Box
            sx={{
              width: { xs: "100%", lg: "738px" },
              height: "134px",
              borderRadius: "6px",
              mt: 3,
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={image2}
              alt="ad"
            />
          </Box>
        </Box>
        <Typography
          sx={{ fontSize: { xs: "18px", sm: "35px" } }}
          fontWeight={800}
          fontFamily="Mondia"
          textAlign={language === "ar" ? "right" : "left"}
          padding="14px 32px"
          width="100%"
        >
          {t("most_read")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            background: "#EDEDED",
            padding: "26px 20px",
            mb: "43px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {relativeNews?.map((item, index) => (
            <NewsCard
              key={index}
              image={item?.image}
              headline={item?.headline}
              date={item?.date}
              source={item?.source}
              id={item?.id}
            />
          ))}
        </Box>
      </Stack>
      {!isTablet && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "330px",
              left: "40px",
            }}
          >
            <SmartReaderCard />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "300px",
              right: { xs: "5px", lg: "80px" },
            }}
          >
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              sx={{ display: { xs: "flex", sm: "block" } }}
            >
              <img
                style={{ width: "152px", height: "86px" }}
                src={newsIcon}
                alt="news-logo"
              />
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "16px" },
                  color: "#3835357A",
                  ml: "40px",
                  mt: "-10px",
                }}
              >
                Time: 10:00 pm
              </Typography>
            </Stack>
            <Box
              sx={{ marginTop: "25px", width: { xs: "153px", lg: "215px" } }}
            >
              <img style={{ width: "100%" }} src={sideImage} alt="add" />
            </Box>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ArticleDetails;
