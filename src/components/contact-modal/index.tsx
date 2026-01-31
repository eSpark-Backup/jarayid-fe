import { Box, Button, Typography } from "@mui/material";
import CustomInput from "../input";
import { useFormik } from "formik";
import { usePostContactUsMutation } from "../../services/contact-us.js";
import { contactUsSchema } from "../../schemas/index.js";
import { toast } from "react-toastify";
import { getFont } from "../../utils/index.js";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#D9D9D9",
    borderRadius: "6px",
    height: "72px",
    color: "#000",
    border: "1px solid #8B8383",
    fontSize: getFont("16px"),
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

const ContactModal = ({ handleSubmit }) => {
  const [contactData, { isLoading }] = usePostContactUsMutation();
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
      console.log(values);
      const body = {
        name: values?.name,
        business_name: values?.businessName,
        contact_number: values?.number,
        contact_email: values?.email,
        message: values?.message,
        country: values?.country,
      };
      try {
        const resposne = await contactData({ body });
        if (resposne.data) {
          toast.success("Your message sent successfully");
          handleSubmit();
        }
      } catch (error) {
        toast.error("Something went wrong");
        handleSubmit();
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
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Typography sx={{ fontSize: getFont("32px"), fontWeight: "600" }}>
        Contact Us
      </Typography>
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
  );
};

export default ContactModal;
