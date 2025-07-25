import React from "react";
import { Box, Tabs, Tab, Button, Typography, Paper } from "@mui/material";
import LinkIcon from "../../assets/icons/link-icon.svg";
import DownArrow from "../../assets/icons/arrow-down.svg";

const VisualTab = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const dropdowns = ["Main Page", "Article Page", "Category"];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "14px",
        height: { xs: "auto", md: "491px" },
        minWidth: 0,
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          borderBottom: "2px solid #0000001A",
        }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#007BFF",
            height: "3px",
          },
        }}
      >
        <Tab
          label="Web"
          sx={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}
        />
        <Tab
          label="App"
          sx={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}
        />
      </Tabs>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mb={2}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {dropdowns.map((label, index) => (
          <Button
            key={index}
            variant="outlined"
            sx={{
              backgroundColor: "#EAF4FF",
              fontSize: "17px",
              fontWeight: "600",
              color: "#101828",
              border: "1px solid #D1E5FA",
              borderRadius: "5px",
              textTransform: "none",
              height: 42,
              width: {
                xs: "100%", 
                sm: index === 2 ? 414 : 212, 
              },
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              paddingX: 2,
              "&:hover": {
                backgroundColor: "#EAF4FF",
                color: "#101828",
                boxShadow: "none",
              },
            }}
          >
            {label}
            <img src={DownArrow} alt="Down Arrow" style={{ paddingLeft: 0 }} />
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "#EAE7EC",
          borderRadius: "5px",
          textAlign: "center",
          height: "131px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={LinkIcon} alt="Link Icon" />
        <Typography color="#bbb" variant="body2">
          +
        </Typography>
      </Box>
    </Paper>
  );
};

export default VisualTab;
