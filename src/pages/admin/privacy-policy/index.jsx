import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { SubHeader } from "../../../components";
import { useGetAllPagesQuery } from "../../../services/static-pages";

const TermsPrivacyScreen = () => {
  const [value, setValue] = useState(0);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");

  const { data, isLoading, error } = useGetAllPagesQuery();

  useEffect(() => {
    if (data?.data?.items) {
      const pages = data.data.items;
      const terms = pages.find((p) => p.slug?.toLowerCase().includes("terms"));
      const privacy = pages.find((p) =>
        p.slug?.toLowerCase().includes("privacy")
      );

      setTermsContent(terms?.content || "No Terms of Service found");
      setPrivacyContent(privacy?.content || "No Privacy Policy found");
    }
  }, [data]);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      <SubHeader title="Terms of Service / Privacy Policy" />

      <Paper
        elevation={1}
        sx={{ mt: 2, borderRadius: "14px", overflow: "hidden" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          TabIndicatorProps={{
            style: { backgroundColor: "#007BFF", height: "4px" },
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="Terms of Service"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
          />
          <Tab
            label="Privacy Policy"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
          />
        </Tabs>

        <Box
          sx={{
            p: 2,
            maxHeight: "400px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#007BFF",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#EAE7EC",
            },
          }}
        >
          <Typography
            variant="body1"
            color="#000000"
            backgroundColor="#EAE7EC"
            padding="20px"
            borderRadius="14px"
            mb="0"
            paragraph
          >
            {isLoading
              ? "Loading content..."
              : error
              ? "Error loading static pages."
              : value === 0
              ? termsContent
              : privacyContent}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TermsPrivacyScreen;
