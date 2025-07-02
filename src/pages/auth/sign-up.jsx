import { Card, CardContent, Typography, Button, Link } from "@mui/material";
import CustomInput from "../../components/input";
import { useFormik } from "formik";
import { signupValidationSchema } from "../../schemas";

export const Signup = () => {
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
    <Card sx={{ maxWidth: 476, width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Create account
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Let’s get you started sharing your links!
        </Typography>

        <form onSubmit={formik.handleSubmit}>
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

          <Typography sx={{ mb: "-12px", mt: "20px" }}>Create Password</Typography>
          <CustomInput
            name="password"
            label="Create password"
            placeholder="At least 8 characters"
            type="password"
            iconSrc="/images/lock.png"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Typography sx={{ mb: "-12px", mt: "20px" }}>Confirm Password</Typography>
          <CustomInput
            name="confirmPassword"
            label="Confirm password"
            placeholder="At least 8 characters"
            type="password"
            iconSrc="/images/lock.png"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#3281CA",
              textTransform: "none",
              boxShadow: "none",
              fontSize: "16px",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#3281CA",
                boxShadow: "none",
              },
            }}
          >
            Create new account
          </Button>
        </form>

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
          }}
        >
          <img
            src="/images/google.png"
            alt="Google"
            style={{ width: 24, height: 24 }}
          />
          Continue with Google
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" sx={{ color: "#3281CA", fontSize: "16px" }}>
            Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
