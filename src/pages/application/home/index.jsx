import { useTranslation } from "react-i18next";
import { CountryMenu, CustomSwitch, NewsCard } from "../../../components";
import {
  categories,
  channels,
  countries,
  displayNews,
  generalCategories,
  newsContent,
  settingsMenuItems,
} from "../../../constant";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { forwardArrow, settingsWhite } from "../../../assets";

const Home = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState("Lebanon");
  const [activeCategory, setActiveCategory] = useState("Sport");
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language);
  const [showChannels, setChannels] = useState(false);
  const queryCountry = searchParams.get("country");
  const queryCategory = searchParams.get("category");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
    setChannels(generalCategories?.includes(queryCountry));
  }, [queryCountry, queryCategory]);

  const handleChipClick = (item, type) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (type === "country") {
        setActiveItem(item);
        setChannels(generalCategories?.includes(item));
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
            }}
          >
            {countries?.map((item, index) => (
              <Grid
                key={index}
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: { md: "14.2857%", lg: "7.1428%" },
                  p: "3px",
                }}
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
                    color: activeItem === item ? "#fff" : "#000",
                    border:
                      activeItem === item ? "none" : "1px solid #01000142",
                    fontSize: 14,
                  }}
                  onClick={() => handleChipClick(item, "country")}
                  disableRipple
                />
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
            px: { xs: "20px", sm: "0px", md: "15px" },
            width: { xs: "100%", sm: "90%", lg: "60%" },
            my: "10px",
            "@media (min-width:1281px) and (max-width:1550px)": {
              width: "75%",
            },
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
              justifyContent: { md: "center" },
            }}
          >
            {displayNews?.map((item, index) => (
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
                  size={3.5}
                  sx={{
                    display: { xs: "none", md: "block" },
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

          {showChannels && (
            <Grid
              container
              columnSpacing={1}
              rowSpacing={3}
              sx={{
                mt: "20px",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {channels?.map((item, index) => (
                <Grid
                  size={{ xs: 6, md: 3.5 }}
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
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: "#EDEDED",
            borderTopRightRadius: "9px",
            borderTopLeftRadius: "9px",
            width: { xs: "90%", md: "70%", lg: "45%" },
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
                    sx={{ fontSize: "10.09px", fontWeight: "400" }}
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
            {newsContent?.map((item, index) =>
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
                />
              )
            )}
          </Box>
        </Box>
      </Box>
      <CountryMenu anchorEl={anchorEl2} open={open2} onClose={handleClose2} />
    </>
  );
};

export default Home;
