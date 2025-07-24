import React from "react";
import InfoCard from "../../../components/info-card";
import { Grid, Typography } from "@mui/material";
import SubHeader from "../../../components/sub-header";
import VisualTab from "../../../components/visual-tab";

const VisiualAd = () => {
  return (
    <>
      <SubHeader title="Visual Ad Placement" />
      <Typography>
        Configure ad placements, manage Google Ads and AdMob integration, and
        monitor ad performance.
      </Typography>
      <Grid container spacing={2} mt="25px">
        <Grid item xs={12} sm={6} md={3} sx={{ width: 300, height: 180 }}>
          <InfoCard
            title="Total Revenue"
            value="$40,689"
            trending="up"
            perc="8.5%"
            timeStamp="yesterday"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ width: 300, height: 180 }}>
          <InfoCard
            title="Total Impressions"
            value="40,689"
            trending="up"
            perc="8.5%"
            timeStamp="last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ width: 300, height: 180 }}>
          <InfoCard
            title="Average CTR"
            value="1.8%"
            trending="up"
            perc="click through Rate"
            timeStamp=""
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ width: 300, height: 180 }}>
          <InfoCard
            title="Active Placements"
            value="05"
            trending="up"
            perc="06 total"
            timeStamp=""
          />
        </Grid>
      </Grid>
      <VisualTab />
    </>
  );
};

export default VisiualAd;
