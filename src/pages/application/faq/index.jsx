import React, { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import SmartReaderCard from "../../../components/smart-reader";
import FAQList from "../../../components/faq-list";

const FAQSection = () => {
  const { t, i18n } = useTranslation();
  const faqs = t("FAQ.items", { returnObjects: true });
  const title = t("FAQ.title");
  const [expanded, setExpanded] = useState(0);
  const isArabic = i18n.language === "ar";

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

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
        fontSize="35px"
        mb="22px"
      >
        {title}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        position="relative"
        flexDirection={{ xs: "column", md: isArabic ? "row-reverse" : "row" }}
      >
        <FAQList
          faqs={faqs}
          expanded={expanded}
          handleChange={handleChange}
          isArabic={isArabic}
        />

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
            mt: { xs: 2, md: 2, lg: 0 },
            order: { xs: 1, md: isArabic ? 1 : 2 },
            alignSelf: { xs: "center", md: "flex-start", lg: "flex-start" },
          }}
        >
          <SmartReaderCard />
        </Box>
      </Box>
    </Container>
  );
};

export default FAQSection;
