import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Footer, MobileNavbar, Navbar } from "../../components";
import { useGetPlansQuery } from "../../services/payment";

const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [user]);
  const { isError, error } = useGetPlansQuery({ skip: !token });
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Navbar />
      <MobileNavbar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default PrivateLayout;
