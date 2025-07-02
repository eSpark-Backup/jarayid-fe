import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { CustomInput } from "../../components";
import { lockIcon } from "../../assets";
import { changePasswordSchema } from "../../schemas";

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

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <CustomInput
        name="newPassword"
        label="Create password"
        placeholder="Enter new password"
        type="password"
        iconSrc={lockIcon}
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
      />

      <CustomInput
        name="confirmPassword"
        label="Confirm password"
        placeholder="Re-enter new password"
        type="password"
        iconSrc={lockIcon}
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

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default ChangePassword;
