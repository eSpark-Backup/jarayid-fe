import { Card, CardContent, Typography, Button, Link } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import CustomInput from "../../components/input";

export const Login = () => {
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
    <Card sx={{ maxWidth: 476, width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#8F8F8F",
            mb: 2,
            fontSize: "16px",
          }}
        >
          Add your details below to get back into the app
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Typography sx={{ mb: "-12px" }}>Email address</Typography>
          <CustomInput
            name="email"
            label="Email address"
            placeholder="e.g. alex@email.com"
            iconSrc="/images/email.png"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Typography sx={{ mb: "-12px", mt: "20px" }}>Password</Typography>
          <CustomInput
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
            placeholder="Enter your password"
            iconSrc="/images/lock.png"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#3281CA",
              textTransform: "none",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#3281CA",
              },
            }}
          >
            Login
          </Button>
        </form>

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
      </CardContent>
    </Card>
  );
};
