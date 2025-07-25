import { useTranslation } from "react-i18next";
import {
  Button,
  CountryMenu,
  CustomSwitch,
  NewsCard,
} from "../../../components";
import {
  categories,
  channels,
  countries,
  countriesArabic,
  displayNews,
  generalCategories,
  newsContent,
  settingsMenuItems,
  tabletCountries,
} from "../../../constant";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { forwardArrow, settingsWhite } from "../../../assets";
import {
  useGetArticlesQuery,
  useGetCategoriesQuery,
} from "../../../services/feed";
import { getYouTubeEmbedUrl, translateText } from "../../../utils";

const Home = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Sport");
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language);
  const [showChannels, setChannels] = useState(false);
  const queryCountry = searchParams.get("country");
  const queryCategory = searchParams.get("category");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [countries, setCountries] = useState([]);
  const [arabicCountries, setArabicCountries] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [translationLoading, setTranslationLoading] = useState(false);
  const [youTubeVideos, setYoutubeVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const skeletonArray = new Array(14).fill(null);

  const { data, isLoading } = useGetCategoriesQuery({ type: "COUNTRY" });
  const {
    data: articlesData,
    isLoading: articleLoading,
    isFetching,
  } = useGetArticlesQuery(
    {
      page,
      categoryId: activeId,
      subType:
        activeCategory === "Economy"
          ? "ECONOMICS"
          : activeCategory === "Sport"
          ? "SPORTS"
          : "POLITICS",
    },
    { skip: !activeId }
  );

  useEffect(() => {
    const fetchAndTranslate = async () => {
      if (!data) return;

      const items = data?.data?.items || [];
      const originalNames = items.map((item) => item?.name);
      const originalIds = items.map((item) => item?.id);

      if (language === "ar") {
        setTranslationLoading(true);
        try {
          const translatedNames = await Promise.all(
            originalNames.map((name) => translateText(name, "en", language))
          );

          setCountries(originalNames);
          setArabicCountries(translatedNames);

          const initialIndex = queryCountry
            ? originalNames.indexOf(queryCountry)
            : 0;
          setActiveItem(translatedNames[initialIndex] || translatedNames[0]);
          setActiveId(originalIds[initialIndex] || originalIds[0]);
        } catch (error) {
          console.error("Translation failed", error);
          setCountries(originalNames);
          setActiveItem(queryCountry || originalNames[0]);
          setActiveId(
            items.find(
              (item) => item.name === (queryCountry || originalNames[0])
            )?.id
          );
        } finally {
          setTranslationLoading(false);
        }
      } else {
        setCountries(originalNames);
        setActiveItem(queryCountry || originalNames[0]);
        setActiveId(
          items.find((item) => item.name === (queryCountry || originalNames[0]))
            ?.id
        );
      }
    };

    fetchAndTranslate();
  }, [data, language]);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    if (language === "ar" && arabicCountries?.length) {
      if (queryCountry && countries.includes(queryCountry)) {
        const index = countries.indexOf(queryCountry);
        setActiveItem(arabicCountries[index]);
        setActiveId(data?.data?.items[index]?.id);
      }
    } else if (queryCountry && countries.includes(queryCountry)) {
      setActiveItem(queryCountry);
      setActiveId(
        data?.data?.items.find((item) => item.name === queryCountry)?.id
      );
    }
  }, [queryCountry, language, arabicCountries]);

  const handleChipClick = (item, type) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (type === "country") {
        if (language === "ar") {
          const index = arabicCountries?.findIndex(
            (arabicItem) => arabicItem === item
          );

          if (index !== -1) {
            const englishCountry = countries[index];
            setActiveItem(item);
            setActiveId(data?.data?.items[index]?.id);
            newParams.set("country", englishCountry);
            setChannels(generalCategories?.includes(item));
          }
        } else {
          const selectedItem = data?.data?.items.find((i) => i.name === item);
          setActiveItem(item);
          setActiveId(selectedItem?.id);
          setChannels(generalCategories?.includes(item));
          newParams.set("country", item);
        }
      } else {
        setActiveCategory(item);
        newParams.set("category", item);
      }

      return newParams;
    });
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    if (!countries.length) return;

    const newParams = new URLSearchParams(searchParams);
    let updated = false;

    if (!queryCategory && categories.length) {
      newParams.set("category", "Sport");
      updated = true;
    }

    if (!queryCountry && countries[0]) {
      newParams.set("country", countries[0]);
      updated = true;
    }

    if (updated) {
      setSearchParams(newParams, { replace: true });
    }
  }, [countries, categories]);

  useEffect(() => {
    const fetchData = async () => {
      if (!data?.data || !activeItem) return;

      const targetCountry =
        language === "ar"
          ? countries[arabicCountries.indexOf(activeItem)]
          : activeItem;

      const activeData = data.data.items.filter(
        (item) => item.name.toLowerCase() === targetCountry?.toLowerCase()
      );

      let activeYoutube = activeData[0]?.youtubeContents?.map((item) => ({
        heading: item.title,
        videoUrl: item.youtubeUrl,
      }));

      if (language === "ar" && activeYoutube) {
        setVideosLoading(true);
        activeYoutube = await Promise.all(
          activeYoutube.map(async (video) => ({
            ...video,
            heading: await translateText(video.heading),
          }))
        );
        setVideosLoading(false);
      }

      setYoutubeVideos(activeYoutube);
    };

    fetchData();
  }, [activeItem, language]);

  useEffect(() => {
    const translateHeadlines = async () => {
      if (articlesData) {
        const translatedArticles = await Promise.all(
          articlesData?.data?.items?.map(async (item) => {
            let headline = item?.title;

            const isArabic = /[\u0600-\u06FF]/.test(headline);

            // Translate English → Arabic
            if (language === "ar" && !isArabic) {
              headline = await translateText(item?.title, "en", "ar");
            }

            // Translate Arabic → English
            if (language === "en" && isArabic) {
              headline = await translateText(item?.title, "ar", "en");
            }

            return {
              id: item?.id,
              image: item?.image,
              headline,
              source: item?.source,
              date: item?.createdAt,
              shareLinks: item?.shareLinks,
            };
          })
        );

        setArticles(translatedArticles);
        setHasNextPage(articlesData?.data?.pagination?.hasNextPage);
        setHasPrevPage(articlesData?.data?.pagination?.hasPrevPage);
      }
    };

    translateHeadlines();
  }, [articlesData, language]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "35px",
          pb: "30px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: {
              md: user ? "space-between" : "center",
              lg: "flex-end",
            },
            alignItems: "flex-start",
            px: 0,
            flexDirection: { md: "row", lg: "column" },
            rowGap: "15px",
          }}
        >
          {user && (
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                justifyContent: language === "ar" ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleClick2}
              >
                <Box
                  component={"img"}
                  alt="Settings Icon"
                  src={settingsWhite}
                  loading="lazy"
                />
              </Box>
            </Box>
          )}

          {user && (
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background:
                  language === "ar"
                    ? "#fff"
                    : "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)",
                justifyContent: "center",
                alignItems: "center",
                display: { xs: "none", md: "flex", lg: "none" },
                cursor: "pointer",
              }}
              onClick={handleClick2}
            >
              <Box
                component={"img"}
                alt="Settings Icon"
                src={settingsWhite}
                loading="lazy"
              />
            </Box>
          )}

          <Grid
            container
            sx={{
              width: { xs: "100%", md: "80%", lg: "100%" },
              display: "flex",
              flexWrap: { xs: "nowrap", md: "wrap" },
              overflowX: { xs: "auto", md: "hidden" },
              columnGap: { xs: "3px", md: 0 },
              "&::-webkit-scrollbar": { display: "none" },
              flexDirection: language === "ar" ? "row-reverse" : "row",
              justifyContent: language === "ar" ? "end" : "flex-start",
            }}
          >
            {(isLoading || translationLoading
              ? skeletonArray
              : language === "ar"
              ? arabicCountries
              : countries
            )?.map((item, index) => (
              <Grid
                key={index}
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: { md: "14.2857%", lg: "7.1428%" },
                  p: "3px",
                }}
              >
                {isLoading || translationLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={32}
                    sx={{ borderRadius: "0px" }}
                  />
                ) : (
                  <>
                    <Chip
                      label={item}
                      variant="straight"
                      sx={{
                        width: "100%",
                        background:
                          activeItem === item
                            ? "linear-gradient(180deg, #007BFF 33%, #004A99 100%)"
                            : "#F3EEEE",
                        color: activeItem === item ? "#fff" : "#000",
                        border:
                          activeItem === item ? "none" : "1px solid #01000142",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                      onClick={() => handleChipClick(item, "country")}
                      disableRipple
                    />
                  </>
                )}
              </Grid>
            ))}

            {["Lebanon", "Tech", "Sports", "Economy", "Politics"].map(
              (item, index) => (
                <Chip
                  key={index}
                  label={t(item)}
                  variant="straight"
                  sx={{
                    background:
                      activeItem === item
                        ? "linear-gradient(180deg, #007BFF 33%, #004A99 100%)"
                        : "#F3EEEE",
                    color: activeItem === item ? "#fff" : "#000",
                    border:
                      activeItem === item ? "none" : "1px solid #01000142",
                    width: { xs: 110, sm: "20%" },
                    fontSize: 14,
                    display: { xs: "flex", md: "none" },
                    flexShrink: 0,
                    fontWeight: "600",
                  }}
                  onClick={() => handleChipClick(item, "country")}
                  disableRipple
                />
              )
            )}
          </Grid>

          {user && (
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background:
                  language === "ar"
                    ? "linear-gradient(180deg, #005BBC 0%, #0053AC 100%)"
                    : "#fff",
                display: { xs: "none", md: "flex", lg: "none" },
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClick2}
            >
              <Box
                component={"img"}
                alt="Settings Icon"
                src={settingsWhite}
                loading="lazy"
              />
            </Box>
          )}
        </Box>

        <Divider
          sx={{
            width: { xs: "90%", md: "90%", lg: "70%" },
            backgroundColor: "#A1A0A0",
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: { xs: "4px", md: "20px" },
            flexDirection: language === "ar" ? "row-reverse" : "row",
            width: { xs: "100%", md: "auto" },
            overflowX: "auto",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {categories?.map((item, index) => (
            <Chip
              label={t(item)}
              variant="rounded"
              key={index}
              sx={{
                background:
                  activeCategory === item
                    ? "linear-gradient(180deg, #007BFF 33%, #004A99 100%)"
                    : "#F3EEEE",
                color: activeCategory === item ? "white" : "#000000",
                border:
                  activeCategory === item ? "none" : "1px solid #01000142",
                width: { xs: "100px", md: "157px", lg: "200px" },
                fontSize: { xs: "11px", md: "14px", lg: "17.96px" },
                fontWeight: "600",
              }}
              onClick={() => handleChipClick(item, "category")}
              disableRipple
            />
          ))}
        </Box>
        <Box
          sx={{
            px: { xs: "20px", sm: "0px", md: "15px" },
            width: { xs: "100%", sm: "95%", lg: "60%" },
            my: "10px",
            "@media (min-width:1281px) and (max-width:1550px)": {
              width: "75%",
            },
          }}
        >
          <Grid
            // spacing={1}
            container
            sx={{
              overflowX: "auto",
              flexWrap: "nowrap",
              display: "flex",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              flexDirection: language === "ar" ? "row-reverse" : "row",
              userSelect: "none",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flex: "0 0 auto",
              }}
            />
            {isLoading || videosLoading
              ? // Show skeleton loaders when loading
                Array.from({ length: 3 }).map((_, index) => (
                  <React.Fragment key={index}>
                    {/* Mobile skeleton */}
                    <Grid
                      size={{ xs: 12 }}
                      sx={{
                        display: { xs: "block", md: "none" },

                        flexShrink: 0,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: { xs: "14px", md: "27.69px" },
                          mb: "15px",
                          width: "60%",
                          mx: "auto",
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "455px",
                          borderRadius: "8px",
                        }}
                      />
                    </Grid>

                    {/* Desktop skeleton */}
                    <Grid
                      sx={{
                        // flex: "0 0 auto",
                        display: { xs: "none", md: "block" },
                        mx: 0.5,
                      }}
                      size={{ xs: 6, md: 3.7 }}
                    >
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: { sm: "14px", md: "24.69px", lg: "27px" },
                          mb: "15px",
                          width: "60%",
                          mx: "auto",
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "455px",
                          borderRadius: "8px",
                        }}
                      />
                    </Grid>
                  </React.Fragment>
                ))
              : youTubeVideos?.map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid
                      item
                      sx={{
                        display: { xs: "block", md: "none" },
                        width: { xs: "229px", sm: "33%", md: "213px" },
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "14px", md: "27.69px" },
                          textAlign: "center",
                          mb: "15px",
                          fontWeight: "600",
                        }}
                        component={"h1"}
                      >
                        {item?.heading}
                      </Typography>
                      <Box
                        component="iframe"
                        src={item?.videoUrl}
                        sx={{
                          width: "100%",
                          height: "455px",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      key={index}
                      sx={{
                        flex: "0 0 auto",
                        display: { xs: "none", md: "block" },
                        mx: 0.5,
                      }}
                      size={{ xs: 6, md: 4 }}
                    >
                      <Typography
                        sx={{
                          fontSize: { sm: "14px", md: "24.69px", lg: "27px" },
                          fontWeight: "600",
                          textAlign: "center",
                          mb: "15px",
                        }}
                        component={"h1"}
                      >
                        {item?.heading}
                      </Typography>
                      <Box
                        component="iframe"
                        src={item?.videoUrl}
                        sx={{
                          width: "100%",
                          height: "455px",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
            <Box
              sx={{ display: { xs: "none", md: "block" }, flex: "0 0 auto" }}
            />
          </Grid>

          {showChannels && (
            <Grid
              container
              columnSpacing={1}
              rowSpacing={3}
              sx={{
                mt: "20px",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              {channels?.map((item, index) => (
                <Grid
                  size={{ xs: 6, md: 4 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: "15px",
                  }}
                  key={index}
                >
                  <Box
                    component={"img"}
                    src={item?.image}
                    sx={{ borderRadius: "7.1px", width: "100%" }}
                    alt="News Image"
                    loading="lazy"
                  />
                  <Typography
                    sx={{ fontSize: "15.09px", fontWeight: "600" }}
                    component={"h2"}
                  >
                    {item?.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        {isFetching && (
          <Box
            sx={{
              backgroundColor: "#EDEDED",
              borderTopRightRadius: "9px",
              borderTopLeftRadius: "9px",
              width: { xs: "90%", md: "75%", lg: "45%" },
              display: "flex",
              flexDirection: "column",
              rowGap: "25px",
              "@media (min-width:1281px) and (max-width:1550px)": {
                width: "55%",
              },
            }}
          >
            {[...Array(5)]?.map((item, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                variant="rounded"
                width="100%"
                height={143}
                sx={{ borderRadius: "9px" }}
              />
            ))}
          </Box>
        )}
        {articles?.length > 0 && (
          <Box
            sx={{
              backgroundColor: "#EDEDED",
              borderTopRightRadius: "9px",
              borderTopLeftRadius: "9px",
              width: { xs: "90%", md: "75%", lg: "45%" },
              display: "flex",
              flexDirection: "column",
              rowGap: "25px",
              "@media (min-width:1281px) and (max-width:1550px)": {
                width: "55%",
              },
            }}
          >
            {showChannels && (
              <Grid
                container
                columnSpacing={1}
                rowSpacing={3}
                sx={{
                  mt: "20px",
                  display: { xs: "flex", md: "none" },
                  p: "15px",
                }}
              >
                {channels?.map((item, index) => (
                  <Grid
                    size={{ xs: 6, md: 4 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: "15px",
                    }}
                    key={index}
                  >
                    <Box
                      component={"img"}
                      src={item?.image}
                      sx={{ borderRadius: "7.1px", width: "100%" }}
                      alt="Image"
                      loading="lazy"
                    />
                    <Typography
                      sx={{ fontSize: "10.09px", fontWeight: "600" }}
                      component={"h2"}
                    >
                      {item?.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                p: "15px",
              }}
            >
              {articleLoading
                ? [...Array(5)].map((_, index) => (
                    <Skeleton
                      key={`skeleton-${index}`}
                      variant="rounded"
                      width="90%"
                      height={143}
                      sx={{ borderRadius: "9px" }}
                    />
                  ))
                : articles?.map((item, index) =>
                    item?.ad ? (
                      <Box
                        component={"img"}
                        src={item?.ad}
                        alt="Ad"
                        loading="lazy"
                        key={index}
                      />
                    ) : (
                      <NewsCard
                        key={index}
                        image={item?.image}
                        headline={item?.headline}
                        date={item?.date}
                        source={item?.source}
                        id={item?.id}
                        shareLinks={item?.shareLinks}
                      />
                    )
                  )}
              <Box
                sx={{
                  display:
                    !activeId || articles?.length === 0 ? "none" : "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "200px", height: "40px", m: "0 auto" }}>
                  <Button
                    variant="gradient"
                    onClick={handlePrevPage}
                    disabled={!hasPrevPage}
                  >
                    {t("Previous Page")}
                  </Button>
                </Box>
                <Box sx={{ width: "200px", height: "40px", m: "0 auto" }}>
                  <Button
                    variant="gradient"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                  >
                    {t("Next Page")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <CountryMenu anchorEl={anchorEl2} open={open2} onClose={handleClose2} />
    </>
  );
};

export default Home;
