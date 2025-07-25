import { Box, Grid, Typography } from "@mui/material";

const SummaryCard = ({ cardBg, iconBg, icon, value, name, comparison }) => {
  return (
    <Grid
      sx={{
        borderRadius: "13.58px",
        p: "15px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        backgroundColor: cardBg,
      }}
      size={{ xs: 12, md: 6, lg: 3 }}
    >
      <Box
        sx={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: iconBg,
        }}
      >
        <Box component={"img"} src={icon} alt="Icon" loading="lazy" />
      </Box>
      <Typography
        sx={{ color: "#151D48", fontSize: "20.37px", fontWeight: "bold" }}
      >
        {value}
      </Typography>
      <Typography
        sx={{ color: "#425166", fontSize: "13.58px", fontWeight: "bold" }}
      >
        {name}
      </Typography>
      <Typography
        sx={{ color: "#4079ED", fontSize: "10.18px", fontWeight: "bold" }}
      >
        {comparison}
      </Typography>
    </Grid>
  );
};

export default SummaryCard;
