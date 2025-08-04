import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { logo2, pick1, pick2 } from "../../assets";
import { categoriesFooter, footerLinks } from "../../constant";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DynamicModal from "../modal";
import ContactModal from "../contact-modal";
import { useTrendingArticlesQuery } from "../../services/feed";
import { useGetAllPagesQuery } from "../../services/static-pages";
import { getFont, translateText } from "../../utils";

const Footer = () => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [contactModal, setContactModal] = useState(false);
  const { data, isLoading, refetch } = useTrendingArticlesQuery(
    { page: 1, limit: 3 },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const [footerData, setFooterData] = useState({});

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    refetch();
  }, [location]);

  const handleChoice = (item) => {
    if (item === "Term & Condition") {
      navigate("/terms-of-use");
    } else if (item === "Privacy Policy") {
      navigate("/privacy-policy");
    } else if (item === "FAQs") {
      navigate("/faq");
    } else if (item === "Contact Us") {
      // setContactModal(true);
      navigate("/contact-us");
    }
  };

  useEffect(() => {
    const updateTrendingArticles = async () => {
      if (!data) return;

      // const isArabic = (text) => /[\u0600-\u06FF]/.test(text);
      // const isEnglish = (text) => /^[A-Za-z0-9\s.,'":!?()&%$#@\-]*$/.test(text);

      const articles = await Promise.all(
        data?.data?.articles?.map(async (item) => {
          let translatedTitle = item?.title;
          const englishTitle =
            item?.originalContent?.scrapedContent?.translatedContent?.englishContent
              ?.split("-")[0]
              ?.replace("Title: ", "");
          const arabicTitle =
            item?.originalContent?.scrapedContent?.translatedContent?.arabicContent
              ?.split("-")[0]
              ?.replace("عنوان:", "");

          // if (language === "ar" && item?.title && isEnglish(item.title)) {
          //   translatedTitle = await translateText(item.title, "en", "ar");
          // } else if (language === "en" && item?.title && isArabic(item.title)) {
          //   translatedTitle = await translateText(item.title, "ar", "en");
          // }

          return {
            image: item?.image,
            title: translatedTitle,
            summaryArabic: item?.summaryArabic,
            summaryEnglish: item?.summaryEnglish,
            englishTitle,
            arabicTitle,
          };
        })
      );

      setArticles(articles);
    };

    updateTrendingArticles();
  }, [data, language]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "30px",
        backgroundColor: "#1D4167",
      }}
    >
      <Box
        sx={{
          p: { xs: "25px 20px", lg: "25px 90px" },
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            md: language === "ar" ? "row-reverse" : "row",
          },
          rowGap: "15px",
        }}
        component={"footer"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Box
            component={"img"}
            src={logo2}
            alt="Logo"
            loading="lazy"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            sx={{
              maxWidth: { xs: "150px", lg: "258px" },
              maxHeight: "87.54px",
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: getFont("9px"),
                md: getFont("9px"),
                lg: getFont("16px"),
              },
              color: "#fff",
              textAlign: language === "ar" ? "right" : "unset",
            }}
            component={"p"}
          >
            {t("footer1")}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: getFont("9px"),
                md: getFont("9px"),
                lg: getFont("16px"),
              },
              color: "#fff",
              textAlign: language === "ar" ? "right" : "unset",
            }}
            component={"p"}
          >
            {t("footer2")}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: getFont("9px"),
                md: getFont("9px"),
                lg: getFont("16px"),
              },
              color: "#fff",
              textAlign: language === "ar" ? "right" : "unset",
            }}
            component={"h3"}
          >
            {language === "ar" ? (
              <>
                {t("info@example.com")}: {t("email")}
                <br />
                {t("+91 54679865287")}: {t("phone")}
              </>
            ) : (
              <>
                {t("email")}: {t("info@example.com")}
                <br />
                {t("phone")}: {t("+91 54679865287")}
              </>
            )}
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "28%" } }}>
          <Typography
            sx={{
              fontSize: { xs: getFont("11px"), lg: getFont("20px") },
              color: "#FFFFFF",
              textAlign: language === "ar" ? "right" : "unset",
              fontWeight: "400",
              fontFamily: "Gilroy-Heavy",
            }}
            component={"h2"}
          >
            {t("picks")}
          </Typography>
          <Divider
            sx={{ backgroundColor: "#8F8F8F33", height: "3px", mt: "4px" }}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {isLoading
              ? // Render 3 skeletons as placeholders
                Array.from({ length: 3 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                      flexDirection: language === "ar" ? "row-reverse" : "row",
                      mt: "15px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={155}
                      height={110}
                      sx={{
                        width: { xs: "90px", lg: "155px" },
                        height: { lg: "110px" },
                      }}
                    />
                    <Stack>
                      <Skeleton
                        variant="text"
                        width={150}
                        sx={{
                          fontSize: { xs: getFont("8px"), lg: getFont("15px") },
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width={250}
                        sx={{
                          fontSize: { xs: getFont("8px"), lg: getFont("14px") },
                          mt: "3px",
                        }}
                      />
                    </Stack>
                  </Box>
                ))
              : articles?.map((item, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                      flexDirection: language === "ar" ? "row-reverse" : "row",
                      mt: "15px",
                    }}
                    key={index}
                  >
                    <Box
                      component={"img"}
                      src={item?.image}
                      sx={{
                        width: { xs: "90px", lg: "155px" },
                        height: { lg: "110px" },
                      }}
                      alt={"News"}
                      loading="lazy"
                    />
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: { xs: getFont("8px"), lg: getFont("15px") },
                          color: "#FFFFFFB2",
                          textAlign: language === "ar" ? "right" : "unset",
                          fontWeight: "400",
                          fontFamily: "Gilroy-Medium",
                        }}
                        component={"h3"}
                      >
                        {language === "ar"
                          ? item?.arabicTitle
                          : item?.englishTitle}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontSize: { xs: getFont("8px"), lg: getFont("14px") },
                          textAlign: language === "ar" ? "right" : "unset",
                          fontWeight: "400",
                          fontFamily: "Gilroy-Medium",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          mt: "3px",
                        }}
                        title={
                          language === "ar"
                            ? item?.summaryArabic
                            : item?.summaryEnglish
                        }
                        component={"p"}
                      >
                        {language === "ar"
                          ? item?.summaryArabic
                          : item?.summaryEnglish}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <Typography
            sx={{
              fontSize: { xs: getFont("11px"), lg: getFont("20px") },
              color: "#FFFFFF",
              textAlign: language === "ar" ? "right" : "unset",
              fontWeight: "400",
              fontFamily: "Gilroy-Heavy",
            }}
            component={"h2"}
          >
            {t("Categories")}
          </Typography>
          <Divider
            sx={{ backgroundColor: "#8F8F8F33", height: "3px", mt: "4px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              mt: "15px",
            }}
          >
            {categoriesFooter?.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: language === "ar" ? "row-reverse" : "row",
                  textTransform: "uppercase",
                }}
                key={index}
              >
                <Typography
                  sx={{
                    fontSize: { xs: getFont("9px"), lg: getFont("16px") },
                    fontWeight: "600",
                    color: "#FFFFFF",
                    pr: language === "ar" ? "15px" : "0px",
                    pl: language === "ar" ? "0px" : "10px",
                  }}
                  component={"h3"}
                >
                  {t(item)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: getFont("9px"), lg: getFont("16px") },
                    fontWeight: "400",
                    color: "#FFFFFF",
                    pr: language !== "ar" ? "10px" : "0px",
                    pl: language === "ar" ? "10px" : "0px",
                  }}
                  component={"h4"}
                >
                  452
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: getFont("14px"),
              mt: "15px",
              textAlign: language === "ar" ? "right" : "unset",
              pr: language === "ar" ? "15px" : "0px",
              pl: language === "ar" ? "0px" : "10px",
            }}
            component={"h6"}
          >
            {t("Show all")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: { xs: "15px 20px", lg: "15px 90px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#8F8F8F",
            fontSize: { xs: getFont("9px"), lg: getFont("16px") },
            fontWeight: "400",
          }}
          component={"h3"}
        >
          © 2025 copyright all right reserved
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {footerLinks?.map((item, index) => (
            <React.Fragment key={item}>
              <Typography
                sx={{
                  color: "#8F8F8F",
                  fontSize: { xs: getFont("9px"), lg: getFont("16px") },
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                component="h3"
                onClick={() => handleChoice(item)}
              >
                {t(item)}
              </Typography>
              {index !== footerLinks.length - 1 && (
                <Typography
                  component="span"
                  sx={{
                    color: "#8F8F8F",
                    fontSize: { xs: getFont("9px"), lg: getFont("16px") },
                    fontWeight: 400,
                  }}
                >
                  |
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
      <DynamicModal
        open={contactModal}
        handleClose={() => setContactModal(false)}
        sx={{ padding: { xs: "15px", md: "25px", lg: "35px" } }}
      >
        <ContactModal handleSubmit={() => setContactModal(false)} />
      </DynamicModal>
    </Box>
  );
};

export default Footer;
