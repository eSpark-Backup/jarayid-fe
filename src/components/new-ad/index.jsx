import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { categoryOptions, dropdownOptions, dropdowns } from "../../constant";
import LinkIcon from "../../assets/icons/link-icon.svg";
import DownArrow from "../../assets/icons/arrow-down.svg";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";
import React, { useEffect, useState } from "react";
import { adChecked, adUnchecked } from "../../assets";
import CategoryDropdown from "../category-tab";
import { toast } from "react-toastify";
import {
  useEditAdMutation,
  useNewAdMutation,
} from "../../services/ad-placement";

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

const NewAd = ({ handleCancel, currentTab, data }) => {
  const [anchorEls, setAnchorEls] = React.useState({});
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState({});
  const [category, setCategory] = useState("");
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [pastedText, setPastedText] = useState("");
  const [adData, { isLoading }] = useNewAdMutation();
  const [editData, { isLoading: editLoading }] = useEditAdMutation({
    id: data?.id,
  });

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

  const handleOptionToggle = (label, item) => {
    setSelectedOptions((prev) => {
      const existing = prev[label] || [];
      const isSelected = existing.includes(item);
      const updated = isSelected
        ? existing.filter((opt) => opt !== item)
        : [...existing, item];
      return { ...prev, [label]: updated };
    });
  };

  const LaunchHandler = async () => {
    const hasValidMainPage =
      Array.isArray(selectedOptions?.["Main Page"]) &&
      selectedOptions["Main Page"].length > 0;
    const hasValidArticlePage =
      Array.isArray(selectedOptions?.["Article Page"]) &&
      selectedOptions["Article Page"].length > 0;
    const hasSelectedCategory =
      selectedCategories && Object.values(selectedCategories).some(Boolean);
    const hasValidLink = pastedText?.trim();

    if (
      hasValidMainPage &&
      hasValidArticlePage &&
      hasSelectedCategory &&
      hasValidLink
    ) {
      const selectedCategoryKeys = Object.entries(selectedCategories)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);

      const obj = {
        platform: currentTab === 0 ? "WEB" : "APP",
        mainPage: selectedOptions["Main Page"].join(", "),
        articlePage: selectedOptions["Article Page"].join(", "),
        category: selectedCategoryKeys,
        adLink: pastedText,
        isActive: true,
      };

      try {
        const isEdit = Object.keys(data)?.length > 0;
        const res = isEdit
          ? await editData({ body: obj, id: data?.id })
          : await adData({ body: obj });

        if (res?.data) {
          toast.success(
            isEdit
              ? "Visual ad placement edited successfully"
              : "Visual ad placement created successfully"
          );
          handleCancel();
          return;
        }

        if (res?.error) {
          toast.error(res.error?.data?.message);
          console.log(res?.error);
          // handleCancel();
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        handleCancel();
        return;
      }
    } else {
      if (!hasValidMainPage) {
        toast.error("Main Page option is missing.");
        return;
      }
      if (!hasValidArticlePage) {
        toast.error("Article Page option is missing.");
        return;
      }
      if (!hasSelectedCategory) {
        toast.error("No categories selected.");
        return;
      }
      if (!hasValidLink) {
        toast.error("Pasted text is empty or missing.");
        return;
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPastedText(text || "Clipboard is empty");
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
      setPastedText("Unable to read clipboard");
    }
  };

  useEffect(() => {
    if (!data) return;

    setSelectedOptions({
      "Main Page": data.mainPage?.split(", ").filter(Boolean) || [],
      "Article Page": data.articlePage?.split(", ").filter(Boolean) || [],
    });

    const categoryObj = {};
    data.category?.forEach((cat) => {
      categoryObj[cat] = true;
    });
    setSelectedCategories(categoryObj);
    setCategory(data.category?.join(", ") || "");

    setPastedText(data.adLink || "");
  }, [data]);

  return (
    <Box>
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
                width: { xs: "100%", sm: index === 2 ? 414 : "48%", lg: 212 },
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
                        // onClick={() => handleClose(label)}
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
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "17px",
                            color: "#101828",
                            fontFamily: "Gilroy-SemiBold",
                            fontWeight: 400,
                          }}
                        >
                          {item}
                        </Typography>
                        <Checkbox
                          icon={
                            <img
                              src={adUnchecked}
                              alt="unchecked"
                              style={{ width: 24, height: 24 }}
                            />
                          }
                          checkedIcon={
                            <img
                              src={adChecked}
                              alt="checked"
                              style={{ width: 24, height: 24 }}
                            />
                          }
                          checked={
                            selectedOptions[label]?.includes(item) || false
                          }
                          onChange={() => handleOptionToggle(label, item)}
                          disableRipple
                        />
                      </Box>
                    ))}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
          );
        })}
        <ClickAwayListener onClickAway={() => handleClose(label)}>
          <CategoryDropdown
            width={{ xs: "100%", lg: "414px" }}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedText={category}
            setSelectedText={setCategory}
            isAdmin={true}
          />
        </ClickAwayListener>
      </Box>

      <Box
        sx={{
          backgroundColor: "#EAE7EC",
          borderRadius: "5px",
          textAlign: "center",
          height: { xs: "100px", md: "142px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          p: "10px 0px 10px 0px",
          rowGap: "10px",
          cursor: "pointer",
        }}
        onClick={handlePaste}
      >
        <img src={LinkIcon} alt="Link Icon" />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#A6A6A6",
            fontFamily: "Gilroy-SemiBold",
            userSelect: "none",
            wordBreak: "break-all",
          }}
        >
          {pastedText || "Click Here for the Copied Link"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          position: "absolute",
          bottom: "20px",
          right: { xs: "0px", md: "20px" },
          columnGap: "20px",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "90%", md: "175px" }, height: "44.14px" }}>
          <Button
            sx={{
              backgroundColor: "transparent",
              border: "1.24px solid #C9C4C4",
              borderRadius: "11.12px",
              color: "#7C7C7C",
              fontSize: "16.55px",
              p: "6px 16px",
              height: "40px",
              ":hover": {
                backgroundColor: "transparent",
                border: "1.24px solid #C9C4C4",
                borderRadius: "11.12px",
                color: "#7C7C7C",
                boxShadow: "none",
              },
            }}
            onClick={handleCancel}
            disableRipple
          >
            Cancel
          </Button>
        </Box>
        <Box sx={{ width: { xs: "90%", md: "175px" }, height: "44.14px" }}>
          <Button
            variant="gradient"
            onClick={LaunchHandler}
            loading={isLoading || editLoading}
          >
            {Object.keys(data)?.length > 0 ? "Edit Ad" : "Launch New Ad"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewAd;
