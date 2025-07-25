import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, MobileNavbar, Navbar } from "../../components";

const PrivateLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
