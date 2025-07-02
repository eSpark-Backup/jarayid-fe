import { Typography, Button, Link, Box } from "@mui/material";
import { useFormik } from "formik";
import { signupValidationSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { email, google, lock } from "../../assets";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Create account
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3,
          fontSize: { xs: "10px", md: "16px" },
        }}
      >
        Let’s get you started sharing your links!
      </Typography>

      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <CustomInput
          name="email"
          label="Email address"
          placeholder="e.g. alex@email.com"
          iconSrc={email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <CustomInput
          name="password"
          label="Create password"
          placeholder="At least 8 characters"
          type="password"
          iconSrc={lock}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <CustomInput
          name="confirmPassword"
          label="Confirm password"
          placeholder="At least 8 characters"
          type="password"
          iconSrc={lock}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ height: { xs: "38px", lg: "46px" } }}
        >
          Create new account
        </Button>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          mt: 2,
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
          boxShadow: "none",
          color: "#000",
          fontSize: "16px",
          backgroundColor: "#fff",
          border: "1px solid #D9D9D9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "none",
          },
          height: { xs: "38px", lg: "48px" },
        }}
      >
        <img src={google} alt="Google" style={{ width: 24, height: 24 }} />
        Continue with Google
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{" "}
        <Link
          href="/login"
          underline="hover"
          sx={{ color: "#3281CA", fontSize: "16px" }}
        >
          Login
        </Link>
      </Typography>
    </>
  );
};

export default Signup;
