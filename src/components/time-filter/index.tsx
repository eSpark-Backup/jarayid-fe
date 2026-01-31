import { Box, Typography } from "@mui/material";

const TimeFilterTab = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        width: "222px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tabs.map((tab, index) => (
        <Typography
          onClick={() => setActiveTab(tab)}
          sx={{
            cursor: "pointer",
            fontSize: "14px",
            background: activeTab === tab ? "#F8F7F9" : "transparent",
            color: activeTab === tab ? "#403A44" : "#908B93",
            padding: "9px 12px",
            borderTop:
              index !== 0 || index !== tabs.length - 1
                ? "1px solid #EAE7EC"
                : "",
            borderBottom:
              index !== 0 || index !== tabs.length - 1
                ? "1px solid #EAE7EC"
                : "",
            border:
              index === 0 || index === tabs.length - 1
                ? "1px solid #EAE7EC"
                : "",
            borderRadius:
              index === 0
                ? "6px 0 0 6px"
                : index === tabs.length - 1
                ? "0 6px 6px 0"
                : "",
          }}
        >
          {tab}
        </Typography>
      ))}
    </Box>
  );
};

export default TimeFilterTab;
