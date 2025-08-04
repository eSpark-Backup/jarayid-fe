import { Box, Button, Typography } from "@mui/material";
import CustomInput from "../input";
import { useFormik } from "formik";
import { getFont } from "../../utils";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#d9d9d93d",
    borderRadius: "6px",
    height: "72px",
    color: "#000",
    border: "1px solid rgba(255, 255, 255, 0.93)",
    fontSize: getFont("16px"),
    my: "0px",
  },
};

const fields = [
  { name: "name", label: "Name", placeholder: "" },
  { name: "businessName", label: "Business Name", placeholder: "" },
  {
    name: "website",
    label: "Website",
    placeholder: "",
  },
  { name: "email", label: "Email", placeholder: "", type: "email" },
  { name: "category", label: "Category", placeholder: "" },
  { name: "number", label: "Contact Number", placeholder: "", type: "tel" },
  { name: "country", label: "Country ", placeholder: "" },
];

const AdvertiseModal = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      website: "",
      email: "",
      category: "",
      number: "",
      country: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit();
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
        Advertise here
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
          <Button variant="contained" disableRipple type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvertiseModal;
