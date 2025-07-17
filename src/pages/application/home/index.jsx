import { useTranslation } from "react-i18next";
import { Footer, NewsCard } from "../../../components";
import {
  categories,
  channels,
  countries,
  displayNews,
  newsContent,
} from "../../../constant";
import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState("Lebanon");
  const [activeCategory, setActiveCategory] = useState("Sport");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryCountry = searchParams.get("country");
  const queryCategory = searchParams.get("category");

  useEffect(() => {
    if (queryCategory && categories.includes(queryCategory)) {
      setActiveCategory(queryCategory);
    } else {
      setActiveCategory("Sport");
    }
    if (queryCountry && countries.includes(queryCountry)) {
      setActiveItem(queryCountry);
    } else {
      setActiveItem("Lebanon");
    }
  }, [queryCountry, queryCategory]);

  const handleChipClick = (item, type) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (type === "country") {
        setActiveItem(item);
        newParams.set("country", item);
      } else {
        setActiveCategory(item);
        newParams.set("category", item);
      }

      return newParams;
    });
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    let updated = false;

    if (!queryCategory) {
      newParams.set("category", "Sport");
      updated = true;
    }
    if (!queryCountry) {
      newParams.set("country", "Lebanon");
      updated = true;
    }

    if (updated) {
      setSearchParams(newParams);
    }
  }, []);

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
        <Grid
          sx={{
            width: { xs: "90%", md: "75%", lg: "70%" },
            display: "flex",

            flexWrap: { xs: "nowrap", md: "wrap" },
            overflowX: { xs: "auto", md: "hidden" },
            columnGap: { xs: "3px", md: "0px" },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          container
        >
          {countries?.map((item, index) => (
            <Grid
              sx={{
                display: { xs: "none", md: "flex" },
                width: {
                  md: "14.2857%",
                  lg: "7.1428%",
                },
                p: "3px",
              }}
              display={{ xs: "none", md: "flex" }}
              key={index}
            >
              <Chip
                label={t(item)}
                variant="straight"
                sx={{
                  width: "100%",
                  background:
                    activeItem === item
                      ? "linear-gradient(180deg, #007BFF 33%, #004A99 100%)"
                      : "#F3EEEE",
                  color: activeItem === item ? "white" : "#000000",
                  border: activeItem === item ? "none" : "1px solid #01000142",
                  fontSize: "14px",
                }}
                onClick={() => handleChipClick(item, "country")}
                disableRipple
              />
            </Grid>
          ))}
          {["Lebanon", "Tech", "Sport", "Economy", "Politics"]?.map(
            (item, index) => (
              <Chip
                label={t(item)}
                variant="straight"
                key={index}
                sx={{
                  background:
                    activeItem === item
                      ? "linear-gradient(180deg, #007BFF 33%, #004A99 100%)"
                      : "#F3EEEE",
                  color: activeItem === item ? "white" : "#000000",
                  border: activeItem === item ? "none" : "1px solid #01000142",
                  width: { xs: "110px", sm: "20%" },
                  fontSize: "14px",
                  display: { xs: "flex", md: "none" },
                  flexShrink: 0,
                }}
                onClick={() => handleChipClick(item, "country")}
                disableRipple
              />
            )
          )}
        </Grid>

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
            flexDirection: "row",
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
              }}
              onClick={() => handleChipClick(item, "category")}
              disableRipple
            />
          ))}
        </Box>
        <Box
          sx={{
            px: "15px",
            width: { xs: "90%", lg: "50%" },
            my: "10px",
          }}
        >
          <Grid
            spacing={1}
            container
            sx={{
              overflowX: "auto",
              flexWrap: "nowrap",
              display: "flex",
              pb: 2,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {displayNews?.map((item, index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  sx={{
                    display: { xs: "block", sm: "none" },
                    width: { xs: "140px", md: "213px" },
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "27.69px" },
                      fontWeight: 400,
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

                <Grid
                  item
                  size={4}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: "14px", md: "24.69px", lg: "27px" },
                      fontWeight: 400,
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
          </Grid>

          <Grid
            container
            columnSpacing={1}
            rowSpacing={3}
            sx={{ mt: "20px", display: { xs: "none", md: "flex" } }}
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
                  sx={{ fontSize: "15.09px", fontWeight: "400" }}
                  component={"h2"}
                >
                  {item?.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            backgroundColor: "#EDEDED",
            borderTopRightRadius: "9px",
            borderTopLeftRadius: "9px",
            width: { xs: "90%", lg: "50%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "25px",
            "@media (min-width:1281px) and (max-width:1550px)": {
              width: "65%",
            },
          }}
        >
          <Grid
            container
            columnSpacing={1}
            rowSpacing={3}
            sx={{ mt: "20px", display: { xs: "flex", md: "none" }, p: "15px" }}
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
                  sx={{ fontSize: "10.09px", fontWeight: "400" }}
                  component={"h2"}
                >
                  {item?.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
              p: "15px",
            }}
          >
            {newsContent?.map((item, index) =>
              item?.ad ? (
                <Box component={"img"} src={item?.ad} alt="Ad" loading="lazy" />
              ) : (
                <NewsCard
                  key={index}
                  image={item?.image}
                  headline={item?.headline}
                  date={item?.date}
                  source={item?.source}
                />
              )
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
