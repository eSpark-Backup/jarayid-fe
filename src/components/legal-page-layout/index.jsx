import { Box, Typography, Container } from "@mui/material";
import { memo, Suspense, lazy } from "react";

const SmartReaderCard = lazy(() => import("../smart-reader"));

const LegalPageLayout = memo(({ title, paragraphs }) => {
  return (
    <Box
      component="main"
      sx={{
        pt: "80px",
        pb: "100px",
        backgroundColor: "#fff",
        minHeight: "100vh",
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flexBasis: { xs: "100%", md: "68%" }, flexGrow: 1 }}>
            <Typography
              variant="h4"
              fontWeight="600"
              gutterBottom
              fontSize="35px"
            >
              {title}
            </Typography>

            {paragraphs.map((text, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontSize: "16px",
                  textAlign: "justify",
                  mb: 2,
                  marginBottom: "0",
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          <Box
            sx={{
              flexBasis: { xs: "100%", lg: "15%" },
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Suspense fallback={<div>Loading Smart Reader...</div>}>
              <SmartReaderCard />
            </Suspense>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default LegalPageLayout;
