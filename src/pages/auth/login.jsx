import { Typography, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { CustomInput } from "../../components";
import { email, lock } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const objToSend = {
        email: values?.email,
        password: values?.password,
        loginType: "local",
      };
      login(objToSend).then((res) => {
        console.log(res?.data, "response");
        if (res?.data) {
          if (res?.data?.data?.user?.role === "ADMIN") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    },
  });

  const navigate = useNavigate();

  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <>
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
          sx={{
            height: { xs: "38px", lg: "46px" },
            mt: 2,
            fontSize: { xs: "11px", md: "16px" },
          }}
          loading={isLoading}
          disabled={isLoading}
        >
          {language === "ar" ? "دخل كلمة المرور الخاصة بك" : "Login"}
        </Button>
        <Typography
          sx={{
            fontSize: { xs: "12px", md: "16px" },
            textAlign: language === "ar" ? "right" : "left",
            cursor: "pointer",
            mt: 2,
            color: "#007BFF",
            fontWeight: "500",
          }}
          onClick={() => navigate("/verify-email")}
        >
          {t("Forget Password?")}
        </Typography>
      </Box>

      <Typography
        // variant="body2"
        align="center"
        sx={{ mt: 2, fontSize: { xs: "11px", md: "14px" } }}
      >
        {t("dont have account")}
        <Link
          to="/signup"
          underline="hover"
          style={{ color: "#3281CA", textDecoration: "none" }}
        >
          {t("create account")}
        </Link>
      </Typography>
    </>
  );
};

export default Login;
