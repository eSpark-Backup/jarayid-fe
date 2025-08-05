import React, { useEffect, useState } from "react";
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
import { useGetAllAdsQuery } from "../../services/ad-placement";
import NewAd from "../new-ad";
import AdData from "../ad-data";

const VisualTab = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [currentComp, setCurrentComp] = useState(1);

  const [ads, setAds] = useState([]);

  const { data, isLoading } = useGetAllAdsQuery({ page: 1 });

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  useEffect(() => {
    if (!data) return;
    setAds(data?.data?.items);
  }, [data]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "14px",
        height: { xs: "auto", md: "491px" },
        minWidth: 0,
        marginTop: "23px",
        position: "relative",
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
      {currentComp === 1 ? (
        <NewAd handleCancel={() => setCurrentComp(0)} currentTab={tabIndex} />
      ) : (
        <AdData handleNewClick={() => setCurrentComp(1)} />
      )}
    </Paper>
  );
};

export default VisualTab;
