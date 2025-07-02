import { TextField, InputAdornment, Typography, Box } from "@mui/material";
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

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
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
        helperText={language === "ar" ? "" : helperText}
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
    </Box>
  );
};

export default CustomInput;
