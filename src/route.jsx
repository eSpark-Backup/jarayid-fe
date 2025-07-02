import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";
import { Home, Login, Signup, VerifyEmail } from "./pages";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Login */}
          <Route path="/login" element={<Login />} />
          {/* Signup */}
          <Route path="/signup" element={<Signup />} />
          {/* Verify Email */}
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Router;
