import { Outlet } from "react-router-dom";
import { Footer, MobileFooter, MobileNavbar, Navbar } from "../../components";

const PrivateLayout = () => {
  // const handleChoice = (event) => {
  //   console.log(event);
  // };
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <Outlet />
      {/* <MobileFooter handleClick={handleChoice} /> */}
      <Footer />
    </>
  );
};

export default PrivateLayout;
