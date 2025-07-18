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
  const { t } = useTranslation();
  const faqs = t("FAQ.items", { returnObjects: true });
  const title = t("FAQ.title");
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5, position: "relative" }}>
      <Typography
        variant="h5"
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
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* FAQ Section */}
        <Box sx={{ width: "100%", maxWidth: "750px" }}>
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
                <Typography fontWeight="600" fontSize="22px">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="#737373" fontWeight="400" fontSize="16px">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box
          sx={{
            alignSelf: { xs: "center", md: "flex-start" },
          }}
        >
          <SmartReaderCard />
        </Box>
      </Box>
    </Container>
  );
};

export default FAQSection;
