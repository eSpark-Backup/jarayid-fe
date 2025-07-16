import { Box, Typography } from "@mui/material";
import { Button, CustomInput } from "../../components";
import { useFormik } from "formik";
import { verifyEmailSchema } from "../../schemas";
import { email } from "../../assets";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyEmailSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/change-password");
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <Box
        component="form"
        onSubmit={emailFormik.handleSubmit}
        noValidate
        sx={{ mt: "35px" }}
      >
        <CustomInput
          name="email"
          label={t("Email address")}
          placeholder={t("email placeholder")}
          iconSrc={email}
          value={emailFormik.values.email}
          onChange={emailFormik.handleChange}
          onBlur={emailFormik.handleBlur}
          error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
          helperText={emailFormik.touched.email && emailFormik.errors.email}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            height: { xs: "38px", lg: "46px" },
            mt: 2,
            fontSize: { xs: "11px", md: "16px" },
          }}
        >
          {t("Send code")}
        </Button>
      </Box>

      {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("Try another way?")}
      </Typography> */}
    </>
  );
};

export default VerifyEmail;
