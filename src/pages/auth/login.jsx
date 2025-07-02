import { Typography, Button, Link, Box } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { email, lock } from "../../assets";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login submitted:", values);
    },
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Login
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#8F8F8F",
          mb: 2,
          fontSize: { xs: "10px", md: "16px" },
        }}
      >
        Add your details below to get back into the app
      </Typography>

      <Box component={"form"} onSubmit={formik.handleSubmit} noValidate>
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
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
          placeholder="Enter your password"
          iconSrc={lock}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ height: { xs: "38px", lg: "46px" }, mt: 2 }}
        >
          Login
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link
          href="/signup"
          underline="hover"
          sx={{ color: "#3281CA", fontSize: "16px" }}
        >
          Create account
        </Link>
      </Typography>
    </>
  );
};

export default Login;
