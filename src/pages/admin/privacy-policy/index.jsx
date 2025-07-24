import { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { dummyText } from "../../../constant";
import { SubHeader } from "../../../components";

const TermsPrivacyScreen = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <SubHeader title="Term of Service/ Privacy Policy" />
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
