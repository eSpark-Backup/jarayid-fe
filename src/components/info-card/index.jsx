import { Box, Stack, Typography } from "@mui/material";
import { trendingDown, trendingUp } from "../../assets";

const InfoCard = ({
  icon,
  title,
  value,
  trending,
  perc,
  timeStamp,
  hideTime,
}) => {
  return (
    <Box
      sx={{
        background: "#FFF",
        height: "159.86px",
        borderRadius: "14px",
        padding: "15px",
      }}
    >
      <Typography sx={{ fontSize: "15.21px", color: "#202224" }}>
        {title}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        mt="5px"
      >
        <Typography
          sx={{ fontSize: "26.62px", color: "#202224", fontWeight: 600 }}
        >
          {value}
        </Typography>
        {icon && <img src={icon} alt="icon" />}
      </Stack>

      {trending && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={"7px"}
          mt={"18px"}
        >
          <img src={trending === "up" ? trendingUp : trendingDown} alt="icon" />
          <Typography
            sx={{
              fontSize: "15.21px",
              color: trending === "up" ? "#00B69B" : "#F93C65",
              fontWeight: 400,
            }}
          >
            {perc}
          </Typography>

          {!hideTime && timeStamp && (
            <Typography
              sx={{
                fontSize: "15.21px",
                color: "#606060",
                fontWeight: 400,
              }}
            >
              {`${trending === "up" ? "Up" : "Down"} from ${timeStamp}`}
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default InfoCard;
