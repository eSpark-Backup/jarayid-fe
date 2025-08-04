import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SocialBox, CustomSwiper, NewsCard } from "../../../components";
const SmartReaderCard = lazy(() => import("../../../components/smart-reader"));
import { relativeNews } from "../../../constant";
import { image1, image2, sideImage, newsIcon } from "../../../assets";
import CommentBox from "../../../components/comments";
import {
  useGetArticleByIdQuery,
  useGetCommentsQuery,
  useTrendingArticlesQuery,
} from "../../../services/feed";
import { useLocation } from "react-router-dom";
import { translateText } from "../../../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

dayjs.extend(relativeTime);

const ArticleDetails = () => {
  const isTablet = useMediaQuery("(max-width:800px)");
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
  const location = useLocation();
  const { pathname, state } = location;
  const [articleData, setArticleData] = useState({});
  const [tredningData, setTrendingData] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [commentsPage, setCommentsPage] = useState(1);
  const { data, isLoading, isFetching } = useGetArticleByIdQuery(pathname, {
    skip: !pathname,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [showOriginal, setShoworiginal] = useState(false);

  const hasMorePages = commentsPage < Math.ceil(totalComments / 3);

  const { data: trendingArticles, isLoading: tredningLoading } =
    useTrendingArticlesQuery({ page: 1, limit: 10 });

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery(
      { page: commentsPage, limit: 3, articleId: pathname },
      { skip: !pathname }
    );

  useEffect(() => {
    const data = commentsData?.data?.items?.map((item) => ({
      id: item?.id,
      name: item?.user?.name || "User",
      avatar: item?.user?.image,
      text: item?.content,
      date: dayjs(item?.createdAt).fromNow(),
    }));
    setComments(data);
    setTotalComments(commentsData?.data?.meta?.totalItems);
  }, [commentsData]);

  useEffect(() => {
    const updateArticleData = async () => {
      if (data) {
        const article = data?.data?.article;
        let translatedTitle = article?.title;
        const englishTitle =
          article?.originalContent?.scrapedContent?.translatedContent?.englishContent
            ?.split("-")[0]
            ?.replace("Title: ", "");
        const arabicTitle =
          article?.originalContent?.scrapedContent?.translatedContent?.arabicContent
            ?.split("-")[0]
            ?.replace("عنوان:", "");
        const originalTitle =
          article?.originalContent?.rssTranslatedContent?.originalContent
            ?.split("\n\n")[0]
            ?.replace("Title: ", "")
            ?.replace(` - ${article?.source?.split(" - ")[1]}`, "");
        const originalSummary =
          article?.originalContent?.rssTranslatedContent?.originalContent
            ?.split("\n\n")[2]
            ?.replace("Content:", "");
        const originalEnglishContent =
          article?.originalContent?.rssTranslatedContent?.englishContent?.split(
            "Content: "
          )[1];
        const originalArabicContent =
          article?.originalContent?.rssTranslatedContent?.englishContent?.split(
            "Content: "
          )[1];
        const sourceLanguage =
          article?.originalContent?.rssTranslatedContent?.sourceLanguage;

        // const isTitleArabic = /[\u0600-\u06FF]/.test(article?.title);

        // if (article?.title) {
        //   if (language === "ar" && !isTitleArabic) {
        //     translatedTitle = await translateText(article.title, "en", "ar");
        //   } else if (language === "en" && isTitleArabic) {
        //     translatedTitle = await translateText(article.title, "ar", "en");
        //   }
        // }

        setArticleData({
          ...articleData,
          title: translatedTitle,
          summaryArabic: article?.summaryArabic,
          summaryEnglish: article?.summaryEnglish,
          slides: [article?.image],
          time: article?.createdAt,
          shareLinks: article?.shareLinks,
          sourceImg: article?.rssFeed?.logo,
          originalArticle: article?.originalContent?.text,
          englishTitle,
          arabicTitle,
          originalTitle,
          originalSummary,
          originalEnglishContent,
          originalArabicContent,
          sourceLanguage,
        });
      }
    };

    updateArticleData();
  }, [data, language]);

  useEffect(() => {
    setArticleData({});
  }, [pathname]);

  useEffect(() => {
    const translateHeadlines = async () => {
      if (trendingArticles) {
        const translatedArticles = await Promise.all(
          trendingArticles?.data?.articles?.map(async (item) => {
            let headline = item?.title;
            const englishTitle =
              item?.originalContent?.scrapedContent?.translatedContent?.englishContent
                ?.split("-")[0]
                ?.replace("Title: ", "");
            const arabicTitle =
              item?.originalContent?.scrapedContent?.translatedContent?.arabicContent
                ?.split("-")[0]
                ?.replace("عنوان:", "");
            // const isArabic = /[\u0600-\u06FF]/.test(headline);

            // if (language === "ar" && !isArabic) {
            //   headline = await translateText(item?.title, "en", "ar");
            // }

            // if (language === "en" && isArabic) {
            //   headline = await translateText(item?.title, "ar", "en");
            // }

            return {
              id: item?.id,
              image: item?.image,
              headline,
              source: item?.source?.split("- ")[1],
              date: item?.createdAt,
              shareLinks: item?.shareLinks,
              englishTitle,
              arabicTitle,
            };
          })
        );
        setTrendingData(translatedArticles);
      }
    };

    translateHeadlines();
  }, [trendingArticles, language]);

  return (
    <Stack direction="row" justifyContent="center" alignItems="flex-start">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ width: { xs: "90%", sm: "80%", lg: "786px" } }}
      >
        {/* <Box
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
        </Box> */}
        <Box sx={{ width: { xs: "100%", md: "500px", lg: "738px" }, my: 2 }}>
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{ display: isTablet ? "flex" : "none" }}
          >
            {isLoading || isFetching ? (
              <Skeleton
                variant="rectangular"
                sx={{ width: "152px", height: "86px" }}
              />
            ) : (
              <img
                style={{ width: "152px", height: "86px" }}
                src={articleData?.sourceImg}
                alt="news-logo"
              />
            )}
            {isLoading || isFetching ? (
              <Skeleton variant="text" />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "16px" },
                  color: "#3835357A",
                  // ml: "40px",
                  // mt: "-10px",
                }}
              >
                Time:{" "}
                {dayjs(articleData?.time)
                  .locale(language === "ar" ? "ar" : "en")
                  .fromNow()}
              </Typography>
            )}
          </Stack>
          {isLoading || isFetching ? (
            <Skeleton variant="text" />
          ) : (
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
              {showOriginal && articleData?.sourceLanguage === language
                ? articleData?.originalTitle
                : language === "en"
                ? articleData?.englishTitle
                : articleData?.arabicTitle}
            </Typography>
          )}
        </Box>
        {(isLoading || isFetching) && !articleData?.slides ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "80%", md: "400px", lg: "100%" },
              height: "300px",
              mb: "20px",
            }}
          />
        ) : (
          <CustomSwiper slides={articleData?.slides} />
        )}
        <Box
          sx={{
            width: { xs: "100%", md: "500px", lg: "738px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ padding: "0px 8px" }}>
            {isLoading || isFetching ? (
              <Skeleton variant="text" />
            ) : (
              <Typography
                mt={2}
                textAlign="center"
                fontWeight={400}
                sx={{ fontSize: { xs: "12px", sm: "20px" } }}
              >
                {showOriginal
                  ? articleData?.sourceLanguage === language
                    ? articleData?.originalSummary
                    : language === "en"
                    ? articleData?.originalEnglishContent
                    : articleData?.originalArabicContent
                  : language === "ar"
                  ? articleData?.summaryArabic
                  : articleData?.summaryEnglish}
              </Typography>
            )}
            {!showOriginal && (
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
            )}
          </Box>
          <Button
            variant="gradient"
            sx={{
              my: 2,
              padding: "0px",
              borderRadius: { xs: "5.14px", sm: "10.08px" },
              fontSize: { xs: "9.14px", sm: "17.92px" },
              width: "max-content",
              height: { xs: "20px", sm: "40px" },
              px: "10px",
            }}
            onClick={() => setShoworiginal(!showOriginal)}
          >
            {showOriginal ? t("AI generated") : t("article_details_button")}
          </Button>
          <SocialBox detailPage shareLinks={articleData?.shareLinks} />
          <Typography
            sx={{ cursor: "pointer" }}
            mt={1}
            textAlign="center"
            fontSize="12px"
            fontWeight={600}
          >
            {t("share_news")}
          </Typography>
          {commentsLoading ? (
            <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="20%" height={20} />{" "}
                {/* Username */}
                <Skeleton variant="text" width="15%" height={16} />{" "}
                {/* Timestamp */}
                <Skeleton variant="text" width="90%" height={20} />{" "}
                {/* First line of comment */}
                <Skeleton variant="text" width="80%" height={20} />{" "}
                {/* Second line */}
              </Box>
            </Box>
          ) : (
            <CommentBox
              data={comments}
              total={totalComments}
              hasMore={hasMorePages}
              handleMore={() => setCommentsPage(commentsPage + 1)}
            />
          )}
          {/* <Box
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
          </Box> */}
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
          {tredningLoading
            ? [...Array(5)].map((_, index) => (
                <Skeleton
                  key={`skeleton-${index}`}
                  variant="rounded"
                  width="100%"
                  height={143}
                  sx={{ borderRadius: "9px" }}
                />
              ))
            : tredningData?.map((item, index) =>
                item?.ad ? null : ( // /> //   key={index} //   loading="lazy" //   alt="Ad" //   src={item?.ad} //   component={"img"} // <Box
                  <NewsCard
                    key={index}
                    image={item?.image}
                    headline={
                      language === "ar" ? item?.arabicTitle : item?.englishTitle
                    }
                    date={item?.date}
                    source={item?.source}
                    id={item?.id}
                    shareLinks={item?.shareLinks}
                  />
                )
              )}
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
            <SmartReaderCard
              paragraphs={`${
                showOriginal && articleData?.sourceLanguage === language
                  ? articleData?.originalTitle
                  : language === "en"
                  ? articleData?.englishTitle
                  : articleData?.arabicTitle
              }      ${
                showOriginal
                  ? articleData?.sourceLanguage === language
                    ? articleData?.originalSummary
                    : language === "en"
                    ? articleData?.originalEnglishContent
                    : articleData?.originalArabicContent
                  : language === "ar"
                  ? articleData?.summaryArabic
                  : articleData?.summaryEnglish
              }`}
            />
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
              {isLoading || isFetching ? (
                <Skeleton
                  sx={{ width: "152px", height: "86px" }}
                  variant="rectangular"
                />
              ) : (
                <img
                  style={{ width: "152px", height: "86px" }}
                  src={articleData?.sourceImg}
                  alt="news-logo"
                />
              )}
              {isLoading || isFetching ? (
                <Skeleton variant="text" />
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: "10px", sm: "16px" },
                    color: "#3835357A",
                    // ml: "40px",
                    // mt: "-10px",
                  }}
                >
                  Time:{" "}
                  {dayjs(articleData?.time)
                    .locale(language === "ar" ? "ar" : "en")
                    .fromNow()}
                </Typography>
              )}
            </Stack>
            {/* <Box
              sx={{ marginTop: "25px", width: { xs: "153px", lg: "215px" } }}
            >
              <img style={{ width: "100%" }} src={sideImage} alt="add" />
            </Box> */}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ArticleDetails;
