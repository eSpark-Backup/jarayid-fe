import { Box, Typography } from "@mui/material";

const CustomSwitch = ({ checked, onToggle }) => {
  return (
    <Box
      onClick={onToggle}
      sx={{
        width: "50px",
        height: "16px",
        backgroundColor: "#E9F5FE",
        borderRadius: "66.46px",
        display: "flex",
        alignItems: "center",
        padding: "0 4px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Animated thumb */}
      <Box
        sx={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: checked ? "#2196F3" : "#383535",
          position: "absolute",
          left: checked ? "10%" : "65%",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: checked ? "translateX(0)" : "translateX(0)",
        }}
      />

      {/* Labels */}
      <Typography
        sx={{
          fontSize: "8px",
          color: checked ? "transparent" : "#333F49",
          marginLeft: "auto",
          transition: "color 0.2s ease",
          zIndex: 1,
        }}
      >
        Off
      </Typography>
      <Typography
        sx={{
          fontSize: "8px",
          color: checked ? "#333F49" : "transparent",
          marginRight: "auto",
          transition: "color 0.2s ease",
          zIndex: 1,
        }}
      >
        On
      </Typography>
    </Box>
  );
};

export default CustomSwitch;
