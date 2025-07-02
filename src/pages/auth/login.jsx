import { Typography, Button, Link, Box } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { emailIcon, lockIcon } from "../../assets";

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
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <CustomInput
          name="email"
          label="Email address"
          placeholder="e.g. alex@email.com"
          iconSrc={emailIcon}
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
          iconSrc={lockIcon}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
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
