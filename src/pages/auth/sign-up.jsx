import { Typography, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import { signupValidationSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { email, google, lock } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <CustomInput
          name="email"
          label={t("Email address")}
          placeholder={t("email placeholder")}
          iconSrc={email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <CustomInput
          name="password"
          label={t("Create password")}
          placeholder={t("password placeholder")}
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
          label={t("Confirm password")}
          placeholder={t("password placeholder")}
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
          sx={{
            height: { xs: "38px", lg: "46px" },
            fontSize: { xs: "11px", md: "16px" },
          }}
        >
          {t("Create new account")}
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
          fontSize: { xs: "11px", md: "16px" },
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
        {t("Continue with Google")}
      </Button>

      <Typography
        // variant="body2"
        align="center"
        sx={{ mt: 3, fontSize: { xs: "11px", md: "14px" } }}
      >
        {t("Already have an account")}
        <Link to="/login" style={{ color: "#3281CA", textDecoration: "none" }}>
          {t("login")}
        </Link>
      </Typography>
    </>
  );
};

export default Signup;
