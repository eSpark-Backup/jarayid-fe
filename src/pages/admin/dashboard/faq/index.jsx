import React, { useState } from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FAQList from "../../../../components/faq-list";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const faqs = t("FAQ.items", { returnObjects: true });
  const title = t("FAQ.title");
  const [expanded, setExpanded] = useState(0);
  const isArabic = i18n.language === "ar";

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        width="100%"
        mb={2}
        gap={2}
      >
        <Typography
          variant="h1"
          fontSize={{ xs: "24px", sm: "28px", md: "35px" }}
          color="#3F3F40"
          fontWeight="600"
        >
          FAQ
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: "125px",
            height: "35px",
            backgroundColor: "#007BFF",
            fontSize: "12px",
            textTransform: "none",
          }}
        >
          Add New FAQ
        </Button>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
          position: "relative",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h1"
          align="center"
          fontWeight="600"
          fontSize={{ xs: "24px", sm: "28px", md: "35px" }}
          mb="22px"
        >
          {title}
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          flexDirection="column"
        >
          <FAQList
            faqs={faqs}
            expanded={expanded}
            handleChange={handleChange}
            isArabic={isArabic}
            showEditDeleteIcons={true}
            onEdit={(faq, index) => console.log("Edit clicked:", faq)}
            onDelete={(faq, index) => console.log("Delete clicked:", faq)}
          />
        </Box>
      </Container>
    </>
  );
};

export default FAQ;
