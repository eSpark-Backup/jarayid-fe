import { TextField, InputAdornment } from "@mui/material";

export const CustomInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  helperText = "",
  iconSrc = "",
  error = false,
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      margin="normal"
      helperText={helperText}
      error={error}
      variant="outlined"
      InputLabelProps={{ shrink: false }}
      InputProps={{
        startAdornment: iconSrc ? (
          <InputAdornment position="start">
            <img
              src={iconSrc}
              alt=""
              style={{ width: 13, height: 10, marginRight: 8 }}
            />
          </InputAdornment>
        ) : null,
        sx: {
          height: 48,
        },
      }}
    />
  );
};
