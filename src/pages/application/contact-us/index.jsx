import { Box, Typography } from "@mui/material";
import { Button, CustomInput } from "../../../components";
import { useFormik } from "formik";
import { usePostContactUsMutation } from "../../../services/contact-us";
import { contactUsSchema } from "../../../schemas";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using this
import { VITE_CAPTCHA_SITE_KEY } from "../../../config";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#D9D9D9",
    borderRadius: "6px",
    height: "72px",
    color: "#000",
    border: "1px solid #8B8383",
    fontSize: "16px",
    my: "0px",
  },
};

const fields = [
  { name: "name", label: "Name", placeholder: "" },
  { name: "businessName", label: "Business Name", placeholder: "" },
  { name: "number", label: "Contact Number", placeholder: "", type: "tel" },
  { name: "email", label: "Contact Email", placeholder: "", type: "email" },
  { name: "country", label: "Country ", placeholder: "" },
  { name: "message", label: "Message", placeholder: "" },
];

const ContactUsSite = () => {
  const [contactData, { isLoading }] = usePostContactUsMutation();
  const recaptchaRef = useRef(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const siteKey = VITE_CAPTCHA_SITE_KEY;

  const formik = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      email: "",
      number: "",
      country: "",
      message: "",
    },
    validationSchema: contactUsSchema,
    onSubmit: async (values) => {
      if (!isCaptchaVerified) {
        toast.error("Please verify that you're not a robot.");
        return;
      }

      const body = {
        name: values?.name,
        business_name: values?.businessName,
        contact_number: values?.number,
        contact_email: values?.email,
        message: values?.message,
        country: values?.country,
      };

      try {
        const response = await contactData({ body });
        if (response.data) {
          toast.success("Your message was sent successfully");
          formik.resetForm();
          setIsCaptchaVerified(false);
          recaptchaRef.current.reset(); // reset the CAPTCHA
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  const renderInput = ({ name, label, placeholder, type }) => (
    <Box key={name} sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
      <CustomInput
        label={label}
        placeholder={placeholder}
        type={type || "text"}
        sx={sharedInputStyles}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        modal={true}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "15px",
        pb: "15px",
      }}
    >
      <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "60%",
          },
          maxWidth: "899px",
          minHeight: "calc(100vh - 600px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: "10px",
            columnGap: "10px",
          }}
        >
          {fields.map(renderInput)}
        </Box>

        <Box sx={{ my: 2 }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={() => setIsCaptchaVerified(true)}
            onExpired={() => setIsCaptchaVerified(false)}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ width: { xs: "100%", md: "162px" }, height: "58.64px" }}>
            <Button
              variant="contained"
              disableRipple
              type="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsSite;
