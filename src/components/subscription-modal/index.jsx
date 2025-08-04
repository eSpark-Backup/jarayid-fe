import { Box, Typography } from "@mui/material";
import PriceCard from "../price-card";
import { getFont } from "../../utils";

const SubscriptionModal = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: getFont("32px"), fontWeight: "600" }}>
        Subscription Jarayid Plus
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mt: "25px",
          rowGap: "15px",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "47%" } }}>
          <PriceCard
            name={"Basic Subscription"}
            description={
              "Get Ad Free Experience While you are Reading your Favourite articles."
            }
            price={"$9.99"}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "47%" } }}>
          <PriceCard
            name={"Basic Subscription"}
            description={
              "Get Ad Free Experience While you are Reading your Favourite articles."
            }
            price={"$9.99"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionModal;
