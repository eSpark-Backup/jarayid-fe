import { Box, Typography, Container } from "@mui/material";
import { memo, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

const SmartReaderCard = lazy(() => import("../smart-reader"));

const LegalPageLayout = memo(({ title, paragraphs }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Box
      component="main"
      sx={{
        pt: "80px",
        pb: "100px",
        backgroundColor: "#fff",
        minHeight: "100vh",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: "16px", sm: "32px", md: "80px", lg: "160px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              md: isArabic ? "row-reverse" : "row",
            },
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              maxWidth: "850px",
              order: { xs: 2, md: isArabic ? 2 : 1 },
              textAlign: isArabic ? "right" : "left",
            }}
          >
            <Typography
              variant="h1"
              fontWeight="600"
              gutterBottom
              fontSize="35px"
              sx={{
                textAlign: isArabic ? "right" : "left",
                fontFamily: "'Poppins', 'sans-serif'",
              }}
            >
              {title}
            </Typography>

            {/* {paragraphs.map((text, index) => ( */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                textAlign: isArabic ? "right" : "justify",
                mb: 2,
                fontWeight: "600",
              }}
            >
              {paragraphs}
            </Typography>
            {/* ))} */}
          </Box>

          <Box
            sx={{
              alignSelf: { xs: "center", md: "flex-start" },
              order: { xs: 1, md: isArabic ? 1 : 2 },
              ml: isArabic ? 0 : 4,
              mr: isArabic ? 4 : 0,
            }}
          >
            <Suspense fallback={<div>Loading Smart Reader...</div>}>
              <SmartReaderCard paragraphs={paragraphs} />
            </Suspense>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default LegalPageLayout;
