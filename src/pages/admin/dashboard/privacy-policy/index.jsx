import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

const TermsPrivacyScreen = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dummyText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of 
Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Typography
        variant="h1"
        fontSize="30px"
        color="#3F3F40"
        fontWeight={600}
        gutterBottom
      >
        Term of Service/ Privacy Policy
      </Typography>

      <Paper
        elevation={1}
        sx={{
          mt: 2,
          borderRadius: "14px",
          overflow: "hidden",
          mb: 0,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#007BFF",
              height: "4px",
            },
          }}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
            label="Term of Service"
          />
          <Tab
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
            label="Privacy Policy"
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
            {dummyText.repeat(6)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TermsPrivacyScreen;
