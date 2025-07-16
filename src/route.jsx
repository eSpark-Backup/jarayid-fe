import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";
import { Login, Signup, VerifyEmail, ChangePassword, Home } from "./pages";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
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
