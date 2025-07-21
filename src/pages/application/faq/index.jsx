import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonUp from "../../../assets/icons/button-open.svg";
import ButtonDown from "../../../assets/icons/button-close.svg";
import SmartReaderCard from "../../../components/smart-reader";

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
        {/* FAQ Section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "750px",
            margin: "0 auto", // keeps it centered
            order: { xs: 2, md: isArabic ? 2 : 1 },
            textAlign: isArabic ? "right" : "left",
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                mb: 2,
                border: "1px solid #D9DBE9 !important",
                boxShadow: "0px 5px 15px rgba(25, 33, 61, 0.06) !important",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === index ? (
                    <img src={ButtonUp} alt="buttonUp" />
                  ) : (
                    <img src={ButtonDown} alt="buttonDown" />
                  )
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "none !important",
                  },
                }}
              >
                <Typography
                  fontWeight="600"
                  fontSize="22px"
                  sx={{ textAlign: isArabic ? "right" : "left", width: "100%" }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  color="#737373"
                  fontWeight="400"
                  fontSize="16px"
                  sx={{ textAlign: isArabic ? "right" : "left" }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box
          sx={{
            position: {
              xs: "relative",
              md: "relative",
              lg: "absolute", // only float on large screens
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
