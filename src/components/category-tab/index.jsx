// src/components/CategoryDropdown.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, ClickAwayListener, Button } from "@mui/material";
import DownArrow from "../../assets/icons/arrow-down.svg";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";

const CategoryDropdown = ({
  selectedCategories,
  setSelectedCategories,
  selectedText,
  setSelectedText,
  width = "414px",
  options,
}) => {
  const { category } = useSelector((state) => state.category);
  const catOptions =
    category?.map((cat) => {
      return { label: cat?.name, value: cat?.id };
    }) || [];
  const [categoryOptions, setCategoryOptions] = useState(catOptions);
  useEffect(() => {
    setCategoryOptions(catOptions);
  }, [category]);
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
    height: "42px",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "0 16px",
    width: "100%",
    cursor: "pointer",
    minWidth: 0,
    "&:hover": {
      backgroundColor: "#EAF4FF",
      color: "#6C727F",
      boxShadow: "none",
    },
  };

  return (
    <Box sx={{ position: "relative", width }}>
      {/* Category Button */}
      <Box
        variant="outlined"
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        fullWidth
        sx={buttonStyle}
      >
        <Box
          sx={{
            cursor: "pointer",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {selectedText || "Category"}
        </Box>
        <img src={DownArrow} alt="Down Arrow" />
      </Box>

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
                  src={selectedCategories[option?.label] ? CheckOn : CheckOff}
                  alt="checkbox"
                  style={{
                    cursor: "pointer",
                    width: 16,
                    height: 16,
                    marginRight: 8,
                  }}
                  onClick={() => toggleCategory(option?.label)}
                />
                {option?.label}
              </Box>
            ))}
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default CategoryDropdown;
