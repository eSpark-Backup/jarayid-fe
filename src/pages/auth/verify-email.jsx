import { Box, Typography } from "@mui/material";
import { Button, CustomInput } from "../../components";
import { useFormik } from "formik";
import { verifyEmailSchema, forgetPasswordSchema } from "../../schemas";
import { email, lock } from "../../assets";
import { useState } from "react";

const VerifyEmail = () => {
  const [step, setStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyEmailSchema,
    onSubmit: (values) => {
      setVerifiedEmail(values.email);
      setStep(2);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      conPassword: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Forgot Password
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#8F8F8F", mb: 2, fontSize: { xs: "10px", md: "16px" } }}
      >
        Let’s get you started sharing your links!
      </Typography>

      <Box
        component="form"
        onSubmit={
          step === 1 ? emailFormik.handleSubmit : passwordFormik.handleSubmit
        }
        noValidate
        sx={{ mt: "35px" }}
      >
        {step === 1 ? (
          <>
            <CustomInput
              name="email"
              label="Email address"
              placeholder="e.g. alex@email.com"
              iconSrc={email}
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              onBlur={emailFormik.handleBlur}
              error={
                emailFormik.touched.email && Boolean(emailFormik.errors.email)
              }
              helperText={emailFormik.touched.email && emailFormik.errors.email}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: { xs: "38px", lg: "46px" }, mt: 2 }}
            >
              Send Code
            </Button>
          </>
        ) : (
          <>
            <CustomInput
              name="password"
              label="Create password"
              placeholder="At least 8 characters"
              iconSrc={lock}
              value={passwordFormik.values.password}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              error={
                passwordFormik.touched.password &&
                Boolean(passwordFormik.errors.password)
              }
              helperText={
                passwordFormik.touched.password &&
                passwordFormik.errors.password
              }
              type="password"
            />
            <CustomInput
              name="conPassword"
              label="Confirm password"
              placeholder="At least 8 characters"
              iconSrc={lock}
              value={passwordFormik.values.conPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              error={
                passwordFormik.touched.conPassword &&
                Boolean(passwordFormik.errors.conPassword)
              }
              helperText={
                passwordFormik.touched.conPassword &&
                passwordFormik.errors.conPassword
              }
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: { xs: "38px", lg: "46px" }, mt: 2 }}
            >
              Save
            </Button>
          </>
        )}
      </Box>

      {step === 1 && (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Try another way?
        </Typography>
      )}
    </>
  );
};

export default VerifyEmail;
