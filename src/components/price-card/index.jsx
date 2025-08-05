import { Box, Button, Typography } from "@mui/material";
import { go, users } from "../../assets";

const PriceCard = ({
  name,
  description,
  price,
  interval,
  handleCheckout,
  priceId,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#5E6167",
        borderRadius: "16px",
        border: "1px solid #1869CC33",
        p: "30px 20px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        height: "380px"
      }}
    >
      <Typography
        sx={{ fontSize: "24px", color: "#FFFFFF", fontWeight: "700" }}
      >
        {name}
      </Typography>
      <Typography sx={{ color: "#FFFFFF", opacity: "80%" }}>
        {description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          columnGap: "15px",
          pb: "45px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "50px", fontWeight: "800" }}
        >
          {price}
        </Typography>
        <Typography sx={{ color: "white", opacity: "80%", fontSize: "17px" }}>
          / {interval === "MONTHLY" ? "MN" : "YR"}
        </Typography>
      </Box>
      {/* <Box sx={{ display: "flex", columnGap: "10px" }}>
        <img src={users} alt="User Group" />
        <Typography
          sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}
        >
          + 10 Users
        </Typography>
      </Box> */}
      <Button
        onClick={() => handleCheckout(priceId)}
        sx={{
          width: "100%",
          backgroundColor: "#007BFF",
          borderRadius: "1555px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
          "&:hover": {
            backgroundColor: "#007BFF",
          },
        }}
      >
        <Typography
          sx={{ fontSize: "19px", fontWeight: "600", color: "white" }}
        >
          Upgrade Now
        </Typography>
        <img src={go} alt="Icon" />
      </Button>
    </Box>
  );
};

export default PriceCard;
