import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  Paper,
  Checkbox,
  ClickAwayListener,
} from "@mui/material";
import LinkIcon from "../../assets/icons/link-icon.svg";
import DownArrow from "../../assets/icons/arrow-down.svg";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";
import { categoryOptions, dropdownOptions, dropdowns } from "../../constant";

const VisualTab = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [anchorEls, setAnchorEls] = React.useState({});
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState({
    Lebanon: true,
  });

 

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleClick = (event, label) => {
    if (label === "Category") {
      setShowCategoryDropdown((prev) => !prev);
    } else {
      setAnchorEls((prev) => ({ ...prev, [label]: event.currentTarget }));
    }
  };

  const handleClose = (label) => {
    if (label === "Category") {
      setShowCategoryDropdown(false);
    } else {
      setAnchorEls((prev) => ({ ...prev, [label]: null }));
    }
  };

  const toggleCategory = (name) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const buttonStyle = {
    backgroundColor: "#EAF4FF",
    fontSize: "17px",
    fontWeight: "600",
    color: "#101828",
    border: "1px solid #D1E5FA",
    borderRadius: "5px",
    textTransform: "none",
    height: 42,
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
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "14px",
        height: { xs: "auto", md: "491px" },
        minWidth: 0,
        marginTop: "23px",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: "2px solid #0000001A" }}
        TabIndicatorProps={{
          style: { backgroundColor: "#007BFF", height: "3px" },
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
        {dropdowns.map((label, index) => {
          const hasDropdown = dropdownOptions[label] !== undefined;
          const isCategory = label === "Category";

          return (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: { xs: "100%", sm: index === 2 ? 414 : 212 },
              }}
            >
              <Button
                variant="outlined"
                onClick={(e) => handleClick(e, label)}
                sx={buttonStyle}
                fullWidth
              >
                {label}
                <img src={DownArrow} alt="Down Arrow" />
              </Button>

              {/* Regular dropdowns */}
              {!isCategory && hasDropdown && anchorEls[label] && (
                <ClickAwayListener onClickAway={() => handleClose(label)}>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: 50,
                      left: 0,
                      borderRadius: "5px",
                      minWidth: "100%",
                      p: "0",
                    }}
                  >
                    {dropdownOptions[label].map((item, i) => (
                      <Box
                        key={i}
                        onClick={() => handleClose(label)}
                        sx={{
                          height: "42px",
                          fontSize: "17px",
                          fontWeight: "600",
                          color: "#101828",
                          borderRadius: "5px",
                          mb: 0.5,
                          p: "10px 15px",
                          backgroundColor: "#EAF4FF",
                          border: "1px solid #D1E5FA",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#D6EAFD",
                          },
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                </ClickAwayListener>
              )}

              {/* Category Dropdown */}
              {isCategory && showCategoryDropdown && (
                <ClickAwayListener onClickAway={() => handleClose(label)}>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 20,
                      top: 50,
                      left: 0,
                      backgroundColor: "#EAF4FF",
                      border: "1px solid #D1E5FA",
                      borderRadius: "5px",
                      p: 2,
                      width: "100%",
                      display: "grid",
                      gap: "15px",
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)", // Mobile
                        sm: "repeat(2, 1fr)", // Small tablets
                        md: "repeat(3, 1fr)", // Tablets
                        lg: "repeat(4, 1fr)", // Desktop and above
                      },
                    }}
                  >
                    {categoryOptions.map((option) => (
                      <Box
                        key={option}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#6C727F",
                        }}
                      >
                        <img
                          src={selectedCategories[option] ? CheckOn : CheckOff}
                          alt="checkbox"
                          style={{
                            cursor: "pointer",
                            width: 16,
                            height: 16,
                            marginRight: 8,
                          }}
                          onClick={() => toggleCategory(option)}
                        />
                        {option}
                      </Box>
                    ))}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
          );
        })}
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
