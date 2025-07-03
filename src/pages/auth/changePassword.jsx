import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { CustomInput } from "../../components";
import { changePasswordSchema } from "../../schemas";
import { lock } from "../../assets";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      console.log("Password change submitted:", values);
    },
  });

  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <CustomInput
        name="newPassword"
        label={t("Create password")}
        placeholder={t("At least 8 characters")}
        type="password"
        iconSrc={lock}
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
      />

      <CustomInput
        name="confirmPassword"
        label={t("Confirm password")}
        placeholder={t("At least 8 characters")}
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
        sx={{ mt: 2, fontSize: { xs: "11px", md: "16px" } }}
      >
        {t("Save")}
      </Button>
    </Box>
  );
};

export default ChangePassword;
