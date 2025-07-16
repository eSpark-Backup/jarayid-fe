import { TextField, InputAdornment, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CustomInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  helperText = "",
  iconSrc = "",
  error = false,
  label = "",
  ei,
}) => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography
          sx={{
            fontSize: { xs: "10px", md: "14px" },
            fontWeight: 500,
            mb: "-12px",
            mt: 2,
            textAlign: language === "ar" ? "right" : "left",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        margin="normal"
        error={error}
        variant="outlined"
        InputLabelProps={{ shrink: false }}
        InputProps={{
          startAdornment: iconSrc ? (
            <InputAdornment position={language === "ar" ? "end" : "start"}>
              <img
                src={iconSrc}
                alt=""
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
            </InputAdornment>
          ) : null,
          sx: {
            height: { xs: "38px", lg: 48 },
            textAlign: language === "ar" ? "right" : "left",
          },
          dir: language === "ar" ? "rtl" : "ltr",
        }}
      />
      {helperText && (
        <Typography
          sx={{
            color: "#d32f2f",
            fontSize: "0.75rem",
            fontWeight: "400",
            textAlign: language === "ar" ? "right" : "left",
          }}
        >
          {t(helperText)}
        </Typography>
      )}
    </Box>
  );
};

export default CustomInput;
