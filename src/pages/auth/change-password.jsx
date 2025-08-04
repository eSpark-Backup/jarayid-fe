import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { CustomInput } from "../../components";
import { changePasswordSchema } from "../../schemas";
import { lock } from "../../assets";
import { useTranslation } from "react-i18next";
import { useQuery } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/auth";

const ChangePassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token");
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ newPassword }) => {
      resetPassword({ token, newPassword }).then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          navigate("/login");
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
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
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        variant="contained"
        sx={{ mt: 2, fontSize: { xs: "12px", md: "16px" } }}
      >
        {t("Save")}
      </Button>
    </Box>
  );
};

export default ChangePassword;
