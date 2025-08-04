import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import { Button, CustomInput } from "../../components";
import { verifyEmailSchema } from "../../schemas";
import { useForgotPasswordMutation } from "../../services/auth";
import { email } from "../../assets";

const TIMER_DURATION = 300;
const TIMER_KEY = "verifyEmailTimerExpiresAt";

const VerifyEmail = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { t, i18n } = useTranslation();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const expiresAt = localStorage.getItem(TIMER_KEY);
    if (expiresAt) {
      const remaining = Math.floor((Number(expiresAt) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem(TIMER_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const getTimerText = () => {
    const formatted = formatTime(timer);
    return i18n.language === "ar"
      ? `أعد الإرسال خلال ${formatted}`
      : `Resend in ${formatted}`;
  };

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyEmailSchema,
    onSubmit: (values) => {
      forgotPassword({ email: values?.email }).then((res) => {
        if (res?.data) {
          const expiresAt = Date.now() + TIMER_DURATION * 1000;
          localStorage.setItem(TIMER_KEY, expiresAt.toString());
          setTimer(TIMER_DURATION);
          toast.success(res?.data?.message);
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    },
  });

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
          loading={isLoading}
          disabled={isLoading || timer > 0}
          type="submit"
          variant="contained"
          sx={{
            height: { xs: "38px", lg: "46px" },
            mt: 2,
            fontSize: { xs: "12px", md: "16px" },
          }}
        >
          {timer > 0 ? getTimerText() : t("Send code")}
        </Button>
      </Box>

      {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("Try another way?")}
      </Typography> */}
    </>
  );
};

export default VerifyEmail;
