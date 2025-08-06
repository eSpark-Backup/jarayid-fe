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
  LinearProgress,
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
  const [currentComp, setCurrentComp] = useState(0);
  const [editData, setEditData] = useState({});

  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleEditItem = (item) => {
    setEditData(item);
    setCurrentComp(1);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "14px",
        minHeight: "490px",
        minWidth: 0,
        marginTop: "23px",
        position: "relative",
        border: "0.83px solid #F8F9FA !important",
        boxShadow: "0px 3.3px 16.52px 0px #EEEEEE80 !important",
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
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#101828 !important",
          }}
        />
        <Tab
          label="App"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#101828 !important",
          }}
        />
      </Tabs>
      {currentComp === 1 ? (
        <NewAd
          handleCancel={() => {
            setCurrentComp(0);
            setEditData({});
          }}
          currentTab={tabIndex}
          data={editData}
        />
      ) : (
        <AdData
          handleNewClick={() => setCurrentComp(1)}
          handleEdit={handleEditItem}
          currentTab={tabIndex}
        />
      )}
    </Paper>
  );
};

export default VisualTab;
