import React, { useState } from "react";
import { Box, Stack, TextField, ClickAwayListener } from "@mui/material";
import AddIcon from "../../../assets/icons/add-icon.svg";
import CheckOn from "../../../assets/icons/check-on.svg";
import CheckOff from "../../../assets/icons/check-off.svg";
import { categoryOptions } from "../../../constant";
import { socialOptions } from "../../../constant";
import DownArrow from "../../../assets/icons/arrow-down.svg";
import UpArrow from "../../../assets/icons/arrow-up.svg";

const textFieldBaseStyle = {
  height: "42px",
  borderRadius: "5px",
  border: "1px solid #D1E5FA",
  px: "10px",
  color: "#8C8E90",
  fontStyle: "italic",
  "&:focus": { outline: "none" },
};

export default function SocialMediaForm() {
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [social, setSocial] = useState("");
  const [items, setItems] = useState([]);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSocial, setSelectedSocial] = useState({});

  const toggleCategory = (option) => {
    const updated = {
      ...selectedCategories,
      [option]: !selectedCategories[option],
    };
    setSelectedCategories(updated);
    const selectedList = Object.keys(updated).filter((key) => updated[key]);
    setCategory(selectedList.join(", "));
  };

  const toggleSocial = (option) => {
    const updated = { ...selectedSocial, [option]: !selectedSocial[option] };
    setSelectedSocial(updated);
    const selectedList = Object.keys(updated).filter((key) => updated[key]);
    setSocial(selectedList.join(", "));
  };

  const handleAdd = () => {
    if (!link || !category || !social) return;
    setItems([...items, { link, social, category }]);
    setLink("");
    setSocial("");
    setCategory("");
    setSelectedCategories({});
    setSelectedSocial({});
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "623px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Stack
          direction="row"
          gap="5px"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <TextField
            placeholder="Link Here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { ...textFieldBaseStyle, width: "430px" },
            }}
          />

          <Box sx={{ position: "relative", width: "145px" }}>
            <Box
              sx={{
                width: "100%",
                height: "42px",
                border: "1px solid #D1E5FA",
                borderRadius: "5px",
                backgroundColor: "#EAF4FF",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                px: 1,
                cursor: "pointer",
                color: social ? "#000" : "#6C727F",
              }}
              onClick={() => setShowSocialDropdown((prev) => !prev)}
            >
              <span>{social || "Social Media"}</span>
              <img
                src={showSocialDropdown ? UpArrow : DownArrow}
                alt="toggle"
                style={{
                  width: "14px", 
                  height: "14px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {showSocialDropdown && (
              <ClickAwayListener
                onClickAway={() => setShowSocialDropdown(false)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 20,
                    top: "100%",
                    left: 0,
                    backgroundColor: "#EAF4FF",
                    border: "1px solid #D1E5FA",
                    borderRadius: "5px",
                    p: 2,
                    mt: "5px",
                    width: "145px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {socialOptions.map((option) => (
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
                        src={selectedSocial[option] ? CheckOn : CheckOff}
                        alt="checkbox"
                        style={{
                          cursor: "pointer",
                          width: 18,
                          height: 18,
                          marginRight: 8,
                        }}
                        onClick={() => toggleSocial(option)}
                      />
                      {option}
                    </Box>
                  ))}
                </Box>
              </ClickAwayListener>
            )}
          </Box>

          <Box sx={{ position: "relative", width: "414px" }}>
            <Box
              sx={{
                width: "100%",
                height: "42px",
                border: "1px solid #D1E5FA",
                borderRadius: "5px",
                backgroundColor: "#EAF4FF",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                px: 1,
                cursor: "pointer",
                color: category ? "#000" : "#6C727F",
              }}
              onClick={() => setShowCategoryDropdown((prev) => !prev)}
            >
              <span>{category || "Category"}</span>
              <img
                src={showCategoryDropdown ? UpArrow : DownArrow}
                alt="toggle"
                style={{
                  width: "14px",
                  height: "14px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {showCategoryDropdown && (
              <ClickAwayListener
                onClickAway={() => setShowCategoryDropdown(false)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 20,
                    top: "100%",
                    left: 0,
                    backgroundColor: "#EAF4FF",
                    border: "1px solid #D1E5FA",
                    borderRadius: "5px",
                    p: 2,
                    mt: "5px",
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

          <img
            src={AddIcon}
            alt="Add"
            onClick={handleAdd}
            style={{ cursor: "pointer" }}
          />
        </Stack>
      </Box>

      <Box mr="-24px" width="100%">
        {items.map((item, index) => (
          <Stack key={index} direction="row" gap="5px" mt={1}>
            <TextField
              variant="standard"
              value={item.link}
              disabled
              InputProps={{
                disableUnderline: true,
                sx: { ...textFieldBaseStyle, width: "430px" },
              }}
            />
            <TextField
              variant="standard"
              value={item.social}
              disabled
              InputProps={{
                disableUnderline: true,
                sx: { ...textFieldBaseStyle, width: "145px" },
              }}
            />
            <TextField
              variant="standard"
              value={item.category}
              disabled
              InputProps={{
                disableUnderline: true,
                sx: { ...textFieldBaseStyle, width: "414px" },
              }}
            />
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
