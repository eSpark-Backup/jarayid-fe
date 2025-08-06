import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import PriceCard from "../price-card";
import { getFont } from "../../utils";
import { VITE_CLIENT_PADDLE_TOKEN } from "../../config";

const SubscriptionModal = ({ onClose }) => {
  const { subscriptions } = useSelector((state) => state.subscriptions);
  console.log(subscriptions);

  const handleCheckout = (priceId) => {
    if (window.Paddle) {
      Paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (window.Paddle) {
      Paddle.Environment.set("sandbox");
      Paddle.Initialize({
        token: VITE_CLIENT_PADDLE_TOKEN,
        eventCallback: function (event) {
          if (event.name === "checkout.completed") {
            onClose && onClose();
          }
        },
      });
    }
  }, []);

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
        {subscriptions?.map((plan, index) => {
          return (
            <Box sx={{ width: { xs: "100%", md: "47%" } }}>
              <PriceCard
                name={plan?.name}
                description={plan?.description}
                interval={plan?.prices?.["MONTHLY" || "YEARLY"]?.interval}
                price={`$${plan?.prices?.["MONTHLY" || "YEARLY"]?.amount}`}
                handleCheckout={handleCheckout}
                priceId={plan?.prices?.["MONTHLY" || "YEARLY"]?.id}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SubscriptionModal;
