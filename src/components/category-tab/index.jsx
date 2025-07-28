// src/components/CategoryDropdown.jsx
import React, { useState } from "react";
import { Box, ClickAwayListener, Button } from "@mui/material";
import DownArrow from "../../assets/icons/arrow-down.svg";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";
import { categoryOptions } from "../../constant";

const CategoryDropdown = ({
  selectedCategories,
  setSelectedCategories,
  selectedText,
  setSelectedText,
  width = "414px",
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const toggleCategory = (name) => {
    setSelectedCategories((prev) => {
      const updated = { ...prev, [name]: !prev[name] };
      const selectedList = Object.keys(updated).filter((key) => updated[key]);
      setSelectedText(selectedList.join(", "));
      return updated;
    });
  };

  const buttonStyle = {
    backgroundColor: "#EAF4FF",
    fontSize: "17px",
    fontWeight: "600",
    color: "#6C727F",
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
      color: "#6C727F",
      boxShadow: "none",
    },
  };

  return (
    <Box sx={{ position: "relative", width }}>
      {/* Category Button */}
      <Button
        variant="outlined"
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        sx={buttonStyle}
        fullWidth
      >
        {selectedText || "Category"}
        <img src={DownArrow} alt="Down Arrow" />
      </Button>

      {/* Dropdown List */}
      {showCategoryDropdown && (
        <ClickAwayListener onClickAway={() => setShowCategoryDropdown(false)}>
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
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
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
};

export default CategoryDropdown;
