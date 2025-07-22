import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import Header from "./header";

const AdminLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <Header />
        <Box
          sx={{
            height: "calc(100vh - 69px)",
            width: "100%",
            overflowY: "auto",
            background: "#E5E5E5",
            padding: "38px 38px 38px 50px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
