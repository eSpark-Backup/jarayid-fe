import { Typography, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { email, lock } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 1,
          textAlign: language === "ar" ? "right" : "left",
        }}
      >
        {t("login heading")}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#8F8F8F",
          mb: 2,
          fontSize: { xs: "10px", md: "16px" },
          textAlign: language === "ar" ? "right" : "left",
        }}
      >
        {t("login description")}
      </Typography>

      <Box component={"form"} onSubmit={formik.handleSubmit} noValidate>
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
          label={t("Password")}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
          placeholder={t("login password placeholder")}
          iconSrc={lock}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ height: { xs: "38px", lg: "46px" }, mt: 2 }}
        >
          {language === "ar" ? "دخل كلمة المرور الخاصة بك" : "Login"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("dont have account")}
        <Link
          to="/signup"
          underline="hover"
          style={{ color: "#3281CA", fontSize: "16px", textDecoration: "none" }}
        >
          {t("create account")}
        </Link>
      </Typography>
    </>
  );
};

export default Login;
