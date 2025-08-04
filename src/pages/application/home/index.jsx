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
  useGetShortsQuery,
} from "../../../services/feed";
import { getYouTubeEmbedUrl, translateText } from "../../../utils";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("");
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
  const [articles, setArticles] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [activeCategoryType, setActiveCategoryType] = useState("");
  const [shortsPage, setShortsPage] = useState(1);
  const [shortsCOntent, setShortsContent] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [hasMoreShorts, setHasMoreSHorts] = useState(false);
  const value = useSelector((state) => state.chatbot.value);

  const skeletonArray = new Array(14).fill(null);

  const { data, isLoading } = useGetCategoriesQuery({});
  const {
    data: articlesData,
    isLoading: articleLoading,
    isFetching,
    refetch,
    isSuccess,
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
      search: value,
    },
    { skip: !activeId || !activeCategory }
  );

  const { data: shortsData, isLoading: shortsLoading } = useGetShortsQuery(
    { page: shortsPage, categoryId: activeId },
    { skip: !activeId || activeCategoryType !== "NORMAL" }
  );

  useEffect(() => {
    const fetchData = () => {
      if (!data) return;

      const items = data?.data?.items || [];
      const originalNames = items.map((item) => item?.name);
      const originalIds = items.map((item) => item?.id);

      setCountries(originalNames);

      const initialIndex = queryCountry
        ? originalNames.indexOf(queryCountry)
        : 0;

      setActiveItem(originalNames[initialIndex] || originalNames[0]);
      setActiveId(originalIds[initialIndex] || originalIds[0]);
    };

    fetchData();
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
    console.log(item, type);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (type === "category") {
        if (item && categories?.includes(item)) {
          setActiveCategory(item);
          newParams.set("category", item);
        }
      }

      if (type === "country") {
        // Ensure countries and data are available before proceeding
        if (!countries?.length || !data?.data?.items?.length) return prev;

        if (language === "ar") {
          const index = arabicCountries?.findIndex(
            (arabicItem) => arabicItem === item
          );

          if (index !== -1 && countries[index]) {
            const englishCountry = countries[index];
            const countryItem = data?.data?.items[index];

            setActiveItem(item);
            setActiveId(countryItem?.id);
            setChannels(generalCategories?.includes(englishCountry));
            newParams.set("country", englishCountry);
          }
        } else {
          const selectedItem = data?.data?.items.find((i) => i.name === item);
          if (selectedItem) {
            setActiveItem(item);
            setActiveId(selectedItem?.id);
            setChannels(generalCategories?.includes(item));
            newParams.set("country", item);
          }
        }
      }

      setPage(1);
      if (isSuccess) {
        setHasFetched(false);
        refetch();
      }
      return newParams;
    });
  };

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // if (!countries.length) return;

    const newParams = new URLSearchParams(searchParams);
    let updated = false;

    // Handle category logic
    if (newParams.has("category")) {
      const urlCategory = newParams.get("category");
      if (urlCategory !== activeCategory) {
        setActiveCategory(urlCategory);
      }
    } else if (categories.length) {
      newParams.set("category", "Sport");
      setActiveCategory("Sport");
      updated = true;
    }

    if (categories?.length) {
      if (newParams.has("country")) {
        const urlCountry = newParams.get("country");
        setChannels(generalCategories?.includes(urlCountry));
      }

      // Handle country logic
      else if (!newParams.has("country") && countries[0]) {
        newParams.set("country", countries[0]);
        setChannels(generalCategories?.includes(countries[0]));
        updated = true;
      }
    }

    if (updated) {
      setSearchParams(newParams, { replace: true });
    }
  }, [countries, categories, searchParams]);

  useEffect(() => {
    const fetchData = () => {
      if (!data?.data || !activeItem) return;

      const targetCountry = activeItem;

      const activeData = data.data.items.filter(
        (item) => item.name.toLowerCase() === targetCountry?.toLowerCase()
      );

      const activeYoutube = activeData[0]?.youtubeContents?.map((item) => ({
        heading: item.title,
        videoUrl: item.youtubeUrl,
        type: item?.contentType,
      }));

      setYoutubeVideos(activeYoutube);
    };

    fetchData();
  }, [activeItem]);

  const fetchMoreArticles = () => {
    if (!hasNextPage) return;

    const nextPage = page + 1;

    // Refetch manually with new page
    refetch({
      page: nextPage,
      categoryId: activeId,
      subType:
        activeCategory === "Economy"
          ? "ECONOMICS"
          : activeCategory === "Sport"
          ? "SPORTS"
          : "POLITICS",
      search: value,
    });

    setPage(nextPage);
  };

  useEffect(() => {
    if (articlesData) {
      const newArticles = articlesData?.data?.items?.map((item) => {
        const englishTitle =
          item?.originalContent?.scrapedContent?.translatedContent?.englishContent
            ?.split("-")[0]
            ?.replace("Title: ", "");
        const arabicTitle =
          item?.originalContent?.scrapedContent?.translatedContent?.arabicContent
            ?.split("-")[0]
            ?.replace("عنوان:", "");
        return {
          id: item?.id,
          image: item?.image,
          headline: item?.title,
          source: item?.source?.split("- ")[1],
          date: item?.createdAt,
          shareLinks: item?.shareLinks,
          englishTitle,
          arabicTitle,
        };
      });

      setArticles((prev) =>
        page === 1 ? newArticles : [...(prev || []), ...newArticles]
      );

      setHasNextPage(articlesData?.data?.pagination?.hasNextPage);
      setHasPrevPage(articlesData?.data?.pagination?.hasPrevPage);
      setHasFetched(true);
    }
  }, [articlesData, articleLoading, isFetching]);

  useEffect(() => {
    if (!data || !activeItem) {
      return;
    }
    const items = data?.data?.items;
    const item = items?.filter(
      (cat) => cat?.name?.toLowerCase() === activeItem?.toLowerCase()
    );
    setActiveCategoryType(item[0]?.type);
  }, [activeItem, data]);

  useEffect(() => {
    if (shortsData) {
      const data = shortsData?.data?.items?.map((item) => ({
        name: item?.title,
        image: item?.thumbnailUrl,
        link: item?.youtubeUrl,
      }));
      setHasMoreSHorts(shortsData?.data?.pagination?.hasNextPage);
      setShortsContent(data);
    }
  }, [shortsData]);

  useEffect(() => {
    if (value === "" && activeId && activeCategory) {
      refetch();
    }
  }, [activeId, activeCategory, value]);

  useEffect(() => {
    if (articlesData && page === 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [articlesData]);

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
          mt: "15px",
          minHeight: "calc(100vh - 600px)",
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
              ? countries
              : countries
            )?.map((item, index) => (
              <Grid
                key={index}
                sx={{
                  display: "flex",
                  width: {
                    xs: "110px !important",
                    sm: "20%",
                    md: "14.2857%",
                    lg: "7.1428%",
                  },
                  p: "3px",
                  flexShrink: { xs: 0 },
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
                          activeItem === item
                            ? "none"
                            : "0.89px solid #01000142",
                        fontSize: 14,
                        fontWeight: "400",
                        fontFamily: "Gilroy-Medium",
                      }}
                      onClick={() => handleChipClick(item, "country")}
                      disableRipple
                    />
                  </>
                )}
              </Grid>
            ))}

            {/* {countries.map((item, index) => (
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
                  border: activeItem === item ? "none" : "1px solid #01000142",
                  width: { xs: 110, sm: "20%" },
                  fontSize: 14,
                  display: { xs: "flex", md: "none" },
                  flexShrink: 0,
                  fontWeight: "600",
                }}
                onClick={() => handleChipClick(item, "country")}
                disableRipple
              />
            ))} */}
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

        {/* <Divider
          sx={{
            width: { xs: "90%", md: "90%", lg: "70%" },
            backgroundColor: "#A1A0A0",
          }}
        /> */}

        <Box
          sx={{
            display: "flex",
            gap: { xs: "4px", md: "20px" },
            flexDirection: "row",
            width: { xs: "100%", md: "auto" },
            overflowX: "auto",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {activeCategory === ""
            ? [...Array(3)]?.map((item) => (
                <Skeleton
                  variant="rectangular"
                  height={32}
                  sx={{
                    borderRadius: "0px",
                    width: { xs: "100px", md: "157px", lg: "200px" },
                  }}
                />
              ))
            : categories?.map((item, index) => (
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
                    fontWeight: "400",
                    fontFamily: "Gilroy-Medium",
                    display: activeCategoryType === "NORMAL" ? "none" : "flex",
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
            spacing={1}
          >
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flex: "0 0 auto",
              }}
            />
            {isLoading || videosLoading
              ? Array.from({ length: 3 }).map((_, index) => (
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
              : youTubeVideos?.map(
                  (item, index) =>
                    item?.type !== "SHORTS" && (
                      <React.Fragment key={index}>
                        <Grid
                          item
                          sx={{
                            display: { xs: "block", md: "none" },
                            width: { xs: "148px", sm: "33%", md: "213px" },
                            flexShrink: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "14px", md: "27.69px" },
                              textAlign: "center",
                              mb: "15px",
                              fontWeight: "400",
                              fontFamily: "Gilroy-Medium",
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
                              border: "none",
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
                            maxWidth: "287px",
                          }}
                          size={{ xs: 6, md: 4 }}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                sm: "14px",
                                md: "24.69px",
                                lg: "32px",
                              },
                              fontWeight: "400",
                              fontFamily: "Gilroy-Medium",
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
                              border: "none",
                            }}
                          />
                        </Grid>
                      </React.Fragment>
                    )
                )}
            <Box
              sx={{ display: { xs: "none", md: "block" }, flex: "0 0 auto" }}
            />
          </Grid>

          {activeCategoryType === "NORMAL" && (
            <Grid
              container
              columnSpacing={1}
              rowSpacing={3}
              sx={{
                mt: "20px",
                display: { xs: "none", md: "flex" },
                // justifyContent: "center",
                userSelect: "none",
                justifyContent: language === "ar" ? "flex-end" : "flex-start",
              }}
            >
              {shortsLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Grid
                      key={index}
                      size={{ xs: 6, md: 4 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        rowGap: "15px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={150}
                        sx={{ borderRadius: "7.1px" }}
                      />
                      <Skeleton variant="text" width="80%" height={30} />
                    </Grid>
                  ))
                : shortsCOntent?.map((item, index) => (
                    <Grid
                      key={index}
                      size={{ xs: 6, md: 4 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        rowGap: "15px",
                      }}
                    >
                      <a
                        href={item?.link}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          component={"img"}
                          src={item?.image}
                          sx={{ borderRadius: "7.1px", width: "100%" }}
                          alt="News Image"
                          loading="lazy"
                        />
                        <Typography
                          sx={{
                            fontSize: "15.09px",
                            fontWeight: "600",
                            textDecoration: "none",
                            textAlign: "center",
                            color: "black",
                          }}
                          component={"h2"}
                        >
                          {item?.name}
                        </Typography>
                      </a>
                    </Grid>
                  ))}
            </Grid>
          )}
          {hasMoreShorts && (
            <Box sx={{ width: "200px", height: "40px", m: "0 auto" }}>
              <Button
                variant="gradient"
                onClick={() => setShortsPage(shortsPage + 1)}
              >
                {t("Next Page")}
              </Button>
            </Box>
          )}
        </Box>
        {/* {isFetching && (
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
        )} */}
        {/* {articles?.length > 0 && ( */}
        <Box
          sx={{
            // backgroundColor: "#EDEDED",
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
          {activeCategoryType === "NORMAL" && (
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
              {shortsLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Grid
                      key={index}
                      size={{ xs: 6, md: 4 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        rowGap: "15px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={150}
                        sx={{ borderRadius: "7.1px" }}
                      />
                      <Skeleton variant="text" width="80%" height={30} />
                    </Grid>
                  ))
                : shortsCOntent?.map((item, index) => (
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
                        component="a"
                        href={item?.link}
                        target="_blank"
                        sx={{
                          textDecoration: "none",
                          color: "inherit", // Optional: prevent default blue color
                        }}
                      >
                        <Box
                          component={"img"}
                          src={item?.image}
                          sx={{
                            borderRadius: "7.1px",
                            width: "100%",
                            textDecoration: "none !important",
                          }}
                          alt="News Image"
                          loading="lazy"
                        />
                        <Typography
                          sx={{
                            fontSize: "15.09px",
                            fontWeight: "600",
                            textDecoration: "none !important",
                            textAlign: "center",
                            color: "black !important",
                          }}
                          component={"h2"}
                        >
                          {item?.name}
                        </Typography>
                      </Box>
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
              // maxHeight: "1950px",
              // overflowY: "auto",
              // border: "1px solid red",
            }}
          >
            <InfiniteScroll
              dataLength={articles?.length || 0}
              next={fetchMoreArticles}
              hasMore={hasNextPage}
              loader={
                (articleLoading || isFetching) &&
                [...Array(3)].map((_, index) => (
                  <Skeleton
                    key={`skeleton-${index}`}
                    variant="rounded"
                    height={143}
                    sx={{ borderRadius: "9px", mb: "15px" }}
                  />
                ))
              }
              scrollThreshold={0.7}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
              }}
            >
              {articles?.map((item, index) =>
                item?.ad ? (
                  <Box
                    component="img"
                    src={item?.ad}
                    alt="Ad"
                    loading="lazy"
                    key={`ad-${index}`}
                  />
                ) : (
                  <NewsCard
                    key={`news-${index}`}
                    image={item?.image}
                    headline={item?.headline}
                    date={item?.date}
                    source={item?.source}
                    id={item?.id}
                    shareLinks={item?.shareLinks}
                  />
                )
              )}
            </InfiniteScroll>
          </Box>
        </Box>
        {/* )} */}
        {hasFetched && (
          <Box>
            {!articleLoading &&
            !isFetching &&
            isSuccess &&
            hasFetched &&
            (!Array.isArray(articles) || articles.length === 0) ? (
              <Box
                sx={{
                  height: "calc(100vh - 600px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "32px" }}>
                  No Articles Found
                </Typography>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
      <CountryMenu anchorEl={anchorEl2} open={open2} onClose={handleClose2} />
    </>
  );
};

export default Home;
