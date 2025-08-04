import React, { useEffect, useState } from "react";
import { Typography, Container, Box, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import SmartReaderCard from "../../../components/smart-reader";
import FAQList from "../../../components/faq-list";
import { useGetAllPagesQuery } from "../../../services/static-pages";
import { getFont } from "../../../utils";

const FAQSection = () => {
  const { t, i18n } = useTranslation();
  const faqs = t("FAQ.items", { returnObjects: true });
  const title = t("FAQ.title");
  const [expanded, setExpanded] = useState(0);
  const isArabic = i18n.language === "ar";

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };
  const [data, setData] = useState([]);

  const { data: staticPageData, isLoading: staticPageLoading } =
    useGetAllPagesQuery({ search: "faq" });

  useEffect(() => {
    setData(staticPageData?.data?.items[0]?.content?.faq);
  }, [staticPageData]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        position: "relative",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        fontWeight="600"
        fontSize={getFont("35px")}
        mb="22px"
        sx={{
          fontFamily: "'Poppins', 'sans-serif'",
        }}
      >
        {title}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        position="relative"
        flexDirection={{ xs: "column", md: isArabic ? "row-reverse" : "row" }}
      >
        {staticPageLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              maxWidth: "750px",
              margin: "0 auto",
              pb: "100px",
            }}
          />
        ) : (
          <FAQList
            faqs={data}
            expanded={expanded}
            handleChange={handleChange}
            isArabic={isArabic}
          />
        )}

        {!staticPageLoading && (
          <Box
            sx={{
              position: {
                xs: "relative",
                md: "relative",
                lg: "absolute",
              },
              top: { lg: 0 },
              [isArabic ? "left" : "right"]: { lg: 0 },
              zIndex: { lg: 1 },
              width: "fit-content",
              mt: { xs: 2, md: 2, lg: -2 },
              order: { xs: 1, md: isArabic ? 1 : 2 },
              alignSelf: { xs: "center", md: "flex-start", lg: "flex-start" },
            }}
          >
            <SmartReaderCard
              paragraphs={data?.map(
                (item) => `${item?.question} ${item?.answer}`
              )}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FAQSection;
