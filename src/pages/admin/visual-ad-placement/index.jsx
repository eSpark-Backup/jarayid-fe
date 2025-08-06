import React from "react";
import InfoCard from "../../../components/info-card";
import { Grid, Typography } from "@mui/material";
import SubHeader from "../../../components/sub-header";
import VisualTab from "../../../components/visual-tab";
import { infoCardData } from "../../../constant";

const VisiualAd = () => {
  return (
    <>
      <SubHeader title="Visual Ad Placement" />
      <Typography sx={{ fontSize: "18px", color: "#4E4852" }}>
        Configure ad placements, manage Google Ads and AdMob integration, and
        monitor ad performance.
      </Typography>
      <Grid
        sx={{ justifyContent: "space-between" }}
        container
        spacing={2}
        mt="25px"
      >
        {infoCardData.map((card, index) => (
          <Grid
            // item
            key={index}
            // xs={12}
            // sm={6}
            // md={3}
            sx={{
              maxWidth: {
                md: "233px", // applies at `md` breakpoint and above
              },
              "@media (min-width: 1441px)": {
                maxWidth: "100% !important",
              },
            }}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <InfoCard
              adPlacement={true}
              title={card.title}
              value={card.value}
              trending={card.trending}
              perc={card.perc}
              timeStamp={card.timeStamp}
            />
          </Grid>
        ))}
      </Grid>
      <VisualTab />
    </>
  );
};

export default VisiualAd;
