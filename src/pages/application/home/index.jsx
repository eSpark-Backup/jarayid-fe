import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Button,
  Footer,
  MobileNavbar,
  Navbar,
  NewsCard,
} from "../../../components";
import useLanguageSwitcher from "../../../hooks/change-language";
import { categories, countries, newsContent } from "../../../constant";
import { Box, Chip, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useLanguageSwitcher();
  const language = useSelector((state) => state.language);
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
      <Navbar />
      <MobileNavbar />
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
            width: { xs: "90%", md: "90%", lg: "70%" },
            display: { xs: "none", md: "flex" },
            flexWrap: "wrap",
            gap: "3px",
            justifyContent: "space-between",
          }}
        >
          {countries?.map((item, index) => (
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
                width: { xs: "45%", sm: "33%", md: "77.5px", lg: "99.5px" },
              }}
              onClick={() => handleChipClick(item, "country")}
              disableRipple
            />
          ))}
        </Box>

        <Divider
          sx={{
            width: { xs: "90%", md: "90%", lg: "70%" },
            backgroundColor: "#A1A0A0",
          }}
        />

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "90%", md: "auto" },
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
                width: { xs: "100%", md: "157px", lg: "200px" },
              }}
              onClick={() => handleChipClick(item, "category")}
              disableRipple
            />
          ))}
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
          <iframe
            style={{ width: "100%", height: "480px", borderRadius: "9px" }}
            src="https://www.youtube.com/embed/FMmRfanJsPM?si=7f3hAklLKiXu43iL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
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
                <img src={item?.ad} alt="Ad" />
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
