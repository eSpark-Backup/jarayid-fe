import { TextField, InputAdornment, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getFont } from "../../utils";

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
  sx,
  modal,
  autoFocus,
  InputProps,
}) => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: modal ? 0 : 2 }}>
      {label && (
        <Typography
          sx={{
            fontSize: modal
              ? getFont("22px")
              : { xs: getFont("10px"), md: getFont("12px") },
            mb: "-12px",
            mt: modal ? 0 : 2,
            textAlign: language === "ar" ? "right" : "left",
            color: modal ? "#101828" : "#000",
            fontFamily: "Gilroy-Regular",
            fontWeight: "400",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        name={name}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        margin="normal"
        error={error}
        sx={{
          ...sx,
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
        variant="outlined"
        InputLabelProps={{ shrink: false }}
        InputProps={
          InputProps
            ? InputProps
            : {
                startAdornment: iconSrc ? (
                  <InputAdornment
                    position={language === "ar" ? "end" : "start"}
                  >
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
              }
        }
      />
      {helperText && (
        <Typography
          sx={{
            color: "#d32f2f",
            fontSize: getFont("0.75rem"),
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
