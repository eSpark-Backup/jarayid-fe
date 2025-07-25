import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "../../assets/icons/plus-icon.svg";

const VideoUpload = ({ title }) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, fontSize: "30px", color: "#101828" }}
      >
        {title}
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: "2px solid #0000001A" }}
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

      <Grid
        container
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        alignItems="center"
      >
        <Grid item xs={12} sm="auto">
          <Paper
            elevation={2}
            sx={{
              p: 2,
              maxWidth: 228,
              width: "100%",
              borderRadius: "11px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #E5E5E5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Field label="Title" />
            <Field label="Choose Category" />
            <Field label="Attached YouTube Link" multiline rows={3} />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm="auto"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img src={AddIcon} alt="Add" width="73px" height="73px" />
        </Grid>
      </Grid>
    </Box>
  );
};

const Field = ({ label, multiline = false, rows = 1 }) => (
  <Box sx={{ width: "100%" }}>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        mb: 0.5,
        fontSize: "12px",
        color: "#000000",
      }}
    >
      {label}
    </Typography>
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      multiline={multiline}
      rows={rows}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#FFFEFE",
          "& fieldset": { border: "none" },
          alignItems: multiline ? "start" : "center",
        },
        "& .MuiInputBase-input": {
          padding: multiline ? "8px 14px" : "0 14px",
        },
      }}
    />
  </Box>
);

export default VideoUpload;
