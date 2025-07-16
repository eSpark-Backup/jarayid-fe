import { Box, Typography } from "@mui/material";

const CustomSwitch = ({ checked, onToggle }) => {
  return (
    <Box
      onClick={onToggle}
      sx={{
        width: "39px",
        height: "16px",
        backgroundColor: checked ? "#E0E6EB" : "#007BFF",
        borderRadius: "66.46px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: checked ? "#383535" : "#FFFFFF",
          position: "absolute",
          left: checked ? "7%" : "73%",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: checked ? "translateX(0)" : "translateX(0)",
        }}
      />
    </Box>
  );
};

export default CustomSwitch;
