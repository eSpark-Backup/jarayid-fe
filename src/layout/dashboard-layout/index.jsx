import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useGetAllCateoriesQuery } from "../../services/categories";
import Sidebar from "./sidebar";
import Header from "./header";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data } = useGetAllCateoriesQuery(
    {
      page: 1,
      pageSize: 30,
    },
    { skip: user?.role !== "ADMIN" }
  );
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate(-1);
    }
  }, [user]);
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
      <Sidebar sidebarOpen={open} setSidebarOpen={setOpen} />
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
        <Header open={open} setOpen={setOpen} />
        <Box
          sx={{
            height: "calc(100vh - 69px)",
            width: { xs: "100vw", lg: "100%" },
            overflowY: "auto",
            background: "#E5E5E5",
            padding: { xs: "20px", sm: "38px 38px 38px 50px" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
