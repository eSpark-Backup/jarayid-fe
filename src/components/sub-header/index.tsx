import { Box, Typography } from "@mui/material";

const SubHeader = ({ title, rightNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography
        sx={{ fontSize: "30.22px", fontWeight: "bold", color: "#3F3F40" }}
      >
        {title}
      </Typography>
      {rightNode}
    </Box>
  );
};

export default SubHeader;
